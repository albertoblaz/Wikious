
var AuthManager = function() {
    this.users = [];
};


AuthManager.prototype.login = function(user) {
    var validUsers = this.users.filter(function(u) {
        return u.nick === user.nick && u.pass === user.pass;
    });

    return validUsers[0];
};


AuthManager.prototype.signup = function(user) {
    var success;
    var sameUsers = this.users.filter(function(u) {
        return u.nick === user.nick;
    });

    if (sameUsers.length === 0) {
        this.users.push(user);
        success = true;
    } else {
        success = false;
    }

    return success;
};
