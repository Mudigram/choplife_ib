# Admin Panel - File Structure

This document outlines the organization of admin-specific code, clearly separated from user-facing code.

## Directory Structure

```
src/
├── app/
│   ├── admin/                      # 🔐 ADMIN ROUTES
│   │   ├── layout.tsx             # Admin layout with sidebar
│   │   ├── page.tsx               # Dashboard
│   │   ├── reviews/
│   │   │   └── page.tsx           # Review moderation
│   │   ├── places/
│   │   │   ├── page.tsx           # Places list
│   │   │   ├── new/page.tsx       # Create place
│   │   │   └── [id]/
│   │   │       └── edit/page.tsx  # Edit place
│   │   ├── events/
│   │   │   ├── page.tsx           # Events list
│   │   │   ├── new/page.tsx       # Create event
│   │   │   └── [id]/
│   │   │       └── edit/page.tsx  # Edit event
│   │   ├── users/
│   │   │   ├── page.tsx           # Users list
│   │   │   └── [id]/page.tsx      # User detail
│   │   ├── analytics/
│   │   │   └── page.tsx           # Analytics dashboard
│   │   └── settings/
│   │       └── page.tsx           # Admin settings
│   │
│   └── (home)/                     # 👤 USER ROUTES
│       ├── home/
│       ├── profile/
│       ├── favorites/
│       └── settings/
│
├── components/
│   ├── admin/                      # 🔐 ADMIN COMPONENTS
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminBreadcrumbs.tsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── UserGrowthChart.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── reviews/
│   │   │   ├── ReviewTable.tsx
│   │   │   ├── ReviewModal.tsx
│   │   │   └── ReviewActions.tsx
│   │   ├── places/
│   │   │   ├── PlaceTable.tsx
│   │   │   ├── PlaceForm.tsx
│   │   │   └── PlaceImageUploader.tsx
│   │   ├── events/
│   │   │   ├── EventTable.tsx
│   │   │   ├── EventForm.tsx
│   │   │   └── EventCalendar.tsx
│   │   ├── users/
│   │   │   ├── UserTable.tsx
│   │   │   └── RoleSelector.tsx
│   │   └── shared/
│   │       ├── DataTable.tsx      # Reusable table
│   │       ├── SearchBar.tsx
│   │       ├── FilterModal.tsx
│   │       └── ExportButton.tsx
│   │
│   └── [user-components]/          # 👤 USER COMPONENTS
│       ├── home/
│       ├── profile/
│       ├── events/
│       └── places/
│
├── hooks/
│   ├── admin/                      # 🔐 ADMIN HOOKS
│   │   ├── useAdminStats.ts       # Dashboard stats
│   │   ├── usePendingReviews.ts   # Review moderation
│   │   ├── useAdminPlaces.ts      # Places management
│   │   ├── useAdminEvents.ts      # Events management
│   │   └── useAdminUsers.ts       # User management
│   │
│   └── [user-hooks]/               # 👤 USER HOOKS
│       ├── usePlaces.ts
│       ├── useEvents.ts
│       ├── useReviews.ts
│       └── useFavorites.ts
│
├── lib/
│   ├── admin/                      # 🔐 ADMIN UTILITIES
│   │   ├── api/
│   │   │   ├── places.ts          # Place CRUD operations
│   │   │   ├── events.ts          # Event CRUD operations
│   │   │   └── users.ts           # User management
│   │   └── utils/
│   │       ├── export.ts          # Export to CSV/JSON
│   │       └── validation.ts      # Form validation schemas
│   │
│   ├── auth/                       # 🔒 SHARED AUTH
│   │   └── roles.ts               # Role utilities
│   │
│   └── supabase/                   # 🔒 SHARED SUPABASE
│       ├── supabaseClient.ts
│       ├── moderateReview.ts      # Used by admin
│       ├── submitReview.ts        # Used by users
│       └── uploadImage.ts         # Used by both
│
└── middleware.ts                   # 🔐 Admin route protection
```

## Key Separations

### 🔐 Admin-Only Code
- **Routes**: `/admin/*`
- **Components**: `components/admin/*`
- **Hooks**: `hooks/admin/*`
- **Utils**: `lib/admin/*`

### 👤 User-Only Code
- **Routes**: `/home`, `/profile`, `/favorites`, etc.
- **Components**: `components/home/*`, `components/profile/*`, etc.
- **Hooks**: `hooks/usePlaces.ts`, `hooks/useEvents.ts`, etc.

### 🔒 Shared Code
- **Auth**: `lib/auth/*` (role checks, permissions)
- **Supabase**: `lib/supabase/*` (database operations)
- **UI**: `components/ui/*` (buttons, spinners, etc.)

## Naming Conventions

### Admin Files
- Prefix with `Admin`: `AdminSidebar.tsx`, `AdminHeader.tsx`
- Folder: `admin/` for clear separation
- Hooks: `useAdmin*` (e.g., `useAdminStats`, `useAdminPlaces`)

### User Files
- No prefix needed (default)
- Standard component names: `Header.tsx`, `Navbar.tsx`
- Hooks: `use*` (e.g., `usePlaces`, `useEvents`)

## Import Examples

```typescript
// ❌ DON'T: Import admin code in user components
import { useAdminStats } from "@/hooks/admin/useAdminStats";

// ✅ DO: Keep imports within their domain
// In admin components:
import { useAdminStats } from "@/hooks/admin/useAdminStats";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";

// In user components:
import { usePlaces } from "@/hooks/usePlaces";
import { Navbar } from "@/components/navigation/Navbar";

// Shared utilities are OK in both:
import { isAdmin } from "@/lib/auth/roles";
import { supabase } from "@/lib/supabase/supabaseClient";
```

## Benefits of This Structure

1. **Clear Separation**: Easy to identify admin vs user code
2. **Security**: Admin code is isolated and protected
3. **Maintainability**: Changes to admin don't affect user code
4. **Scalability**: Easy to add new admin features
5. **Code Splitting**: Better bundle sizes (admin code not loaded for users)
