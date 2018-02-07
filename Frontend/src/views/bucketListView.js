const BucketListView = function (container) {
    this.container = container;
}

BucketListView.prototype.render = function (data) {
    this.container.innerHTML = '';
    console.log(data , this.container);
    data.forEach(function (datum) {
        var bucketListli = document.createElement('li')
        bucketListli.innerText = datum.name;
        this.container.appendChild(bucketListli);
    }.bind(this))
}

module.exports = BucketListView;