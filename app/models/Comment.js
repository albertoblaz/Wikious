
var Comment = function() {
    this.text = "";
    this.user = "Alberto";
    this.date = new Date();

    this._model = new Model();
};


Comment.prototype.update = function(data) {
    this._model.update(this, data);
};


Comment.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Comment.prototype.addObservers = function(o) {
    this._model.addObserver(o);
};


Comment.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
