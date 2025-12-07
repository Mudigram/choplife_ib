# 🌟 ChopLife IB

> **Discover Ibadan, One Vibe at a Time**

ChopLife IB is a modern, full-stack web application that serves as the ultimate discovery and community platform for Ibadan, Nigeria. Built with Next.js 16 and powered by Supabase, it helps users explore the best places, events, and experiences in the city through an engaging, mobile-first interface with premium aesthetics.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Powered-3ecf8e?style=flat-square&logo=supabase)

---

## ✨ Features

### 🎯 User Features
- **🗺️ Place Discovery** - Explore restaurants, cafes, bars, and hangout spots across Ibadan
- **🎉 Event Browsing** - Find concerts, parties, tech meetups, cultural festivals, and more
- **⭐ Reviews & Ratings** - Read and write authentic reviews from locals
- **💾 Favorites** - Save your favorite places and events for quick access
- **🔍 Smart Search** - Full-text search across places and events
- **🗺️ Interactive Maps** - Leaflet-powered maps with custom markers and location details
- **👤 User Profiles** - Personalized profiles with avatar upload, bio, and activity tracking
- **📱 Mobile-First Design** - Fully responsive with premium dark theme and neon accents
- **🎨 Beautiful UI** - Glassmorphism effects, smooth animations, and micro-interactions

### 🛡️ Admin Features
- **📊 Dashboard** - Comprehensive analytics with stats cards and growth charts
- **✅ Review Moderation** - Approve or reject pending reviews
- **📝 Content Management** - Full CRUD operations for places and events
- **👥 User Management** - View users and manage roles
- **📈 Analytics** - Data visualization with interactive charts
- **🔐 Role-Based Access** - Secure admin routes with middleware protection

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS with custom design system
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[React Query](https://tanstack.com/query/latest)** - Data fetching and caching
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management with persistence
- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Backend & Services
- **[Supabase](https://supabase.com/)** - PostgreSQL database, authentication, and storage
- **Next.js API Routes** - Server-side logic
- **Middleware** - Auth and admin route protection

---

## 🎨 Design System

ChopLife IB features a custom **dark, neon-accented aesthetic** called the "ChopLife Palette":

### Color Scheme
- **Deep Charcoal** (`#101014`) - Main background
- **Glassmorphism** - Cards with subtle transparency
- **Orange-Red** (`#FF3D00`) - Primary CTAs and actions
- **Amber** (`#FFB300`) - Points, ratings, and value indicators
- **Mint/Cyan** (`#00FFC2`) - Status and trending info
- **Vivid Pink** (`#FF0099`) - Errors and alerts

### Typography
- **Urbanist** & **Poppins** - Modern, rounded fonts for premium feel

### Effects
- Neon glows on interactive elements
- Smooth page transitions
- Micro-animations for enhanced UX
- Glassmorphism cards with backdrop blur

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (home)/            # User-facing routes
│   ├── admin/             # Admin panel
│   ├── places/[id]/       # Dynamic place pages
│   ├── events/[id]/       # Dynamic event pages
│   └── page.tsx           # Landing page
│
├── components/            # React components
│   ├── admin/            # Admin-only components
│   ├── home/             # Home page components
│   ├── places/           # Place-related components
│   ├── events/           # Event-related components
│   ├── profile/          # User profile components
│   ├── navigation/       # Navigation components
│   ├── map/              # Map components
│   └── ui/               # Reusable UI primitives
│
├── hooks/                 # Custom React hooks
│   ├── admin/            # Admin-specific hooks
│   └── [user hooks]      # User data hooks
│
├── lib/                   # Utilities and helpers
│   ├── admin/            # Admin utilities
│   ├── auth/             # Authentication helpers
│   └── supabase/         # Supabase client
│
├── types/                 # TypeScript definitions
│   ├── place.ts          # Place types
│   ├── events.ts         # Event types
│   ├── user.ts           # User types
│   └── review.ts         # Review types
│
├── redux/                 # Redux store
│   └── slices/           # State slices
│
└── middleware.ts          # Route protection
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 20+ and npm
- **Supabase** account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/choplife_ib.git
   cd choplife_ib
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📊 Database Schema

### Core Tables
- **`places`** - Restaurants, cafes, bars with rich metadata (JSONB fields for contact info, opening hours, chef/founder details)
- **`ibadan_events`** - Events with categories, pricing, gallery images, and attendee counts
- **`reviews`** - User reviews with ratings and moderation status
- **`favorites`** - User-saved places and events
- **`profiles`** - Extended user data (bio, avatar, points)
- **`event_sections`** - Featured event groupings for homepage

---

## 🔐 Authentication & Authorization

- **Supabase Auth** with email/password
- **Role-based access control** (user, admin)
- **Protected routes** via Next.js middleware
- **Redux state management** for auth persistence

---

## ⚡ Performance Optimizations

- ✅ React Query for intelligent data caching
- ✅ Lazy loading for heavy components (maps)
- ✅ Code splitting by route
- ✅ Image optimization with Next.js Image
- ✅ Bundle analysis with @next/bundle-analyzer

---

## 📖 Documentation

The project includes comprehensive guides:
- **[DATA_FETCHING_GUIDE.md](./DATA_FETCHING_GUIDE.md)** - Complete tutorial on creating hooks and fetching data
- **[ADMIN_STRUCTURE.md](./ADMIN_STRUCTURE.md)** - Admin panel architecture and separation of concerns

---

## 🎯 Key Patterns

### Data Fetching
All data fetching follows a consistent custom hook pattern:

```typescript
// Pattern: useResource(params)
const { data, loading, error } = useResource(userId);

// Examples:
const { places, loading, error } = usePlaces();
const { favorites, loading, error } = useFavorites(userId);
const { reviews, loading, error } = useReviews(userId);
```

### Component Organization
- **Clear separation** between admin and user components
- **Type-safe** with comprehensive TypeScript coverage
- **Reusable UI primitives** in `components/ui/`
- **Custom hooks** for all data operations

---

## 🚧 Roadmap

- [ ] Real-time notifications
- [ ] Social sharing features
- [ ] Gamification and rewards system
- [ ] Merchant partnerships and verification
- [ ] Mobile app (React Native)
- [ ] Advanced analytics for merchants
- [ ] Event ticketing integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ for the Ibadan community

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">
  <strong>ChopLife IB</strong> - Discover Ibadan, One Vibe at a Time 🌟
</div>
