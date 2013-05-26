
var Entry = function() {
    this.title     = "";
    this.content   = "";
    this.tags      = [];
    this.comments  = [];

    this.tagsManager = null;
    this.dateFormat("dateCreation");
    this.dateFormat("dateLastEdition");

    this.score = {
        num    : 0,
        points : 0
    };

    this.DOM = {
        comments : null
    };

    this._model = new Model();
};


Entry.prototype.dateFormat = function(field) {
    var d = new Date();
    this[field] = d.toTimeString().slice(0,5) + d.toDateString().slice(3);
};


Entry.prototype.comment = function(data) {
    var c    = new Comment();
    var view = new CommentView(c);
    //var cont = new CommentController(c, view);
    view.appendInto(this.DOM.comments);

    c.update(data);
    this.comments.push(c);
};


Entry.prototype.rate = function(value) {
    this.score.num++;
    this.score.points += value;
    this.notifyObservers();
};


Entry.prototype.remove = function() {
    this.tagsManager.untag(this, this.tags);
};


Entry.prototype.update = function(data) {
    var that = this;

    this.tagsManager.untag(this, this.tags);

    this._model.update(this, data);
    this.tagsManager.tag(this, data.tags);

    this.dateFormat("dateLastEdition");
};


Entry.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Entry.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
