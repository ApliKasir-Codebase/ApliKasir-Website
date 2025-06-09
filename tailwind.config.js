// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                blob: 'blob 7s infinite ease-in-out alternate',
                'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                float: 'float 6s ease-in-out infinite',
                'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                'bounce-slow': 'bounce 3s infinite',
                // Ganti nama animasi fadeIn dan fadeOut
                modalSpecificFadeIn: 'modalSpecificFadeIn 0.3s ease-out forwards',
                modalSpecificFadeOut: 'modalSpecificFadeOut 0.3s ease-in forwards',
            },
            keyframes: {
                blob: {
                    '0%, 100%': { borderRadius: '45% 55% 70% 30% / 30% 30% 70% 70%' },
                    '50%': { borderRadius: '30% 70% 40% 60% / 60% 40% 30% 70%' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                // Ganti nama keyframes untuk fadeIn dan fadeOut
                modalSpecificFadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                modalSpecificFadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
        },
    },

    plugins: [
        forms,
        function({ addUtilities }) {
            const newUtilities = {
                '.scroll-smooth': {
                    'scroll-behavior': 'smooth',
                },
                '.line-clamp-1': {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '1',
                },
                '.line-clamp-2': {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '2',
                },
                '.line-clamp-3': {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '3',
                },
                '.line-clamp-6': {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '6',
                },
            }
            addUtilities(newUtilities)
        }
    ],
};