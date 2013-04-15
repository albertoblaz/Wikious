
var EntryController = function(model, view) {
    this.html = $('#post');

    this.model = model;
    this.view  = view;

    this.model.addObservers( [this, this.view] );

    this.render();
    this.setupEvents();
};


EntryController.prototype.notify = function() {
    this.render();
};


EntryController.prototype.render = function() {
    this.html.find('#title').val( this.model.title );
    this.html.find('#content').val( this.model.content );
    this.html.find('#tags').val( this.model.tags );
};


EntryController.prototype.setupEvents = function() {
    var that = this;    // JavaScript workaround...

    this.html.find('#done').on('click', function() {
        that.update();
    });

    this.html.find('#remove').on('click', function() {
        that.remove();
    });
};


EntryController.prototype.update = function() {
    var data = {
        title   : this.html.find('#title').val(),
        content : this.html.find('#content').val(),
        tags    : this.html.find('#tags').val()
    };

    this.model.update(data);
};


EntryController.prototype.remove = function() {
    /*
    this.model.destroy();
    this.view.destroy();
    */
    this.model = null;
    this.view.remove();
};
