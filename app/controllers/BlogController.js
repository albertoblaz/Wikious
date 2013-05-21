
var BlogController = function(model, view) {
    this.el = $('#posts');

    this.model = model;
    this.view  = view;

    this.render();

    this.model.addObservers( [this, this.view] );
};


BlogController.prototype.notify = function() {
    this.render();
};


BlogController.prototype.render = function() {
    this.el.find('.name').children('.title.centered').text( this.model.name );

    var that = this;
    this.el.find('.add-entry').on('click', function() {
        that.createEntry();
        var pid = 'post' + (EntryController.prototype.num-1);
        console.log(pid);
        Lungo.Router.section(pid);
    });
};


BlogController.prototype.update = function() {
    //
};


BlogController.prototype.createEntry = function() {
    var DOMList = this.el.find('.entries');
    this.model.createEntry(DOMList);
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

