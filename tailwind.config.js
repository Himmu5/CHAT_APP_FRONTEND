/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'Chat' : "url('https://cdn.discordapp.com/attachments/1001501407033168014/1122061967759257682/ChatBG.png')"
      },
    },
  },
  plugins: [],
}

