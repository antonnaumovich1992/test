let dateElement = document.getElementById('date');
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short', day: 'numeric' });

let citys = '"Nashville, TN", 36.17, -86.78;"New York, NY", 40.71, -74.00;"Atlanta, GA", 33.75, -84.39;"Denver, CO", 39.74, -104.98;"Seattle, WA", 47.61, -122.33;"Los Angeles, CA", 34.05, -118.24;"Memphis, TN", 35.15, -90.05'


class CityMap {
    constructor(cityString) {
        this.cityString = cityString
        this.cityArr = []
        this.citySubArr = []
        this.citySubArr2 = []
        this.cityObj = []
        this.states = ''
        this.stringToObject()
    }


    stringToObject() {
        this.cityArr = this.cityString.split(';')
        this.cityArr.forEach(el => {
            this.citySubArr.push(el.replace(/[" ]/g, ''))
        })
        this.citySubArr.forEach(el => {
            this.citySubArr2.push(el.split(','))
        })
        this.citySubArr2.forEach(el => this.cityObj.push(new Obj(...el)))

        let data = localStorage.getItem('citys');
        let LIST = JSON.parse(data);
        if (data && data.length > 7) {
            this.loadList(LIST)
            this.cityObj = LIST;
        } else {
            this.loadList(this.cityObj);
        };
    }

    loadList(array) {
        array.forEach(el => {
            this.addToList(el.city, el.state.trim(), el.latitude, el.longtitude)
        });

    }
    sortByLat() {
        this.cityObj.sort((prev, next) => prev.latitude - next.latitude)
    }
    sortByLong() {
        this.cityObj.sort((prev, next) => prev.longtitude - next.longtitude)
    }


    northernmost() {
        alert(`Самый северный город - ${this.cityObj[this.cityObj.length - 1].city}`)
    }
    southernmost() {
        alert(`Самый южный город - ${this.cityObj[0].city}`)
    }

    westernmost() {
        alert(`Самый западный город - ${this.cityObj[0].city}`)
    }
    easternmost() {
        alert(`Самый восточный город - ${this.cityObj[this.cityObj.length - 1].city}`)
    }


    addToList(city, state, latitude, longtitude) {
        let text = `<li>City: <span class='uppercase'>${city};</span> State: <span class='uppercase'>${state};</span> Latitude: ${latitude}; Longtitude: ${longtitude};</li>`
        list.insertAdjacentHTML('beforeend', text)
    }

    showStates() {
        this.cityObj.forEach(el => {
            this.states = this.states + ' ' + el.state.trim()
        })
        this.result = this.states.split(' ')
            .filter((word, i, arr) => {
                return i === arr.lastIndexOf(word);
            })
            .join(" ").trim().toUpperCase()


        alert(this.result)
    }
    addCity() {
        let cityName = prompt('Введите название города').toUpperCase();
        let cityState = prompt('Введите название штата').toUpperCase();
        let cityLatit = prompt('Введите широту города');
        let cityLongtit = prompt('Введите долготу города');
        this.addToList(cityName, cityState, cityLatit, cityLongtit)
        this.cityObj.push(new Obj(cityName, cityState, cityLatit, cityLongtit))
        localStorage.setItem('citys', JSON.stringify(this.cityObj));
    }
    searchByState() {
        this.cityObj.forEach(el => {
            this.states = this.states + ' ' + el.state.trim()
        })
        this.result = this.states.split(' ')
            .filter((word, i, arr) => {
                return i === arr.lastIndexOf(word);
            })
            .join(" ").trim().toUpperCase()
        let searchRequest = prompt(`Введите штат для поиска. Список штатов: ${this.result}`)
        let searchResult = []
        this.cityObj.forEach(el => {
            if (el.state == searchRequest.toUpperCase())
                searchResult.push(el.city.toUpperCase())
        })
        if (searchResult != 0) {
            alert(searchResult)
        } else {
            alert('Нет городов из этого штата')
        }

    }

}


let refresh = document.getElementById('refresh');
const north = document.querySelector('.north');
const south = document.querySelector('.south');
const west = document.querySelector('.west');
const east = document.querySelector('.east');
const showStates = document.querySelector('.show-states')
const addCity = document.querySelector('.add-city')
const searchByState = document.querySelector('.search-by-state')
const searchClosest = document.querySelector('.search-closest')
let list = document.querySelector('.ul')


let cityMap = new CityMap(citys);


function Obj(city, state, latitude, longtitude) {
    this.city = city
    this.state = state
    this.latitude = latitude
    this.longtitude = longtitude
}

north.addEventListener('click', () => {
    cityMap.sortByLat()
    cityMap.northernmost()
})
south.addEventListener('click', () => {
    cityMap.sortByLat()
    cityMap.southernmost()
})
west.addEventListener('click', () => {
    cityMap.sortByLong()
    cityMap.westernmost()
})
east.addEventListener('click', () => {
    cityMap.sortByLong()
    cityMap.easternmost()
})

showStates.addEventListener('click', () => {
    cityMap.showStates()
})

addCity.addEventListener('click', () => {
    cityMap.addCity()
})
searchByState.addEventListener('click', () => {
    cityMap.searchByState()
})
refresh.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})
// searchClosest.addEventListener('click', () => {
//     cityMap.searchClosest()
// })

