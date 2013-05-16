
var User = function(data) {
    this.name = "" || (data && data.name);
    this.pass = "" || (data && data.pass);

    this.email    = "" || (data && data.email);
    this.age      = "" || (data && data.age);
    this.location = "" || (data && data.location);

    this.auth = null;
    this._model = new Model();
};


User.prototype.login = function() {
    return this.auth.login(this);
};


User.prototype.signup = function() {
    return this.auth.signup(this);
};


User.prototype.update = function(data) {
    this._model.update(this, data);
};


User.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


User.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};


