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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CountriesAPI = __webpack_require__(1);
const CountriesView = __webpack_require__(2);




const app = function(){
  console.log('app');
  var countriesAPI = new CountriesAPI('http://restcountries.eu/rest/v2');
  var countriesView = new CountriesView();
  countriesAPI.makeRequest();
  countriesAPI.saveData();
  countriesView.populateSelect(countriesAPI.data);
};

window.addEventListener('load', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
  console.log(countries);
}

module.exports = CountriesAPI;


/***/ }),
/* 2 */
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

module.exports = CountriesView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map