
var CommentView = function(model, el) {
    this.model = model;
    this.el    = el || undefined;

    this.render();  // Render the HTML
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

    //this.el = this.el || this.createDOM();
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.text').text(this.model.text);

};


/**
 * Creates the DOM element
 */
CommentView.prototype.createDOM = function() {
    var template = [
                    '<li class="arrow selectable">',
                        '<a href="#post" data-router="section">',
                            '<strong class="text"></strong>',
                        '</a>',
                    '</li>'
                    ].join(' ');

    return $(template);
};
