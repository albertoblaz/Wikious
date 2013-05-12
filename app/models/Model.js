
var Model = function() {
    this.observers = [];
};


/*
 * Replace old attribute values with new ones
 */
Model.prototype.update = function(model, data) {
    for (var d in data) {
        if (data.hasOwnProperty(d)) {
            model[d] = data[d];
        }
    }

    this.notifyObservers();
};


Model.prototype.notifyObservers = function() {
    this.observers.forEach(function(obs) {
        obs.notify();
    });
};


Model.prototype.addObservers = function(obs) {
    var that = this;
    obs.forEach(function(o) {
        that.observers.push(o);
    });
};
