/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: {
          50: '#f3f0ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#334155',
          text: '#e2e8f0',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#f1f5f9',
          text: '#1e293b',
        },
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#8b5cf6",
          "primary-focus": "#7c3aed",
          "primary-content": "#ffffff",
          "secondary": "#ec4899",
          "secondary-focus": "#db2777",
          "secondary-content": "#ffffff",
          "accent": "#14b8a6",
          "accent-focus": "#0d9488",
          "accent-content": "#ffffff",
          "neutral": "#2b3544",
          "neutral-focus": "#16a34a",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "base-content": "#1f2937",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      {
        dark: {
          "primary": "#a78bfa",
          "primary-focus": "#c4b5fd",
          "primary-content": "#1e1b4b",
          "secondary": "#f472b6",
          "secondary-focus": "#f9a8d4",
          "secondary-content": "#500724",
          "accent": "#2dd4bf",
          "accent-focus": "#67e8f9",
          "accent-content": "#0d2e2e",
          "neutral": "#1e293b",
          "neutral-focus": "#0f172a",
          "neutral-content": "#e2e8f0",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#e2e8f0",
          "info": "#60a5fa",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
  plugins: [],
}
