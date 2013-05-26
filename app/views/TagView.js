
var TagView = function(model) {
    this.el = null;

    this.model = model;
    this.model.addObservers([this]);

    this.render();
};


// Private API

TagView.prototype.createDOM = function() {
    var template = [
        '<li>',
            '<strong class="name"></strong>',
            '<small>Articles associated</small>',
            '<span class="right bubble articles">0</span>',
        '</li>'
    ].join(' ');

    return $(template);
};


// Public API

TagView.prototype.appendInto = function(dom) {
    if (this.el) {
        dom.append(this.el);
    }
};


TagView.prototype.notify = function() {
    if (! this.model.count()) {
        this.remove();

    } else {
        this.render();
    }
};


TagView.prototype.render = function() {
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.name').text( this.model.name );
    this.el.find('.articles').text( this.model.count() );
};


TagView.prototype.remove = function() {
    this.el.remove();
    this.model = null;
};
