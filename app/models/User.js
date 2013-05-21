
var User = function(data) {
    this.nick = "" || (data && data.nick);
    this.name = "" || (data && data.name);
    this.pass = "" || (data && data.pass);

    this.email    = "" || (data && data.email);
    this.age      = "" || (data && data.age);
    this.location = "" || (data && data.location);

    this.auth = (data && data.auth) || null;
    this._model = new Model();
};


User.prototype.login = function(data) {
    if (data) {
        this.update(data);
    }

    var res = {};
    if (! this.auth) {
        res.success = false;
        res.user    = null;
    }

    var loggedUser = this.auth.login(this);
    res.success = true;
    res.user = loggedUser;

    return res;
};


User.prototype.signup = function(data) {
    if (data) {
        this.update(data);
    }

    var success = this.auth && this.auth.signup(this);
    this.notifyObservers();
    return success;
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


