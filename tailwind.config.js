/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        reliance: {
          blue: "#0053A6",
          deep: "#003B73",
          sky: "#EAF4FF",
          line: "#D8E3EF"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};
