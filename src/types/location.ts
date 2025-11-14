export interface LocationSuggestion {
  place_id: string | number;
  display_name: string;
  lat: string; // Nominatim returns strings
  lon: string;
}

export interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (name: string, lat?: number, lng?: number) => void;
}
