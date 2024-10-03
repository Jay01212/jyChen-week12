<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Weather Search</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="city" class="form-label">Enter City</label>
                    <input type="text" class="form-control" id="city" v-model="city" placeholder="Enter city name">
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="searchByCity" class="btn btn-primary">Search</button>
                </div>
            </div>
        </div>

        <!-- Display weather information if API returns data -->
        <main v-if="weatherData" class="mt-5 text-center">
            <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </main>
    </div>
</template>

<script>
import axios from "axios";

const apikey = "b71393e130c84c2185d79cf9430e8887";

export default {
    name: "WeatherApp",
    data() {
        return {
            city: "",
            weatherData: null,
            hourlyForecast: [],
            dailyForecast: [],
            isLoading: false,  // To indicate whether data is loading
            errorMessage: ""   // To display error messages
        };
    },
    computed: {
        // Request temperature in Celsius directly from the API
        temperature() {
            return this.weatherData ? Math.floor(this.weatherData.main.temp) : null;
        },
        iconUrl() {
            return this.weatherData
                ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                : null;
        },
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async fetchCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const url = this.buildWeatherApiUrl(latitude, longitude);
                        await this.fetchWeatherData(url);
                    },
                    (error) => {
                        // Error handling when user does not allow location access
                        this.errorMessage = "Unable to access your location.";
                        console.error("Geolocation error:", error);
                    }
                );
            } else {
                this.errorMessage = "Geolocation is not supported by this browser.";
            }
        },
        // Build the API request URL
        buildWeatherApiUrl(lat, lon) {
            return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
        },
        // Fetch weather data asynchronously
        async fetchWeatherData(url) {
            this.isLoading = true;  // Set loading state when request begins
            this.errorMessage = ""; // Clear any previous error message

            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
            } catch (error) {
                // Catch and display request error
                this.errorMessage = "Error fetching weather data. Please try again.";
                console.error("Error fetching weather data:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
