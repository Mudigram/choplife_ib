
import { supabase } from "./supabaseClient";

export async function uploadEventImage(file: File, eventTitle: string) {
  // Sanitize file name
  const fileExt = file.name.split(".").pop();
  const sanitizedName = eventTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const fileName = `${sanitizedName}-${Date.now()}.${fileExt}`;
  const filePath = `thumbnails/${fileName}`;

  console.log("🚀 Starting event image upload:", { fileName, bucket: "events" });

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("events")
    .upload(filePath, file);

  if (uploadError) {
    console.error("❌ Upload failed:", uploadError);
    throw uploadError;
  }

  console.log("✅ Upload successful:", uploadData);

  // Get public URL
  const { data } = supabase.storage.from("events").getPublicUrl(filePath);
  console.log("🔗 Public URL:", data.publicUrl);
  
  return data.publicUrl;
}
