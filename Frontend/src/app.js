const CountriesAPI = require('./models/countriesAPI.js');
const CountriesView = require('./views/countriesView.js');
const BucketListData = require('./models/bucketListData');
const BucketListView = require('./views/bucketListView');





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
