const apiKey = "ac321650e31ab8266d7acd60f37d6a93"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // 1. Ambil input dari user (jika parameter kosong)
    if (!city) {
        city = searchBox.value;
    }

    if (!city) return; // Stop kalau kosong

    try {
        // 2. FETCH DATA (Request ke Server)
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // 3. Cek Error (Misal: Nama kota ngawur 404)
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            // 4. Konversi Data ke JSON (Object Javascript)
            var data = await response.json();

            // 5. Update UI
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // 6. Ganti Icon Sesuai Cuaca
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(searchBox.value);
});

// Default Search saat pertama buka
checkWeather("Jakarta");