
var BlogController = function(model, view) {
    this.el = $('#posts');

    this.model = model;
    this.view  = view;

    this.initWindow();
    this.model.addObservers( [this, this.view] );
};


BlogController.prototype.initWindow = function() {
    this.model.DOM.articles = this.el.find('.entries');
    this.setupEvents();
    this.render();
};


BlogController.prototype.setupEvents = function() {
    var that = this;

    this.el.find('.add-entry').on('click', function() {
        that.createEntry();
        var pid = 'post' + (EntryController.prototype.num-1);
        Lungo.Router.section(pid);
    });
};


BlogController.prototype.notify = function() {
    this.render();
};


BlogController.prototype.render = function() {
    this.el.find('.name').children('.title.centered').text( this.model.name );
};


BlogController.prototype.update = function() {
    //
};


BlogController.prototype.createEntry = function() {
    this.model.createEntry();
};


BlogController.prototype.remove = function() {
    /*
    this.model.destroy();
    this.view.destroy();
    */
    this.model = null;
    this.view  = null;
    this = null;
};

