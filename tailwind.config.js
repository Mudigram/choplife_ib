/** @type {import('tailwindcss').Config} */
module.exports = {
  // 💥 USE THIS EXPANDED CONTENT ARRAY FOR NEXT.JS 💥
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include your specific 'src' if you use it for components/pages
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 2. Theme Extension: Where we add our custom styles
  theme: {
    extend: {
      // Custom Colors (The 'ChopLife' Palette)
      colors: {
        // Base Palette & Backgrounds
        "chop-bg-dark": "#101014", // Deep Charcoal (Main Background)
        "chop-bg-card": "rgba(255, 255, 255, 0.05)", // Used for Glassmorphism base
        "chop-bg-footer": "#0d0d0d", // Slightly darker for contrast (e.g., sticky nav)

        // Text & Hierarchy
        "chop-text-light": "#F0F0F0", // Primary Text (Soft White)
        "chop-text-subtle": "#AFAFB3", // Secondary Text/Subtitles (Warm Gray)

        // Accent/Neon Palette
        "chop-accent-cta": "#FF3D00", // Primary CTA (Orange-Red) - ACTION
        "chop-accent-point": "#FFB300", // Secondary/Points (Amber) - VALUE/RATING
        "chop-accent-status": "#00FFC2", // Tertiary/Status (Mint/Cyan) - INFO/TRENDING
        "chop-accent-error": "#FF0099", // Error/Alert (Vivid Pink) - URGENCY
      },

      // Custom Fonts (Assuming you import these via Google Fonts/CSS)
      fontFamily: {
        // Use 'sans' to replace Tailwind's default sans-serif stack
        // Prioritize your chosen bold, rounded fonts.
        sans: ["Urbanist", "Poppins", "sans-serif"],
        // Example if you want a distinct heading font:
        // display: ['Poppins', 'sans-serif'],
      },

      // Custom Shadows for the Neon Effect
      boxShadow: {
        // Apply these to buttons and icons to simulate the neon glow
        "neon-point": "0 0 8px rgba(255, 179, 0, 0.6)", // Amber glow for points/ratings
        "neon-cta": "0 0 12px rgba(255, 61, 0, 0.7)", // Stronger glow for primary actions
        "neon-status": "0 0 8px rgba(0, 255, 194, 0.6)", // Mint/Cyan glow for status/trending
      },
    },
  },

  // 3. Plugins: Add any necessary Tailwind plugins here
  plugins: [],
};
