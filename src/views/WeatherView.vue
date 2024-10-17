<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Weather APP</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="mb-3">
                    <input type="text" class="form-control" id="city" v-model="city" placeholder="Enter city name">
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="searchByCity" class="btn btn-primary" :disabled="isLoading">Search</button>
                </div>
            </div>
        </div>

        <!-- Show loading status -->
        <div v-if="isLoading" class="text-center mt-4">
            <p>Loading...</p>
        </div>

        <!-- Display error messages -->
        <div v-if="errorMessage" class="text-center mt-4 alert alert-danger">
            <p>{{ errorMessage }}</p>
        </div>

        <!-- Display weather information -->
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
            isLoading: false,
            errorMessage: "",
        };
    },
    computed: {
        temperature() {
            return this.weatherData ? Math.floor(this.weatherData.main.temp) : null;
        },
        iconUrl() {
            return this.weatherData
                ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                : null;
        },
    },
    methods: {
        async searchByCity() {
            if (!this.city) {
                this.errorMessage = "Please enter a city name.";
                return;
            }
            this.isLoading = true;
            this.errorMessage = "";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apikey}`;

            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
            } catch (error) {
                this.errorMessage = "Error fetching weather data. Please try again.";
                console.error("Error:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.text-center {
    text-align: center;
}

.mt-5 {
    margin-top: 3rem;
}

.mb-4 {
    margin-bottom: 1.5rem;
}
</style>