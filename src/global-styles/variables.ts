import { css } from "styled-components";

export const variables = css`
  :root {
    --color-base: #f8f9fa;
    --color-black: #2d3748;
    --color-white: #fff;

    --color-gray-900: #111827;
    --color-gray-600: #4b5563;
    --color-gray-400: #9ca3af;
    --color-gray-300: #d1d5db;
    --color-gray-200: #e5e7eb;
    --color-gray-100: #f3f4f6;

    --color-red: #e76f51;
    --color-yellow: #e9c46a;
    --color-green: #309f92;
    --color-blue: #b3c2f2;

    --border-gray: rgba(0, 0, 0, 0.16);

    --overlay-dark: rgba(0, 0, 0, 0.75);
    --overlay-light: rgba(162, 162, 162, 0.8);

    --text-xl: 2.5rem;
    --text-lg: 2rem;
    --text-md: 1.6rem;
    --text-sm: 1.28rem;
    --text-xs: 1rem;

    --space-32: 3.2rem;
    --space-28: 2.8rem;
    --space-20: 2rem;
    --space-16: 1.6rem;
    --space-14: 1.4rem;
    --space-12: 1.2rem;
    --space-10: 1rem;
    --space-8: 0.8rem;
    --space-6: 0.6rem;
    --space-4: 0.4rem;
    --space-2: 0.2rem;
    --space-1: 0.1rem;

    --ease-out: cubic-bezier(0.61, 1, 0.88, 1);
  }

  [theme-mode="dark"] {
    --color-base: #111827;
    --color-black: #9ca3af;
    --color-black: #d1d5db;
    --color-white: #1f2937;

    --color-gray-900: #f9fafb;
    --color-gray-600: #e5e7eb;
    --color-gray-400: #9ca3af;
    --color-gray-300: #9ca3af;
    --color-gray-200: #4b5563;
    --color-gray-100: #374151;

    --border-gray: rgba(255, 255, 255, 0.16);

    --overlay-light: rgba(50, 50, 50, 0.9);
  }
`;
