
var EntryView = function(model) {
    this.model = model;
    this.el = null;

    this.render();
    this.setupEvents();
};

EntryView.prototype.setupEvents = function() {
    this.el.find('.button').on('click', function() {
        that.model.comment();
    });
};


EntryView.prototype.setLink = function(id) {
    this.el.find('.entry-link')[0].href = '#' + id;
};


EntryView.prototype.appendInto = function(DOMList) {
    DOMList.append( this.el );
};


/**
 * Creates the DOM element
 */
EntryView.prototype.createDOM = function() {
    var template = [
                    '<li class="arrow selectable">',
                        '<a href="#comments" data-router="section" style="margin-right: 20px;" class="button small right">Comment</a>',
                        '<a href="#post" class="entry-link" data-router="section">',
                            '<strong class="title"></strong>',
                            '<small class="content"></small>',
                        '</a>',
                    '</li>'
                    ].join(' ');

    return $(template);
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
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.title').text(this.model.title);
    this.el.find('.content').text(this.model.content);
};


EntryView.prototype.remove = function() {
    this.el.remove();
};
