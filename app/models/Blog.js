
var Blog = function(user, name) {
    this.user    = user;
    this.name    = name;
    this.entries = [];

    this.observers = [];
};


Blog.prototype.createEntry = function(DOMList) {
    var entry = new Entry();
    var view  = new EntryView(entry);
    var cont  = new EntryController(entry, view);

    view.appendInto(DOMList);

    this.entries.push(entry);
};


Blog.prototype.notifyObservers = function() {
    var len = this.observers.length;
    for (var i = 0; i < len; i++) {
        this.observers[i].notify();
    }
};


Blog.prototype.addObservers = function(obs) {
    var len = obs.length;
    for (var i = 0; i < len; i++) {
        this.observers.push(obs[i]);
    }
};
