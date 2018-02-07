const CountriesAPI = require('./models/countriesAPI.js');
const CountriesView = require('./views/countriesView.js');




const app = function(){
  console.log('app');
  var countriesAPI = new CountriesAPI('http://restcountries.eu/rest/v2');
  var countriesView = new CountriesView();
  countriesAPI.makeRequest();
  countriesAPI.saveData();
  countriesView.populateSelect(countriesAPI.data);
};

window.addEventListener('load', app);
