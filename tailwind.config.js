// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/app/**/*.{js,ts,jsx,tsx}'], // ✅ Ensure it scans app directory
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stockGreen: '#10B981', // Growth (Green)
        stockRed: '#EF4444', // Losses (Red)
        stockGold: '#FACC15', // Wealth (Gold)
        stockDark: '#1E293B', // Professional Dark Gray
        stockLight: '#F3F4F6', // Light Gray Text Background
      },
    },
  },
  plugins: [],
};
