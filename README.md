# 🌤️ OpenWeatherApp

A modern, feature-rich weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather data, air quality insights, allergy alerts, and intelligent AI-powered weather assistance.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue)
![License](https://img.shields.io/badge/License-MIT-green)


## Features

- Current weather and 7-day forecast
- Hourly breakdown
- Weather alerts
- Air quality and pollen info
- UV index and historical weather
- Location search and favorites
- Dark mode
- **AI Summarizer**: Get instant, location-based weather summaries powered by GPT-3.5-turbo (OpenRouter API)
- **Dynamic Island UI**: Animated, non-intrusive summary panel inspired by Apple's Dynamic Island


## Getting Started

1. **Clone the repository**
	```bash
	git clone https://github.com/AyaanplayszYT/OpenWeatherApp.git
	cd OpenWeatherApp
	```

2. **Install dependencies**
	```bash
	npm install
	```

3. **Add your OpenRouter API key**
	- Create a `.env` file in the project root
	- Add this line:
	  ```
	  VITE_OPENROUTERKEY=your_key_here
	  ```

4. **Start the development server**
	```bash
	npm run dev
	```
	- Open your browser at `http://localhost:5173/`


## Usage

- Search for any city
- Add favorite locations
- View weather analytics
- Use dark mode for night viewing
- Click the ✨ **Summarise Page** button at the top to get an AI-generated summary of the current weather and recommendations


## Tech Stack

- React, TypeScript, Tailwind CSS
- Open-Meteo API for weather
- BigDataCloud for geocoding
- OpenRouter API (GPT-3.5-turbo) for AI summaries


## License

MIT
