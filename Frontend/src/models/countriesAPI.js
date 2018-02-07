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
