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
