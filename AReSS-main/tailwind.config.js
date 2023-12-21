/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "538px",
      md: "720px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      height: {
        "h-custom": "570px",
        "h-homeInfo": "448px",
      },
      width: {
        "w-homeInfo": "1450px",
        "w-prova": "320px",
      },
      colors: {
        "bg-header": "#C2151B",
        "bg-footerUp": "#660B0E",
        "bg-footerDown": "#330607",
        "bg-finalSidebar": "rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
