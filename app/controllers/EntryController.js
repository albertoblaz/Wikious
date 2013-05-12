
var EntryController = function(model, view) {
    this.html  = null;
    this.model = model;
    this.view  = view;

    this.model.addObservers( [this, this.view] );
    this.initWindow();
};


/* Private API */

EntryController.prototype.initWindow = function() {
    var id = this.setDynamicID('post');

    this.html = this.createDOM(id);
    this.view.setLink(id);

    this.setupEvents();
    this.render();

    Lungo.Router.section(id);
};


EntryController.prototype.setDynamicID = function(prefix) {
    if (! EntryController.prototype.num) {
        EntryController.prototype.num = 0;
    }

    var id = prefix + EntryController.prototype.num++;
    return id;
};


EntryController.prototype.setupEvents = function() {
    var that = this;    // JavaScript workaround

    var removeHandler = function() { that.remove(); };
    var updateHandler = function() { that.update(); };

    this.html.find('#remove').on('click', removeHandler);

    [ '#back', '#done' ].forEach(function(btnName) {
        var btn = that.html.find(btnName);
        btn.on('click', updateHandler);
    });
};


EntryController.prototype.createDOM = function(id) {
    var template = [
        '<section id="' + id + '" data-transition="slide">',

            '<header data-title="New article" class="title">',
                '<span class="title centered">New Article</span>',

                '<nav>',
                    '<a href="#back" id="back" data-router="section" data-icon="left" data-label="Blog">',
                        '<span class="icon left"></span>',
                        '<abbr>FIWiki</abbr>',
                    '</a>',
                '</nav>',

                '<nav class="right">',
                    '<a href="#back" id="remove" data-router="section" data-icon="remove">',
                        '<span class="icon remove"></span>',
                    '</a>',
                '</nav>',
            '</header>',

            '<article class="active">',
                '<style>',
                    '.footer {',
                        'padding: 7px 10px;',
                        'height : 12%;',
                    '}',

                    '.button .icon {',
                        'margin-right: 5px;',
                        'position: relative;',
                        'top: 1px;',
                    '}',
                '</style>',

                '<form id="entry" class="form">',
                    '<fieldset>',
                        '<label>Title:</label>',
                        '<input id="title" type="text" value="">',
                    '</fieldset>',

                    '<fieldset style="height: 290px;">',
                        '<label>Content:</label>',
                        '<input id="content" type="text" value="">',
                    '</fieldset>',

                    '<fieldset>',
                        '<label>Categories:</label>',
                        '<input id="tags" type="text" value="">',
                    '</fieldset>',
                '</form>',

                '<footer class="footer">',
                    '<a href="#back" id="done"   data-router="section" data-icon="check"  class="button accept anchor">',
                        '<span class="icon check"></span>',
                        'Done',
                    '</a>',
                '</footer>',

            '</article>',

        '</section>'
    ].join(" ");

    var dom = $(template);
    $('body').append(dom);

    return dom;
};


EntryController.prototype.checkInputData = function(data) {
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


/* Public API */

EntryController.prototype.notify = function() {
    this.render();
};


EntryController.prototype.render = function() {
    this.html.find('#title').val( this.model.title );
    this.html.find('#content').val( this.model.content );
    this.html.find('#tags').val( this.model.tags );

    Lungo.View.Article.title( this.model.title );
};


EntryController.prototype.update = function() {
    var data = {
        title   : this.html.find('#title').val(),
        content : this.html.find('#content').val(),
        tags    : this.html.find('#tags').val()
    };

    if (this.checkInputData(data)) {
        this.model.update(data);
    } else {
        this.remove();
    }
};


EntryController.prototype.remove = function() {
    Lungo.Router.back();

    this.model = null;
    this.view.remove();
    this.html.remove();
};
