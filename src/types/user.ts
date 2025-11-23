// src/types/user.ts
export type UserProfile = {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  is_verified?: boolean;
  tags?: string[];
  total_points?: number;
  social_handles?: Record<string, string>;
  created_at?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
};
