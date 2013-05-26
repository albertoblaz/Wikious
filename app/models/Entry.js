
var Entry = function() {
    this.title     = "";
    this.content   = "";
    this.tags      = "";
    this.comments  = [];

    this.dateFormat("dateCreation");
    this.dateFormat("dateLastEdition");

    this.score = {
        num    : 0,
        points : 0
    };

    this._model = new Model();
};


Entry.prototype.dateFormat = function(field) {
    var d = new Date();
    this[field] = d.toTimeString().slice(0,5) + d.toDateString().slice(3);
};


Entry.prototype.comment = function(DOMList, data) {
    var c    = new Comment();
    var view = new CommentView(c);
    //var cont = new CommentController(c, view);
    view.appendInto(DOMList);

    c.update(data);

    this.comments.push(c);
};


Entry.prototype.rate = function(value) {
    this.score.num++;
    this.score.points += value;
    this.notifyObservers();
};


Entry.prototype.update = function(data) {
    this._model.update(this, data);
    this.dateFormat("dateLastEdition");
};


Entry.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Entry.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
