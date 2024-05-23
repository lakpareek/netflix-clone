const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, theme }) {
  const textShadowUtilities = theme('textShadow', {});
  
  const utilities = Object.entries(textShadowUtilities).map(([key, value]) => ({
    [`.text-shadow-${key}`]: {
      textShadow: value,
    },
  }));
  
  addUtilities(utilities);
});
