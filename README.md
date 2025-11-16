# 🌤️ OpenWeatherApp

A modern, feature-rich weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather data, air quality insights, allergy alerts, and intelligent AI-powered weather assistance.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🌍 Core Weather
- **Real-time Weather Data** - Current temperature, humidity, wind speed, pressure
- **7-Day Forecast** - Daily weather predictions with high/low temperatures
- **Hourly Forecast** - 12-hour detailed breakdown with precipitation forecasts
- **Animated Weather Icons** - Dynamic, weather-code-based animated icons
- **Glassmorphism Design** - Modern, frosted glass UI with beautiful gradients

### 🌡️ Advanced Weather Metrics
- **UV Index Tracking** - Real-time UV levels with health recommendations
- **Moon Phase Calculator** - Illumination percentage and phase details
- **Rainfall Chart** - 7-day precipitation visualization with probabilities
- **Dew Point & Pressure** - Additional meteorological data points
- **Feels Like Temperature** - Apparent temperature based on wind chill

### 📊 Data & Analytics
- **Weather Alerts** - Real-time severe weather warnings (Extreme, Severe, Moderate, Minor)
- **Air Quality Index (AQI)** - Pollution levels with health recommendations
  - Pollutant tracking: PM2.5, PM10, NO₂, O₃
  - 6-level severity indicator with color coding
- **Pollen Count** - Allergy sufferers tracking (Tree, Grass, Weed)
  - Risk level assessment with prevention tips
- **UV Index History** - 7-day UV exposure tracking with trend analysis
- **Historical Weather** - Year-over-year weather comparison with insights

### 🤖 AI Assistant
- **Draggable AI Chat Widget** - Floating, movable weather assistant
- **Real AI Responses** - Powered by OpenRouter (Meta Llama 2 7B)
- **Rate Limiting** - 5 messages per minute with 1-second cooldown
- **Glassmorphic Design** - Beautiful transparent chat interface
- **Message History** - Persistent chat history with timestamps

### 🎨 User Experience
- **Location Search** - Find weather for any city worldwide
- **Favorite Locations** - Save and quickly access favorite places
- **Dark Mode Toggle** - Easy on the eyes day or night
- **Temperature Units** - Switch between Celsius and Fahrenheit
- **Real-time Clock** - Display current time with updates every second
- **Smooth Animations** - Fade-in transitions when changing locations
- **Gradient Overlays** - Cards adapt colors based on weather conditions
- **Responsive Design** - Mobile, tablet, and desktop optimized

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6 support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/OpenWeatherApp.git
   cd OpenWeatherApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_OPENROUTERKEY=your_openrouter_api_key" > .env
   ```

   Get your OpenRouter API key:
   - Visit [OpenRouter](https://openrouter.ai/)
   - Sign up and create an API key
   - Add it to your `.env` file

4. **Background image setup**
   ```bash
   # Ensure background.jpg exists in public folder
   # Place your weather background image at: public/background.jpg
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📦 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage
- **APIs**:
  - Open-Meteo for weather data
  - OpenRouter for AI responses
  - BigDataCloud for reverse geocoding

## 🔑 API Keys Required

### OpenRouter API (For AI Chat)
1. Sign up at [openrouter.ai](https://openrouter.ai/)
2. Create an API key
3. Add to `.env` file:
   ```
   VITE_OPENROUTERKEY=your_key_here
   ```

### Public APIs (No key required)
- **Open-Meteo**: Free weather data API
- **BigDataCloud**: Free reverse geocoding

## 📱 Usage

### Searching for Weather
1. Click the search bar at the top
2. Type a city name
3. Press Enter to search
4. Weather data updates instantly

### Adding Favorite Locations
1. Navigate to the **Favorite Locations** section
2. Click "+ Add" button
3. Enter city name and confirm
4. Click saved favorites to switch locations

### Using AI Weather Assistant
1. Click the **chat icon** (bottom right)
2. Type your weather question
3. Get intelligent responses about weather conditions
4. Drag the chat window to reposition

### Viewing Analytics
1. Scroll to **Data & Analytics** section
2. Check **Weather Alerts** for severe warnings
3. View **Air Quality Index** for pollution levels
4. Check **Pollen Count** for allergy information
5. Review **UV Index History** for sun exposure
6. Compare **Historical Weather** with previous years
                  
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Alert**: Orange (#f97316)
- **Danger**: Red (#ef4444)
- **Accent**: Purple (#8b5cf6)

### Glassmorphism
- Backdrop blur: 12-16px
- Saturation: 180%
- Border: 1px solid rgba(255, 255, 255, 0.18-0.25)
- Shadow: rgba(31, 38, 135, 0.1)

### Typography
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Text Color**: White (#fff) globally for contrast

## 🔒 Environment Variables

```bash
# Required
VITE_OPENROUTERKEY=your_openrouter_api_key_here
```

## 📊 Weather Data Points

### Current Conditions
- Temperature, Humidity, Pressure
- Wind Speed & Direction
- Weather Code
- Apparent Temperature (Feels Like)
- Dew Point

### Daily Forecast
- Max/Min Temperature
- Weather Code
- Sunrise/Sunset Time
- UV Index
- Precipitation
- Precipitation Probability

### Hourly Forecast
- Temperature
- Humidity
- Visibility
- Precipitation Probability
- Dew Point

## 🐛 Known Issues & Troubleshooting

### Issue: Location redirects after search
**Solution**: Ensure coordinates are saved to localStorage before state updates

### Issue: AI chat not responding
**Solution**: 
- Check VITE_OPENROUTERKEY is set correctly
- Verify API key has available credits
- Check browser console for errors

### Issue: Background image not showing
**Solution**: 
- Place `background.jpg` in `public/` folder
- Clear browser cache and reload
- Check CSS z-index layering

### Issue: Geolocation not working
**Solution**: 
- Allow location permission in browser settings
- Ensure HTTPS connection (required for geolocation)
- Use search bar as alternative

## 🚀 Performance Optimizations

- **React Query**: Automatic caching with 5-minute refetch intervals
- **Code Splitting**: Lazy-loaded components for faster initial load
- **Image Optimization**: Optimized background image
- **CSS Minification**: Tailwind production optimizations
- **API Debouncing**: Search requests handled efficiently

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Contact via email

## 🎯 Roadmap

### Coming Soon
- [ ] Push notifications for weather alerts
- [ ] Custom weather widgets
- [ ] Weather comparison for multiple cities
- [ ] Advanced analytics dashboard
- [ ] Offline mode with cached data
- [ ] Mobile app (React Native)
- [ ] Weather API integration for more data sources
- [ ] Social sharing features

### Future Enhancements
- [ ] Machine learning-based weather predictions
- [ ] Extreme weather early warning system
- [ ] Air quality improvement recommendations
- [ ] Health impact assessments
- [ ] Social features and community insights

## 🏆 Credits

- **Weather Data**: [Open-Meteo](https://open-meteo.com/)
- **Reverse Geocoding**: [BigDataCloud](https://www.bigdatacloud.com/)
- **AI**: [OpenRouter](https://openrouter.ai/) with Meta Llama 2
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📈 Stats

- **Components**: 20+ custom React components
- **Lines of Code**: 5000+
- **APIs Integrated**: 3 weather/data services
- **Features**: 25+ major features
- **Responsive Breakpoints**: Mobile, Tablet, Desktop

---

by Ayaan
