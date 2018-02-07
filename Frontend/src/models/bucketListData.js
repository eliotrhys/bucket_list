const Request = require('../services/request.js');

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