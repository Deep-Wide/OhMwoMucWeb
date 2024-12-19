/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,jsx}", // 프로젝트 파일 경로
        "./node_modules/flowbite/**/*.js", // Flowbite 컴포넌트 경로
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
    ],
};
