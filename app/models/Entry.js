
/*
var Entry = function(title, content, tags, observers) {
    this.title = title;
    this.content = content;
    this.tags = tags;   // TODO esto lo vamos a hacer asi al final ??
*/
var Entry = function() {
    this.title     = null;
    this.content   = null;
    this.tags      = null;
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


Entry.prototype.update = function(title, content, tags) {
    this.title   = title;
    this.content = content;
    this.tags    = tags;

 /*   for (var o in this.observers) {
        o.notify();
    }*/
};


Entry.prototype.addObservers = function(obs) {
    this.observers.push(obs);
};


/*
Entry.prototype.destroy = function() {
    delete this;  // Mirar si esto es correcto o no, aunque fijandolo a null se borra la ref
};
*/
