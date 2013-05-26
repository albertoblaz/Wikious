
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


Model.prototype.addObserver = function(o) {
    var contained = this.observers.some(function(obs) {
        return obs == o;
    });

    if (! contained) {
        this.observers.push(o);
    }
};


Model.prototype.addObservers = function(obs) {
    var that = this;
    obs.forEach(function(o) {
        that.addObserver(o);
    });
};
