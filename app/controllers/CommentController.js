
var CommentController = function(model, view) {
    this.html  = null;

    this.model = new Comment();
    this.view  = new CommentView(this.model);

    var observers = [this, view];
    this.model.addObservers(observers);
};


CommentController.prototype.update = function() {
    var data = {
        text : this.html.find('.text').val()
    };

    this.model.update(data);
};


CommentController.prototype.remove = function() {
    Lungo.Router.back();

    this.model = null;
    this.view.remove();
    this.html.remove();
};
