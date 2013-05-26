
var Blog = function(name) {
    this.name    = name;
    this.entries = [];
    this.dict    = {};
    this.tagsManager = new TagsManager();

    this.DOM = {
        articles : null,
        tags : null
    };

    this._model = new Model();
};


Blog.prototype.createEntry = function(data) {
    var entry = new Entry();
    entry.tagsManager = this.tagsManager;

    var view  = new EntryView(entry);
    var cont  = new EntryController(entry, view);
    var cont2 = new EntryRateController(entry, view);

    view.appendInto(this.DOM.articles);
    this.entries.push(entry);
    this.notifyObservers();

    if (data) {
        entry.update(data);
    }

    return entry;
};


Blog.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Blog.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
