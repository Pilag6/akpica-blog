/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "akpica-tomato": "#E06A4E",
                "akpica-pastel": "#E2D9A2",
                "akpica-green": "#789F8A",
                "akpica-marco": "#DEB853",
                "akpica-carlo": "#0A373A",
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
