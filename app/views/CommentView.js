
var CommentView = function(model) {
    this.model = model;
    this.el = null;

    this.render();
    this.model.addObservers([this]);
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
            '<span class="icon user"></span>',
            '<span class="right date"></span>',
            '<strong class="text"></strong>',
            '<small class="usernick"></small>',
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
    this.el.find('.usernick').text(this.model.user.nick);
    this.el.find('.date').text(this.model.date);
};


CommentView.prototype.remove = function() {
    this.el.remove();
};
