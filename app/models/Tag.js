
var Tag = function(name) {
    this.name = name;
    this.articles = [];

    this._model = new Model();
};


Tag.prototype.add = function(article) {
    if (article) {
        this.articles.push(article);
        this.notifyObservers();
    }
};


Tag.prototype.remove = function(article) {
    var i = this.articles.indexOf(article);
    this.articles.splice(i, 1);
    this.notifyObservers();
};


Tag.prototype.count = function() {
    return this.articles.length;
};


Tag.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Tag.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
