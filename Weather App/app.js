$(document).ready(function() {
    // Event listener for the search button
    $('#search-btn').click(function() {
        searchWeather();
    });
  
    // Event listener for pressing Enter key in the search input field
    $('#location-input').keydown(function(event) {
        if (event.keyCode === 13) {
            searchWeather();
        }
    });
  
    // Function to search for weather data
    function searchWeather() {
        // Get the location entered by the user
        var location = $('#location-input').val();
      
        // Make AJAX request to fetch current weather data
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            method: 'GET',
            data: {
            q: location,
            appid: '288c12c424aec50d523acb21b84cba17', // Replace with your API key
            units: 'metric' // Use metric units for temperature
        },
        success: function(currentData) {
            // Update current weather information
            var currentWeatherInfo = `
                <p>Temperature: ${currentData.main.temp} °C</p>
                <p>Humidity: ${currentData.main.humidity} %</p>
                <p>Wind Speed: ${currentData.wind.speed} m/s</p>
                <p>Sunrise: ${new Date(currentData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(currentData.sys.sunset * 1000).toLocaleTimeString()}</p>
                <!-- Add weather icon here -->
            `;
            $('#current-weather-info').html(currentWeatherInfo);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors
            if (jqXHR.status === 404) {
                $('#current-weather-info').html('<p>Location not found</p>');
            } else if (jqXHR.status === 429) {
                $('#current-weather-info').html('<p>API rate limit exceeded. Please try again later.</p>');
            } else {
                $('#current-weather-info').html('<p>Error fetching weather data</p>');
            }
        }
        });
  
        // Make AJAX request to fetch forecast data
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast',
            method: 'GET',
            data: {
            q: location,
            appid: '288c12c424aec50d523acb21b84cba17', // Replace with your API key
            units: 'metric', // Use metric units for temperature
            cnt: 5 // Number of forecast days (adjust as needed)
        },
        success: function(forecastData) {
            // Update forecast information
            var forecastInfo = '';
            forecastData.list.forEach(function(item) {
                forecastInfo += `
                <div class="forecast-item">
                    <h6>Date: ${item.dt_txt}</h6>
                    <p>Temperature : ${item.main.temp} °C</p>
                    <p>Description: ${item.weather[0].description}</p>
                    <!-- Add weather icon here -->
                </div>
            `;
            });
            $('#forecast-info').html(forecastInfo);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors
            $('#forecast-info').html('<p>Error fetching forecast data</p>');
        }
        });
    }
    });
