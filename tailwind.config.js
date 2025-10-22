/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quran: ['"Amiri"', 'serif'],
      },
      colors: {
        'custom-blue': '#1e40af',
        'custom-purple': '#6b21a8',
        'custom-pink': '#db2777',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeInDown': 'fadeInDown 1s ease-out forwards',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'pulseSlow': 'pulseSlow 8s ease-in-out infinite',
        'floating': 'floating 6s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.2 },
          '50%': { transform: 'scale(1.2)', opacity: 0.3 },
        },
        floating: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}