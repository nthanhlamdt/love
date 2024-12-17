import daisyui from 'daisyui'
import aspect from '@tailwindcss/aspect-ratio'
import animated from 'tailwindcss-animated'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
		extend: {
			fontFamily: {
				handwriting: ['Dancing Script', 'cursive'],
				lovelight: ['Love Light', 'cursive']
			}
  	}
  },
  plugins: [
    daisyui,
    aspect,
    animated,
    require('tailwindcss-animate')
	]
}

