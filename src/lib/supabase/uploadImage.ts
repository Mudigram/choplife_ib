import { supabase } from "./supabaseClient";

export type ImageBucket = "place-images" | "event-images" | "review-images" | "avatars";

/**
 * Compress and optimize image before upload
 */
export async function optimizeImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const optimizedFile = new File([blob], file.name, {
                                type: "image/jpeg",
                                lastModified: Date.now(),
                            });
                            resolve(optimizedFile);
                        } else {
                            reject(new Error("Failed to optimize image"));
                        }
                    },
                    "image/jpeg",
                    quality
                );
            };
            img.onerror = () => reject(new Error("Failed to load image"));
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
    });
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
    file: File,
    bucket: ImageBucket,
    folder: string,
    optimize: boolean = true
): Promise<{ url: string; path: string; error?: string }> {
    try {
        // Optimize image if requested
        let fileToUpload = file;
        if (optimize && file.type.startsWith("image/")) {
            try {
                fileToUpload = await optimizeImage(file);
            } catch (error) {
                console.warn("Image optimization failed, uploading original:", error);
            }
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, fileToUpload, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("Upload error:", error);
            return { url: "", path: "", error: error.message };
        }

        // Get public URL
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

        return {
            url: urlData.publicUrl,
            path: filePath,
        };
    } catch (error: any) {
        console.error("Error in uploadImage:", error);
        return { url: "", path: "", error: error.message || "Failed to upload image" };
    }
}

/**
 * Upload place image
 */
export async function uploadPlaceImage(file: File, placeId: string): Promise<{ url: string; error?: string }> {
    const result = await uploadImage(file, "place-images", placeId, true);
    return { url: result.url, error: result.error };
}

/**
 * Upload event image
 */
export async function uploadEventImage(file: File, eventId: string): Promise<{ url: string; error?: string }> {
    const result = await uploadImage(file, "event-images", eventId, true);
    return { url: result.url, error: result.error };
}

/**
 * Upload review image
 */
export async function uploadReviewImage(file: File, userId: string): Promise<{ url: string; error?: string }> {
    const result = await uploadImage(file, "review-images", userId, true);
    return { url: result.url, error: result.error };
}

/**
 * Delete image from storage
 */
export async function deleteImage(bucket: ImageBucket, path: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.storage.from(bucket).remove([path]);

        if (error) {
            console.error("Delete error:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error in deleteImage:", error);
        return { success: false, error: error.message || "Failed to delete image" };
    }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
    // Check file type
    if (!file.type.startsWith("image/")) {
        return { valid: false, error: "File must be an image" };
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return { valid: false, error: `Image must be less than ${maxSizeMB}MB` };
    }

    // Check file extension
    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !validExtensions.includes(fileExt)) {
        return { valid: false, error: "Invalid file type. Use JPG, PNG, GIF, or WebP" };
    }

    return { valid: true };
}
