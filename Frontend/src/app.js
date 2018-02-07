const CountriesAPI = require('./models/countriesAPI.js');


const app = function(){
  console.log('app');
  var countriesAPI = new CountriesAPI('http://restcountries.eu/rest/v2');
  countriesAPI.makeRequest();

}

window.addEventListener('load', app);
