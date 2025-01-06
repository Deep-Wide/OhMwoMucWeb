/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
    content: [
        "./src/**/*.{html,js,jsx}", // 프로젝트 파일 경로
        "./node_modules/flowbite/**/*.js", // Flowbite 컴포넌트 경로
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        flowbite.content()
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'], // 사용자 정의 폰트
            },
        },
    },
    plugins: [
        require("flowbite/plugin"), // Flowbite 플러그인 추가
        flowbite.plugin()
    ],
};
