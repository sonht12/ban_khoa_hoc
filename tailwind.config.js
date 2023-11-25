/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
              'xs': '500px', // Đặt kích thước cho breakpoint XS tại 500px hoặc bất kỳ kích thước nào bạn muốn
            }
          }
    },
    variants: {
        extend: {
            display: ['group-focus'],
            opacity: ['group-focus'],
            inset: ['group-focus'],
        },
    },
    plugins: [],
};
