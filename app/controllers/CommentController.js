
var CommentController = function(model, view) {
    this.html  = $('#comment-form');

    this.model = model;
    this.view  = view;

    var observers = [this, view];
    this.model.addObservers(observers);
};

CommentController.prototype.setupEvents = function() {
    var that = this;

    this.html.find('#write-comment').on('click', function() {
        that.update();
    });
};


CommentController.prototype.update = function() {
    var textarea = this.html.find('.text');

    var data = {
        text : textarea.val()
    };

    this.model.update(data);
    textarea.val("");   // Remove comment typed into the text area
};


CommentController.prototype.remove = function() {
    Lungo.Router.back();

    this.model = null;
    this.view.remove();
    this.html.remove();
};
