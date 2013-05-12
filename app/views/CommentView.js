
var CommentView = function(model) {
    this.model = model;
    this.el = null;

    this.render();
};


CommentView.prototype.appendInto = function(DOMList) {
    DOMList.append( this.el );
};


/**
 * Creates the DOM element
 */
CommentView.prototype.createDOM = function() {
    var template = [
                    '<li>',
                        '<strong class="text"></strong>',
                        '<small class="user"></small>',
                    '</li>'
                    ].join(' ');

    return $(template);
};


/**
 * Method invoked by the model to notify an update
 */
CommentView.prototype.notify = function() {
    this.render();
};


/**
 * Renders the view when is created or after the model has been changed
 */
CommentView.prototype.render = function() {
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.text').text(this.model.text);
};


CommentView.prototype.remove = function() {
    this.el.remove();
};
