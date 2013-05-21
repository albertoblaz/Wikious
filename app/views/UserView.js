
var UserView = function(model) {
    this.model = model;
    this.el    = $('#user');
};


/**
 * Method invoked by the model to notify an update
 */
UserView.prototype.notify = function() {
    this.render();
};


/**
 * Renders the view when is created or after the model has been changed
 */
UserView.prototype.render = function() {
    var that = this;
    [ 'nick', 'name', 'email', 'age', 'location' ].forEach(function(elem) {
        var data = that.model[elem];
        that.el.find('#' + elem).text( data );
    });
    console.log(this.model);
};
