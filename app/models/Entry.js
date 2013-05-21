
var Entry = function() {
    this.title     = "";
    this.content   = "";
    this.tags      = "";
    this.comments  = [];
    this.votes     = {
        num   : 0,
        score : 0
    };

    this._model = new Model();
};


Entry.prototype.comment = function(DOMList, data) {
    var c    = new Comment();
    var view = new CommentView(c);
    //var cont = new CommentController(c, view);
    view.appendInto(DOMList);

    c.update(data);

    this.comments.push(c);
};


Entry.prototype.rate = function(points) {
    this.votes.num++;
    this.votes.score += points;
};


Entry.prototype.update = function(data) {
    var tag;
    var aux = [];
/*
    if (data && data.tags) {
        data.tags.forEach(function(t) {
            tag = new Tag(t);
            aux.push(tag);
        });

        data.tags = aux;
    }
*/
    this._model.update(this, data);
};


Entry.prototype.notifyObservers = function() {
    this._model.notifyObservers();
};


Entry.prototype.addObservers = function(obs) {
    this._model.addObservers(obs);
};
