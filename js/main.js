/*------------------------- Dark and Light Mood ---------------------*/
let moodButton = document.querySelector(".mood .material-icons");
let moodText = document.querySelector(".mood h2");

//Change Page Mood
moodButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mood");
    if (document.body.className === "light-mood") {
        moodButton.innerText = "light_mode";
        moodText.innerText = "Light Mode";
    } else {
        moodButton.innerText = "dark_mode";
        moodText.innerText = "Dark Mode";
    }
});

//Set Variables
let layoutFilterInfo = document.querySelector(".layout .info");
let countrySlide = document.querySelector(".country-slide");
let allCountry;
let chooseRegion = document.querySelector(".choose-region");
let allRegionDiv = document.querySelector(".all-region");
let allRegionName = document.querySelectorAll(".all-region span");
let searchInput = document.querySelector(".search input");

//country More Details Variables
let countryMoreDetails = document.querySelector(".country-more-details");
let bigFlagImage = document.querySelector(".big-flag img");
let countryDetailsName = document.querySelector(".details .name");
let countryDetailsNative = document.querySelector(".native-name");
let countryDetailsPopulation = document.querySelector(".population");
let countryDetailsRegion = document.querySelector(".region");
let countryDetailsSubRegion = document.querySelector(".sub-region");
let countryDetailsCapital = document.querySelector(".capital");
let countryDetailsDomain = document.querySelector(".domain");
let countryDetailsCurrencies = document.querySelector(".currencies");
let countryDetailsLanguages = document.querySelector(".languages");
let BorderCountries = document.querySelector(".border-countries");

//Handle Api Url
function HandleApi() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let countriesObject = JSON.parse(this.responseText);

            getCountry(countriesObject);
            deleteAsrael();
            showFilter();
            filterCountriesByRegion();
            searchCountry();
            countryDetails(countriesObject);
            backButton();
        }
    };
    myRequest.open("GET", "https://restcountries.eu/rest/v2/all", true);
    myRequest.send();
};
HandleApi();

function getCountry(obj) {
    for(let i = 0; i < obj.length; i++) {
        //Create Country Slide
        let countryDiv = document.createElement("div");
        countryDiv.className = "country";
        countryDiv.setAttribute("data-country",`${obj[i].name}`);
        countryDiv.setAttribute("data-region",`${obj[i].region}`);
        countryDiv.setAttribute("data-index",`${[i]}`);
        countryDiv.setAttribute("title","Click For More Details");

        //Create Country Image Div
        let flagDiv = document.createElement("div");
        flagDiv.className = "flag";
        let flagImg = document.createElement("img");
        flagImg.src = `${obj[i].flag}`;
        flagImg.alt = "flag";
        flagImg.loading = "lazy";
        flagImg.style.width = "100%"
        flagImg.style.height = "100%";
        flagDiv.appendChild(flagImg);

        countryDiv.appendChild(flagDiv);

        //Create Country Details Div
        let countryDetailsDiv = document.createElement("div");
        countryDetailsDiv.className = "country-details";

        let countryName = document.createElement("h1");
        countryName.innerHTML = `${obj[i].name}`;
        countryDetailsDiv.appendChild(countryName);

        let countryPopulation = document.createElement("h4");
        countryPopulation.innerHTML = `Population: <span>${obj[i].population}<span>`;
        countryDetailsDiv.appendChild(countryPopulation);

        let countryRegion = document.createElement("h4");
        countryRegion.innerHTML = `Region: <span>${obj[i].region}</span>`;
        countryDetailsDiv.appendChild(countryRegion);

        let countryCapital = document.createElement("h4");
        countryCapital.innerHTML = `Capital: <span>${obj[i].capital}</span>`;
        countryDetailsDiv.appendChild(countryCapital);

        countryDiv.appendChild(countryDetailsDiv);

        countrySlide.appendChild(countryDiv);
    }
};

//Delete Asrael Country
function deleteAsrael() {
    allCountry = document.querySelectorAll(".country");
    allCountry.forEach((ele) => {
        if (ele.dataset.country === "Israel") {
            ele.remove();
        }
    })
};

//Show Filter Region
function showFilter() {
    chooseRegion.addEventListener("click", () => {
        allRegionDiv.classList.toggle("show");
    })
};

// Filter Countries By Region Name
function filterCountriesByRegion() {
    allRegionName.forEach((region) => {
        region.addEventListener("click", () => {
            allRegionName.forEach(region => {
                region.classList.remove("active");
            });
            region.classList.add("active");
            allCountry.forEach(country => {
                country.style.display = "none";
                if (country.dataset.region === region.innerHTML) {
                    country.style.display = "block";
                } else if(region.innerHTML === "All Region") {
                    country.style.display = "block";
                }
            });
        });
    });
};

//Search On Country
function searchCountry() {
    searchInput.addEventListener("keyup", () => {
        let filter =  searchInput.value.toLowerCase()
        allCountry.forEach(country => {
            country.style.display = "none";
            if (country.dataset.country.toLowerCase().includes(filter)) {
                country.style.display = "block";
            } else if (searchInput.value === "") {
                country.style.display = "block";
            }
        });
    });
};

function countryDetails(obj) {
    allCountry.forEach(country => {
        country.addEventListener("click", () => {
            countrySlide.style.display = "none";
            layoutFilterInfo.style.display = "none";
            countryMoreDetails.style.display = "block";
            let countryIndex = country.dataset.index;
            
            bigFlagImage.src = `${obj[countryIndex].flag}`;
            countryDetailsName.innerHTML = `${obj[countryIndex].name}`;
            countryDetailsNative.innerHTML = `Native Name: <span>${obj[countryIndex].nativeName}</span>`;
            countryDetailsPopulation.innerHTML = `Population: <span>${obj[countryIndex].population}</span>`;
            countryDetailsRegion.innerHTML = `Region: <span>${obj[countryIndex].region}</span>`;
            countryDetailsSubRegion.innerHTML = `Sub Region: <span>${obj[countryIndex].subregion}</span>`;
            countryDetailsCapital.innerHTML = `Capital: <span>${obj[countryIndex].capital}</span>`;
            countryDetailsDomain.innerHTML = `Top Level Domain: <span>${obj[countryIndex].topLevelDomain}</span>`;
            countryDetailsCurrencies.innerHTML = `Currencies: <span>${obj[countryIndex].currencies[0].name}</span>`;
            countryDetailsLanguages.innerHTML = `Languages: <span>${obj[countryIndex].languages[0].name}</span>`;
            
            BorderCountries.innerHTML = "Border Countries: ";
            for (let i = 0; i < obj[countryIndex].borders.length; i++) {
                let borderSpan = document.createElement("span");
                borderSpan.innerHTML += `${obj[countryIndex].borders[i]}`;
                BorderCountries.appendChild(borderSpan);
            }
            if (obj[countryIndex].borders.length === 0) {
                BorderCountries.innerHTML = "";
            }
        });
    });
};

function backButton() {
    document.querySelector(".back").addEventListener("click", () => {
        countrySlide.style.display = "flex";
        layoutFilterInfo.style.display = "flex";
        countryMoreDetails.style.display = "none";
    });
};