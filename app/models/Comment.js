
var Comment = function(user, text) {
    this.user = user;
    this.text = text;

    this.date = new Date();
};


Comment.prototype.update = function(user, text, date) {
    this.user   = user;
    this.text = text;
    this.date    = date;

    for (var o in this.observers) {
        o.notify();
    }
};


Comment.prototype.addObservers = function(obs) {
    this.observers.push(obs);
};