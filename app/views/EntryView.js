
var EntryView = function(model) {
    this.model = model;
    this.el = null;

    this.render();
};


EntryView.prototype.setLink = function(id) {
    this.el.find('a').attr('href', '#'+id);
};



EntryView.prototype.appendInto = function(DOMList) {
    DOMList.append( this.el );
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
                            '<small class="content"></small>',
                        '</a>',
                    '</li>'
                    ].join(' ');

    return $(template);
};


EntryView.prototype.remove = function() {
    this.el.remove();
};
