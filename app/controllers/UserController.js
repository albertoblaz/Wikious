
var UserController = function(model) {
    this.htmlLogin = $('#login');
    this.htmlSign  = $('#sign');

    this.model = model;

    this.model.addObservers([this]);
    this.initWindow();
};


UserController.prototype.initWindow = function() {
    this.setupEvents();
    this.render();
};


UserController.prototype.loginHandler = function() {
    this.update();
    var success = this.model.login();

    if (success) {
        Lungo.Router.section('posts');

    } else {
        Lungo.Notification.error(
            "Error",                        // Title
            "Authorization required",       // Description
            "cancel",                       // Icon
            2                               // Time on screen
        );
    }
};


UserController.prototype.signupHandler = function() {
    var that = this;

    this.updateSignup();
    var success = this.model.signup();

    if (success) {
        Lungo.Notification.success(
            "Success",                      // Title
            "User signed up successfully!", // Description
            "check",                        // Icon
            2,                              // Time on screen
            function() {                    // Callback
                that.loginHandler();
            }
        );

    } else {
        Lungo.Notification.error(
            "Error",                        // Title
            "Signup process failed... :(",  // Description
            "cancel",                       // Icon
            2                               // Time on screen
        );
    }
};


UserController.prototype.setupEvents = function() {
    var that = this;

    this.htmlLogin.find('#login-btn').on('click', function(event) {
        event.preventDefault();
        that.loginHandler();
    });

    this.htmlSign.find('#create-btn').on('click', function(event) {
        event.preventDefault();
        that.signupHandler();
    });
};


UserController.prototype.notify = function() {
    // this.render();
};


UserController.prototype.render = function() {
    //
};


UserController.prototype.update = function() {
    var data = {
        name : this.htmlLogin.find('#name').val(),
        pass : this.htmlLogin.find('#pass').val()
    };

    if (this.checkInputData(data)) {
        this.model.update(data);
    }
};


UserController.prototype.updateSignup = function() {
    var data = {
        name     : this.htmlSign.find('#name').val(),
        pass     : this.htmlSign.find('#pass').val(),
        email    : this.htmlSign.find('#email').val(),
        age      : this.htmlSign.find('#age').val(),
        location : this.htmlSign.find('#location').val()
    };

    if (this.checkInputData(data)) {
        this.model.update(data);
    }
};


UserController.prototype.checkInputData = function(data) {
    var nIters = 0;
    var emptyFields = 0;

    for (var d in data) {
        if (data.hasOwnProperty(d) && data[d] === "") {
            emptyFields++;
        }

        nIters++;
    }

    var valid = (emptyFields !== nIters);
    return valid;
};


UserController.prototype.remove = function() {
    //
};
