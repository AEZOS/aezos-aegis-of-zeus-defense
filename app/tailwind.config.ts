import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: "#F5C64C",
                red: "#FF4B4B",
                green: "#4BFF8C",
            },
        },
    },
    plugins: [],
};
export default config;
