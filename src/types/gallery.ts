export type GalleryItem = {
  id: string;
  place_id?: string;
  file_url: string;
  file_type: "image" | "video";
  width: number | null;
  height: number | null;
};
