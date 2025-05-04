module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#34495E",
          DEFAULT: "#1F2A37",
          dark: "#0F172A",
        },
        accent: {
          light: "#F6AD55",
          DEFAULT: "#DD6B20",
          dark: "#C05621",
        },
        neutral: {
          100: "#F2F4F7",
          300: "#D0D5DD",
          500: "#667085",
          700: "#344054",
          900: "#101828",
        },
      },
      boxShadow: {
        card: "0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
        nav: "0 1px 3px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        lg: "0.75rem",
      },
    },
  },
  plugins: [],
};
