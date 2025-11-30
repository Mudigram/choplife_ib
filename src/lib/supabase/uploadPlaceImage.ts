

import { supabase } from "./supabaseClient";

export async function uploadPlaceImage(file: File, placeName: string) {
  // Sanitize file name
  const fileExt = file.name.split(".").pop();
  const sanitizedName = placeName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const fileName = `${sanitizedName}-${Date.now()}.${fileExt}`;
  const filePath = `places/${fileName}`;

  console.log("🚀 Starting upload:", { fileName, bucket: "places-images" });

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("places-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("❌ Upload failed:", uploadError);
    throw uploadError;
  }

  console.log("✅ Upload successful:", uploadData);

  // Get public URL
  const { data } = supabase.storage.from("places-images").getPublicUrl(filePath);
  console.log("🔗 Public URL:", data.publicUrl);
  
  return data.publicUrl;
}
