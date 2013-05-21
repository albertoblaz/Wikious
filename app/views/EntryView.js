
var EntryView = function(model) {
    this.model = model;
    this.el = null;

    this.render();
    this.setupEvents();
};

EntryView.prototype.setupEvents = function() {
    // ...
};


EntryView.prototype.setLinks = function(ids) {
    this.el.find('.entry-link')[0].href = '#' + ids['post'];
    this.el.find('.button')[0].href = '#' + ids['comments'];
};


EntryView.prototype.appendInto = function(DOMList) {
    DOMList.append( this.el );
};


/**
 * Creates the DOM element
 */
EntryView.prototype.createDOM = function() {
    var template = [
        '<li class="arrow selectable" style="height: 130px;">',
            '<a href="#post" class="entry-link" data-router="section">',
                '<strong class="title"></strong>',
                '<small style="margin-top: 5px; margin-right: 10px; white-space: inherit;" class="content"></small>',
            '</a>',
            '<a href="#comments" data-router="section" style="width : 40%; margin-top: 10px;" class="button small left  comment">Comment</a>',
            '<a href="#rate"     data-router="section" style="width : 40%; margin-top: 10px; margin-right: 20px;" class="button small right rate">Rate</a>',
            '<div class="clear"></div>',
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
    this.el.find('.content').text(this.model.content.slice(0, 140) + "...");
};


EntryView.prototype.remove = function() {
    this.el.remove();
};
