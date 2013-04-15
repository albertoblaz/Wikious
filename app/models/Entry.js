
var Entry = function() {
    this.title     = "";
    this.content   = "";
    this.tags      = "";
    this.comments  = [];
    this.likes     = 0;

    this.observers = [];
};


Entry.prototype.comment = function(user, text) {
    var c = new Comment(user, text);
    this.comments.push(c);
};


Entry.prototype.like = function() {
    this.likes++;
};


Entry.prototype.update = function(data) {
    console.log("Updating Entry");

    this.title   = data.title;
    this.content = data.content;
    this.tags    = data.tags;

    this.notifyObservers();
};


Entry.prototype.notifyObservers = function() {
    var len = this.observers.length;
    for (var i = 0; i < len; i++) {
        this.observers[i].notify();
        console.log("notifico");
    }
};


Entry.prototype.addObservers = function(obs) {
    var len = obs.length;
    for (var i = 0; i < len; i++) {
        this.observers.push(obs[i]);
    }
};


/*
Entry.prototype.destroy = function() {
    delete this;  // Mirar si esto es correcto o no, aunque fijandolo a null se borra la ref
};
*/
