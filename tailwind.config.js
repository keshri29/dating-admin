export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'primary-blue': '#1a237e',
      'dark-blue': '#0d1440',
      'accent-yellow': '#ffc107',
      'accent-orange': '#ff9800',
      'success-green': '#4caf50',
      'danger-red': '#f44336',
      'light-bg': '#f8f9fa',
      'medium-gray': '#6c757d',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
    animation: {
      'pulse': 'pulse 2s infinite',
      'slide-in': 'slideIn 0.8s ease forwards',
      'fade-in-up': 'fadeInUp 0.8s ease forwards',
    },
    keyframes: {
      slideIn: {
        'from': { opacity: 0, transform: 'translateX(30px)' },
        'to': { opacity: 1, transform: 'translateX(0)' },
      },
      fadeInUp: {
        'from': { opacity: 0, transform: 'translateY(40px)' },
        'to': { opacity: 1, transform: 'translateY(0)' },
      },
      spin: {
        'from': { transform: 'rotate(0deg)' },
        'to': { transform: 'rotate(360deg)' },
      },
    },
  },
};
export const plugins = [];