# Data Fetching Guide for ChopLife IB

This guide teaches you how to fetch data from Supabase for your components, following the patterns used in this codebase.

## Table of Contents

1. [Basic Hook Pattern](#basic-hook-pattern)
2. [Creating a Custom Hook](#creating-a-custom-hook)
3. [Using Hooks in Components](#using-hooks-in-components)
4. [Advanced Patterns](#advanced-patterns)
5. [Best Practices](#best-practices)

## Basic Hook Pattern

All data fetching in this codebase follows a consistent pattern using React hooks. Here's the basic structure:

```typescript
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { YourType } from "@/types/yourType";

export function useYourData(userId: string | undefined) {
  const [data, setData] = useState<YourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("your_table")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Error fetching data:", fetchError);
          setError(fetchError.message);
          setData([]);
        } else {
          setData(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { data, loading, error };
}
```

## Creating a Custom Hook

### Step 1: Create the Hook File

Create a file in `src/hooks/` following the naming pattern: `use[YourDataName].ts`

**Example: `src/hooks/useReviews.ts`**

```typescript
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Review } from "@/types/review";
import type { Place } from "@/types/place";

// Extended type that includes related data
export type ReviewWithPlace = Review & {
  place?: Place;
};

export function useReviews(userId: string | undefined) {
  const [reviews, setReviews] = useState<ReviewWithPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch reviews with joined place data
        const { data, error: fetchError } = await supabase
          .from("reviews")
          .select(
            `
            *,
            place:places(*)
          `
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Error fetching reviews:", fetchError);
          setError(fetchError.message);
          setReviews([]);
        } else {
          // Transform the data to match our type
          type SupabaseReviewResponse = Review & {
            place?: Place | Place[] | null;
          };

          const reviewsWithPlaces: ReviewWithPlace[] = (data || []).map(
            (review: SupabaseReviewResponse) => ({
              id: review.id,
              user_id: review.user_id,
              place_id: review.place_id,
              rating: review.rating,
              comment: review.comment,
              created_at: review.created_at,
              place: Array.isArray(review.place)
                ? review.place[0] || undefined
                : review.place || undefined,
            })
          );
          setReviews(reviewsWithPlaces);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  return { reviews, loading, error };
}
```

### Step 2: Define Your Type

Make sure you have a type definition in `src/types/`:

**Example: `src/types/review.ts`**

```typescript
export type Review = {
  id: string;
  user_id: string;
  place_id: string;
  rating: number;
  comment?: string;
  created_at?: string;
};
```

## Using Hooks in Components

### Step 1: Import the Hook

```typescript
import { useReviews } from "@/hooks/useReviews";
```

### Step 2: Use the Hook in Your Component

```typescript
"use client";

import { useReviews } from "@/hooks/useReviews";

type ReviewsTabProps = {
  userId: string;
};

export default function ReviewsTab({ userId }: ReviewsTabProps) {
  const { reviews, loading, error } = useReviews(userId);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center text-chop-text-subtle p-6">
        Loading reviews...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center text-chop-accent-error p-6">
        Error loading reviews: {error}
      </div>
    );
  }

  // Handle empty state
  if (reviews.length === 0) {
    return (
      <div className="text-center text-chop-text-subtle p-6">
        <p>You haven't written any reviews yet.</p>
        <p className="text-sm mt-2">Start reviewing places you've visited!</p>
      </div>
    );
  }

  // Render your data
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold text-chop-text-light mb-4">
        Your Reviews ({reviews.length})
      </h3>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-chop-bg-card p-4 rounded-xl shadow-sm border border-white/10"
        >
          {review.place && (
            <h4 className="text-chop-text-light font-semibold mb-2">
              {review.place.name}
            </h4>
          )}
          <p className="text-chop-text-subtle text-sm">{review.comment}</p>
          <div className="mt-2">
            <span className="text-chop-accent-point">
              {"★".repeat(review.rating)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Advanced Patterns

### Fetching Data Without User ID

For public data that doesn't require a user ID:

```typescript
export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("places")
          .select("*")
          .order("is_featured", { ascending: false });

        if (fetchError) {
          console.error("Error fetching places:", fetchError);
          setError(fetchError.message);
          setPlaces([]);
        } else {
          setPlaces(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch places");
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []); // Empty dependency array - fetch once on mount

  return { places, loading, error };
}
```

### Fetching Single Item

For fetching a single item by ID:

```typescript
export function usePlace(placeId: string | undefined) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      setLoading(false);
      return;
    }

    const fetchPlace = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("places")
          .select("*")
          .eq("id", placeId)
          .single(); // Use .single() for one result

        if (fetchError) {
          console.error("Error fetching place:", fetchError);
          setError(fetchError.message);
          setPlace(null);
        } else {
          setPlace(data);
        }
      } catch (err) {
        console.error("Failed to fetch place:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch place");
        setPlace(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId]);

  return { place, loading, error };
}
```

### Complex Queries with Filters

```typescript
export function useFilteredPlaces(category?: string, searchTerm?: string) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase.from("places").select("*");

        // Apply filters conditionally
        if (category) {
          query = query.eq("category", category);
        }

        if (searchTerm) {
          query = query.ilike("name", `%${searchTerm}%`);
        }

        const { data, error: fetchError } = await query.order("created_at", {
          ascending: false,
        });

        if (fetchError) {
          console.error("Error fetching places:", fetchError);
          setError(fetchError.message);
          setPlaces([]);
        } else {
          setPlaces(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch places");
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [category, searchTerm]); // Refetch when filters change

  return { places, loading, error };
}
```

## Best Practices

### 1. Always Handle Loading, Error, and Empty States

```typescript
// ✅ Good
if (loading) return <LoadingComponent />;
if (error) return <ErrorComponent error={error} />;
if (data.length === 0) return <EmptyStateComponent />;

// ❌ Bad
return <div>{data.map(...)}</div>; // No error handling
```

### 2. Use TypeScript Types

Always define and use TypeScript types for your data:

```typescript
// ✅ Good
import type { Place } from "@/types/place";
const [places, setPlaces] = useState<Place[]>([]);

// ❌ Bad
const [places, setPlaces] = useState([]); // No type safety
```

### 3. Handle Optional Dependencies

Always check if required parameters exist before fetching:

```typescript
// ✅ Good
useEffect(() => {
  if (!userId) {
    setLoading(false);
    return;
  }
  // ... fetch data
}, [userId]);

// ❌ Bad
useEffect(() => {
  // ... fetch data with userId (might be undefined)
}, [userId]);
```

### 4. Use Theme Colors

Always use your theme colors for consistent styling:

```typescript
// ✅ Good
<div className="text-chop-text-light bg-chop-bg-card">
  <p className="text-chop-text-subtle">Loading...</p>
</div>

// ❌ Bad
<div className="text-white bg-gray-800">
  <p className="text-gray-400">Loading...</p>
</div>
```

### 5. Clean Up and Error Handling

Always use try-catch and finally blocks:

```typescript
// ✅ Good
try {
  setLoading(true);
  setError(null);
  // ... fetch data
} catch (err) {
  setError(err instanceof Error ? err.message : "Failed to fetch");
} finally {
  setLoading(false);
}
```

### 6. Join Related Data When Needed

Use Supabase's join syntax to fetch related data in one query:

```typescript
// ✅ Good - Fetches place data with favorites
const { data } = await supabase
  .from("favorites")
  .select(
    `
    *,
    place:places(*)
  `
  )
  .eq("user_id", userId);

// ❌ Bad - Makes multiple queries
const { data: favorites } = await supabase.from("favorites").select("*");
const { data: places } = await supabase.from("places").select("*");
```

## Real-World Example: Profile Tabs

Here's how the profile tabs are set up in this codebase:

### 1. Parent Component (Profile Page)

```typescript
// src/app/(home)/profile/page.tsx
export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { profile, loading } = useProfile(user?.id);

  // ... loading and error handling

  return (
    <div>
      <ProfileHeader user={profileData} />
      <ProfileTabs user={profileData} />
    </div>
  );
}
```

### 2. Tab Container Component

```typescript
// src/components/profile/ProfileTabs.tsx
export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      {/* Tab buttons */}
      <div>
        {tabs.map((tab) => (
          <button onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "overview" && <OverviewTab user={user} />}
        {activeTab === "favorites" && <FavoritesTab userId={user.id} />}
        {activeTab === "reviews" && <ReviewsTab userId={user.id} />}
      </div>
    </div>
  );
}
```

### 3. Individual Tab Component

```typescript
// src/components/profile/tabs/FavoritesTab.tsx
export default function FavoritesTab({ userId }: FavoritesTabProps) {
  const { favorites, loading, error } = useFavorites(userId);

  // Handle states and render data
  // ...
}
```

## Common Supabase Queries

### Basic Select

```typescript
const { data } = await supabase.from("table_name").select("*");
```

### Filter by Column

```typescript
const { data } = await supabase
  .from("table_name")
  .select("*")
  .eq("column_name", value);
```

### Order Results

```typescript
const { data } = await supabase
  .from("table_name")
  .select("*")
  .order("created_at", { ascending: false });
```

### Join Related Tables

```typescript
const { data } = await supabase.from("table_name").select(`
    *,
    related_table:related_table_name(*)
  `);
```

### Limit Results

```typescript
const { data } = await supabase.from("table_name").select("*").limit(10);
```

### Search/Filter

```typescript
const { data } = await supabase
  .from("table_name")
  .select("*")
  .ilike("column_name", `%${searchTerm}%`);
```

## Summary

1. **Create a hook** in `src/hooks/` following the pattern above
2. **Define types** in `src/types/` for type safety
3. **Use the hook** in your component and handle loading/error/empty states
4. **Use theme colors** for consistent styling
5. **Join related data** when possible to reduce queries
6. **Always handle errors** gracefully

For more information, check out:

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- Existing hooks in `src/hooks/` for reference
- Existing components in `src/components/` for usage examples
