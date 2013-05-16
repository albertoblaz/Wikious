
var Entry = function() {
    this.title     = "";
    this.content   = "";
    this.tags      = "";
    this.comments  = [];
    this.likes     = 0;

    this._model = new Model();
};


Entry.prototype.comment = function(DOMList, data) {
    var c    = new Comment();
    var view = new CommentView(c);
    //var cont = new CommentController(c, view);
    view.appendInto(DOMList);
    c.update(data);
    console.log(data);
    this.comments.push(c);

    console.log("commenting");
};


Entry.prototype.like = function() {
    this.likes++;
};


Entry.prototype.update = function(data) {
    this._model.update(this, data);
};


Entry.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Entry.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
