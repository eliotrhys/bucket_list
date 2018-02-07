const CountriesAPI = require('./models/countriesAPI.js');
const CountriesView = require('./views/countriesView.js');





const app = function(){
  // console.log('app');
  var countriesAPI = new CountriesAPI('http://restcountries.eu/rest/v2');
  var countriesView = new CountriesView();
  countriesAPI.makeRequest();
  countriesAPI.saveData();
  var countriesData = countriesAPI.data;
  countriesView.populateSelect(countriesData);

  var select = document.querySelector('#countries-list');
  select.addEventListener('change', function(){
    var selected = this;
    countriesAPI.handleSelected(selected).bind(countriesAPI);
  });



};

window.addEventListener('load', app);
