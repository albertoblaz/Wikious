
var Blog = function(user, name) {
    this.user    = user;
    this.name    = name;
    this.entries = [];

    this._model = new Model();
};


Blog.prototype.createEntry = function(DOMList) {
    var entry = new Entry();
    var view  = new EntryView(entry);
    var cont  = new EntryController(entry, view);

    view.appendInto(DOMList);

    this.entries.push(entry);
};


Blog.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Blog.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
