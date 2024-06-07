/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "akpica-tomato": "#CD6A72",
                "akpica-pastel": "#F1F1E6",
                "akpica-green": "#97AFB9",
                "akpica-marco": "#FFF7D6",
                "akpica-carlo": "#264462",
                "akpica-black": "#242424",
                "akpica-white": "#ebebeb"
            },
            fontFamily: {
                "akpica-base": ['"Roboto"', "sans-serif"],
                "akpica-heading": ['"Rajdhani"', "sans-serif"]
            }
        }
    },
    plugins: []
};
