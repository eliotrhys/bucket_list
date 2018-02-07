const CountriesAPI = function(url) {
  this.url = url,
  this.data = []
}

CountriesAPI.prototype.requestComplete = function(){
  if(this.status !== 200){
    return;
  }
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  console.log(countries);
}

CountriesAPI.prototype.makeRequest = function() {
  var request = new XMLHttpRequest();
  request.open('GET', this.url);
  console.log(request);
  request.addEventListener('load', this.requestComplete);
  request.send();
}

module.exports = CountriesAPI;
