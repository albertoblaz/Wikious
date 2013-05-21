
var Comment = function() {
    this.text = "";
    this.user = window.user;
    this.date = new Date().toTimeString().slice(0,5);

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
