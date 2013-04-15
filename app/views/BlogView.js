
var BlogView = function(model) {
    this.model = model;
    this.el = null;

    // this.render();
};


BlogView.prototype.notify = function() {
    // this.render();
};

/*

BlogView.prototype.render = function() {

    //this.el = this.el || this.createDOM();
    if (! this.el) {
        this.el = this.createDOM();
    }

    this.el.find('.title').text(this.model.title);
    this.el.find('.content').text(this.model.content);

};


BlogView.prototype.createDOM = function() {
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

*/
