const CountriesView = require('../views/countriesView');

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





module.exports = CountriesAPI;
