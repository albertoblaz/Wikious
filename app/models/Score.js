
var Score = function() {
    this.num    = 0;
    this.points = 0;
};


Score.prototype.rate = function(value) {
    this.num++;
    this.points += value;
};


Score.prototype.average = function() {
    var avg = (this.num) ? this.points / this.num : 0;
    return avg;
};
