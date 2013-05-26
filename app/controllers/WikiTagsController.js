
var BlogTagsController = function(model, view) {
    this.el = $('#tags');

    this.model = model;
    this.view  = view;

    this.initWindow();
    this.model.addObservers( [this, this.view] );
};


BlogTagsController.prototype.initWindow = function() {
    var domTags = this.el.find('.tags');
    this.model.DOM.tags = domTags;
    this.model.tagsManager.DOM.tags = domTags;

    this.render();
};


BlogTagsController.prototype.notify = function() {
    this.render();
};


BlogTagsController.prototype.render = function() {
    //
};
