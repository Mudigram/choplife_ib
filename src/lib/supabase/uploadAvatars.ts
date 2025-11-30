
import { supabase } from "./supabaseClient";

export async function uploadAvatar(userId: string, file: File) {
  // Generate unique file name
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  // Update user record
  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (updateError) throw updateError;

  return publicUrl;
}
