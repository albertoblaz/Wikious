
var EntryView = function(model, el) {
    this.model = model;
    this.el    = el || undefined;

    this.render();  // Render the HTML
};


/**
 * Method invoked by the model to notify an update
 */
EntryView.prototype.notify = function() {
    this.render();
};


/**
 * Renders the view when is created or after the model has been changed
 */
EntryView.prototype.render = function() {

    //this.el = this.el || this.createDOM();
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.title').text(this.model.title);
    this.el.find('.content').text(this.model.content);

};


/**
 * Creates the DOM element
 */
EntryView.prototype.createDOM = function() {
    var template = [
                    '<li class="arrow selectable">',
                        '<a href="#post" data-router="section">',
                            '<strong class="title"></strong>',
                            '<small class="content">',
                        '</a>',
                    '</li>'
                    ].join(' ');

    return $(template);
};
