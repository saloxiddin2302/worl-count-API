let home = document.querySelector('.home')
let pagination = document.querySelector('.pagination')
let searchPost = document.querySelector("input");
let filterSelect = document.querySelector(".filter-select");
let darkLight = document.querySelector('nav .container p')


let search = "";
let page = 1;
let type = "";

function getCard({name, flags, population, region, capital}) {
    return `
    <div class="home__card">
        <div class="home__card__img">
            <img src="${flags.png}" alt="">
        </div>
        <div class="home__card__info">
            <h2>${name.common}</h2>
            <p>Population: ${population}</p>
            <p>Region: ${region}</p>
            <p>Capital: ${capital}</p>
        </div>
    </div>
    `
}

function getCountry() {
    async function getApi() {
        try {
            
            let country = await customFetch(`https://ap-countries-api.vercel.app/all?page=${page}&limit=25`);
            let countrySize = await customFetch('https://ap-countries-api.vercel.app/all')

            home.innerHTML = ''
            country.forEach((el) => {
                home.innerHTML += getCard(el);
            });
    
            pagination.innerHTML = `<button onclick="getPage('-') ${page == 1 ? "disabled" : " "}"><</button>`
    
            let pages = Math.ceil(countrySize.length / 11) / 2;
    
            for (let i = 1; i <= pages; i++) {
                pagination.innerHTML += `<button onclick="getPage(${i})" class="${page == i ? 'active' : ''}">${i}</button>`
            }
    
            pagination.innerHTML += `<button onclick="getPage('+')" ${pages == page ? 'disabled': ''}>></button>`
    
        } catch (err) {
            console.log(err);
        } finally {
            loading = false
        }
    }
    getApi();
}

getCountry();


function searchCountry() {
    async function getApi() {
        try {
            let searchCountry = await customFetch(`https://ap-countries-api.vercel.app/name/${search}?page=${page}&limit=8`)
            let countrySize = await customFetch(`https://ap-countries-api.vercel.app/name/${search}`)

            home.innerHTML = ''
            searchCountry.forEach((el) => {
                home.innerHTML += getCard(el);
            });
            
            pagination.innerHTML = ''
            let pages = Math.ceil(countrySize.length / 8) / 2;

            if (pages > 1) {
                pagination.innerHTML = `<button onclick="getSearchedPage('-') ${page == 1 ? "disabled" : " "}"><</button>`
    
    
            for (let i = 1; i <= pages; i++) {
                pagination.innerHTML += `<button onclick="getSearchedPage(${i})" class="${page == i ? 'active' : ''}">${i}</button>`
            }
    
            pagination.innerHTML += `<button onclick="getSearchedPage('+')" ${pages == page ? 'disabled': ''}>></button>`
            }
    
        } catch (err) {
            console.log(err);
        }
    }
    getApi();
}

function filterCountry() {
    async function getApi() {
        try {
            
            let country = await customFetch(`https://ap-countries-api.vercel.app/region/${type}?page=${page}&limit=8`);
            let countrySize = await customFetch(`https://ap-countries-api.vercel.app/region/${type}`)

            home.innerHTML = ''
            country.forEach((el) => {
                home.innerHTML += getCard(el);
            });
    
            pagination.innerHTML = `<button onclick="getPage('-') ${page == 1 ? "disabled" : " "}"><</button>`
    
            let pages = Math.ceil(countrySize.length / 8) / 2;
    
            for (let i = 1; i <= pages; i++) {
                pagination.innerHTML += `<button onclick="getPage(${i})" class="${page == i ? 'active' : ''}">${i}</button>`
            }
    
            pagination.innerHTML += `<button onclick="getPage('+')" ${pages == page ? 'disabled': ''}>></button>`
    
        } catch (err) {
            console.log(err);
        } finally {
            loading = false
        }
    }
    getApi();
}


function getPage(i) {
    if (i === "+") {
      page++;
    } else if (i === "-") {
      page--;
    } else {
      page = i;
    }
    if (filterSelect.value !== 'all') {
        filterCountry();
    }
    else {
        getCountry();
    }
} 
function getSearchedPage(i) {
    if (i === "+") {
      page++;
    } else if (i === "-") {
      page--;
    } else {
      page = i;
    }
    searchCountry();
} 

searchPost.addEventListener("keyup", function () {
    search = this.value;
    if (search == '') {
        getCountry();
    }else {
        filterSelect.value = 'all'
        searchCountry();
    }
    page = 1;
});


filterSelect.addEventListener("change", function () {
    type = this.value;
    page = 1
    if (type == 'all') {
        getCountry();
    }else {
        filterCountry();
    }
});


darkLight.addEventListener('click', function () {
    document.body.classList.toggle('dark-light')
    this.classList.toggle('dark');
    if (this.className == 'dark') {
        this.innerHTML = `
        <i class="fa-solid fa-moon"></i>
        Light Mode
        `;
    }else {
        this.innerHTML = `
        <i class="fa-solid fa-circle-half-stroke"></i>
        Dark Mode`
    }
})