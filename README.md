# Weather Dashboard Application

This project is a Weather Dashboard application built with Next.js, React, and Tailwind CSS. It allows users to search for a city and view current weather, a 5-day forecast, and historical weather data.

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory of your project
3. Add your OpenWeatherMap API key to the file:

```
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
```

## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will start the Next.js development server. You can view the application by navigating to `http://localhost:3000` in your web browser.

## Project Structure

- **`pages/`**: Contains the main pages of the application, including the index page.
- **`components/`**: Contains React components used throughout the application.
- **`styles/`**: Contains global and module-specific CSS files.
- **`utils/`**: Contains utility functions for API calls.

## API Configuration

The application uses the OpenWeatherMap API to fetch weather data. Follow these steps to set up the environment:

## Environment Setup

1. Create a `.env.local` file in the root directory of your project
2. Add your OpenWeatherMap API key to the file:

```
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
```

## Local Storage

- The application uses local storage to cache historical weather data
- Ensure your browser allows local storage for this feature to work correctly

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)


