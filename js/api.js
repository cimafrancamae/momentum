//Call Quote API
export function getQuote() {
    const apiUrl = 'https://api.quotable.io/random';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const quoteText = data.content;
    const quoteAuthor = data.author;

    const liId = `li-${Date.now()}`,
        quote = `"${quoteText}" - ${quoteAuthor}`
    
    // Display the quote
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = quote;

    localStorage.setItem(liId, quote)
  })
  .catch((error) => {
    console.error('Error fetching quote:', error);
  });

}

// Function to fetch weather data from OpenWeatherMap API
export async function fetchWeatherData() {
  const apiKey = '248c8ff5523139684ba834f498fa3a5b';
  const city = 'Cebu'; 

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Units can be metric, imperial, or standard

//   console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const weatherData = await response.json();

    // Display weather data in the UI
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon,
        iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

    
    document.getElementById('weather-icon').innerHTML = `<img src="${iconURL}" alt="Weather Icon">`;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = `${description}`;
    document.getElementById('location').textContent = `, ${city} City`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Call the fetchWeatherData function when the page loads
// window.addEventListener('load', fetchWeatherData);
