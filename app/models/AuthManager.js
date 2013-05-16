
var AuthManager = function() {
    this.users = [];

    this.initUsers();
};


AuthManager.prototype.initUsers = function() {
    var luis = new User({
        name : "Luis",
        pass : "luis",
        auth : this
    });

    var jose = new User({
        name : "Jose",
        pass : "jose",
        auth : this
    });

    this.users.push(luis, jose);
};


AuthManager.prototype.login = function(user) {
    var that = this;

    var validUsers = this.users.filter(function(u) {
        var cond1 = u.name === user.name;
        var cond2 = that.encryptPassword(u.pass) === that.encryptPassword(user.pass);
        return cond1 && cond2;
    });

    return validUsers.length;
};


AuthManager.prototype.signup = function(user) {
    var success;
    var sameUsers = this.users.filter(function(u) {
        return u.name === user.name;
    });

    if (sameUsers.length === 0) {
        this.users.push(user);
        success = true;
    } else {
        success = false;
    }

    return success;
};


AuthManager.prototype.encryptPassword = function(pass) {
    return pass + '123';
};
