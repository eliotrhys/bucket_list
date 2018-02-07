/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const CountriesView = function(){

}

CountriesView.prototype.populateSelect = function(countries){

  var select = document.querySelector("#countries-list");

  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  });

}

CountriesView.prototype.populateList = function(country){
  var ul = document.querySelector('#selected-country');
  ul.innerText = '';
  var countryName = document.createElement('li');
  countryName.innerText = country.name;
  ul.appendChild(countryName);
}

module.exports = CountriesView;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const CountriesAPI = __webpack_require__(2);
const CountriesView = __webpack_require__(0);
const BucketListData = __webpack_require__(3);
const BucketListView = __webpack_require__(4);





const app = function(){
  // console.log('app');
    var countryToAdd = null;
  var countriesAPI = new CountriesAPI('http://restcountries.eu/rest/v2');
  var countriesView = new CountriesView();
  countriesAPI.makeRequest();
  countriesAPI.saveData();
  var countriesData = countriesAPI.data;
  countriesView.populateSelect(countriesData);

  var select = document.querySelector('#countries-list');
  select.addEventListener('change', function(){
    var selected = this;
      countryToAdd = countriesAPI.retrieveCountry(this.value, countriesData);
      console.log(countryToAdd);
    countriesAPI.handleSelected(selected);

  });

  const bucketListData = new BucketListData('http://localhost:5000/api/bucketlist');
  var container = document.querySelector('#bucket-list');
  console.log(container);
  const bucketListView = new BucketListView(container);
  bucketListData.onload = bucketListView.render.bind(bucketListView);
  bucketListData.getData();



  const createButton = document.querySelector('#submit-button');
  createButton.addEventListener('click', function (e) {
      bucketListData.createButtonClicked(e, countryToAdd)
  })

};

window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const CountriesView = __webpack_require__(0);

const CountriesAPI = function(url) {
  this.url = url;
  this.data = [];
}

CountriesAPI.prototype.requestComplete = function(){
  if(this.status !== 200){
    return;
  }
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var jsonString = JSON.stringify(countries);
  localStorage.setItem('countries', jsonString);
}

CountriesAPI.prototype.makeRequest = function() {
  var request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', this.requestComplete);
  request.send();
}

CountriesAPI.prototype.saveData = function(){
  var jsonString = localStorage.getItem('countries');
  var countries = JSON.parse(jsonString);
  this.data = countries;
  // console.log(countries);
}

CountriesAPI.prototype.handleSelected = function(selected){
  this.findCountry(selected.value, this.data);
}

CountriesAPI.prototype.findCountry = function(country_name, countries){
  var countriesView = new CountriesView();
  countries.forEach(function(country){
    if (country.name === country_name){
      countriesView.populateList(country);
    }
  })
};

CountriesAPI.prototype.retrieveCountry = function(country_name, countries){
    for(country of countries){
        if (country.name === country_name){
            return country;
        }
    }
};





module.exports = CountriesAPI;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(5);

const BucketListData = function (url) {
    this.url = url;
    this.onload = null;
    this.oncreate = null;
}

BucketListData.prototype.getData = function () {
    const request = new Request(this.url);
    request.get(this.onload);
}

BucketListData.prototype.createButtonClicked = function (event, countryToAdd) {
    event.preventDefault();
    const countryName = countryToAdd.name;
    const body = {
        name: countryName,

    }
    const createRequestComplete = function () {
        this.getData();
    }.bind(this);
    var request = new Request(this.url);
    request.post(createRequestComplete, body);
}

module.exports = BucketListData;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

const BucketListView = function (container) {
    this.container = container;
}

BucketListView.prototype.render = function (data) {
    this.container.innerHTML = '';
    console.log(data , this.container);
    data.forEach(function (datum) {
        var bucketListli = document.createElement('li')
        bucketListli.innerText = datum.name;
        this.container.appendChild(bucketListli);
    }.bind(this))
}

module.exports = BucketListView;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Request = function (url) {
    this.url = url;
}

Request.prototype.get = function (callback) {
    const request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.addEventListener('load', function () {
        if(this.status != 200){
            return;
        }
        const responseBody = JSON.parse(this.responseText);
        callback(responseBody);
    });
    request.send();
}

Request.prototype.post = function (callback, body) {
    const request = new XMLHttpRequest();
    request.open('POST', this.url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
        if(this.status != 201){
            return;
        }
        const responseBody = JSON.parse(this.responseText);
        callback(responseBody);
    });
    request.send(JSON.stringify(body));
}

Request.prototype.delete = function (callback) {
    const request = new XMLHttpRequest();
    request.open('DELETE', this.url);
    request.addEventListener('load', function () {
        if(this.status != 204){
            return;
        }
        callback();
    });
    request.send();
}


module.exports = Request;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map