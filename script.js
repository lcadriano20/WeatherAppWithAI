
// Variáveis e seleção de elementos; 

const apiWeatherKey = "";


const cityInput          = document.querySelector('#city-input');
const searchBtn          = document.querySelector('#search');

const cityElement        = document.querySelector('#city')
const tempElement        = document.querySelector('#temperature span')
const descElement        = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement     = document.querySelector('#country')
const umidityElement     = document.querySelector('#umidity span')
const windElement        = document.querySelector('#wind span')
const curiositiesDiv     = document.querySelector('#curiosityDiv')
const citySpanName       = document.querySelector('#citySpanName')   




// Funções 
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data


}  

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}



const showWeatherData = async (city) => {
   let data = await getWeatherData(city)


   let apiCountryURL = `https://flagsapi.com/${data.sys.country}/shiny/64.png`

   console.log(data.weather[0].icon)


    citySpanName.innerText   = data.name
    cityElement.innerText    = data.name
    tempElement.innerText    = parseInt(data.main.temp)
    descElement.innerText    = capitalizeFirstLetter(data.weather[0].description)
    weatherIconElement.setAttribute(
    "src",
   `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`

   );
    countryElement.setAttribute("src", apiCountryURL)
    umidityElement.innerText = `${data.main.humidity} %`
    windElement.innerHTML   = `${data.wind.speed} km/h`
    


}

const API_KEY = ""
const API_URL = ""

const generate = async (city) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user",content: `Cite 3 pequenas curiosidades sobre ${city}.`}]
            })
        })
        const data = await response.json()

        const paragraphs = data.choices[0].message.content.split('\n\n')
        
        includeDataOnHtml(paragraphs[0],paragraphs[1],paragraphs[2])


    } catch(err) {
        console.log(err)
    }
}
function includeDataOnHtml(curiosity1,curiosity2,curiosity3) {
    const curiositiesParagraph1 = document.createElement('p');
    curiositiesParagraph1.textContent = curiosity1;
    curiositiesDiv.appendChild(curiositiesParagraph1);

    const curiositiesParagraph2 = document.createElement('p');
    curiositiesParagraph2.textContent = curiosity2;
    curiositiesDiv.appendChild(curiositiesParagraph2);

    const curiositiesParagraph3 = document.createElement('p');
    curiositiesParagraph3.textContent = curiosity3;
    curiositiesDiv.appendChild(curiositiesParagraph3);

}
function removeParagraphBeforeInsertAnotherOne() {
    
        while(curiositiesDiv.querySelector('p')) {
            let paragraph =curiositiesDiv.querySelector('p')
            curiositiesDiv.removeChild(paragraph)
        }
    
}


//Eventos 
searchBtn.addEventListener('click',(e)=> {
    e.preventDefault()
    const city = cityInput.value
    cityInput.value = ""

    removeParagraphBeforeInsertAnotherOne()
    generate(city)
    showWeatherData(city)
    
})  