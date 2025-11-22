import { supabase } from "./supabaseClient";

export async function updateUserLocation(
  locationName: string,
  lat: number,
  lon: number
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("users")
    .update({
      location: locationName,
      latitude: lat,
      longitude: lon,
    })
    .eq("id", user.id);

  if (error) console.error("Error saving location:", error);
}
