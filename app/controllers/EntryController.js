
var EntryController = function(model, view) {
    this.post     = null;
    this.comments = null;

    this.model = model;
    this.view  = view;

    this.model.addObservers( [this, this.view] );
    this.initWindow();
};


/* Private API */

EntryController.prototype.initWindow = function() {
    var links = this.createDynamicIDs(['post', 'comments']);
    var pid = links['post'];
    var cid = links['comments'];

    this.post = this.createDOMPost(pid);
    this.comments = this.createDOMComments(cid);

    this.view.setLinks(links);

    this.setupEvents();
    this.render();

    Lungo.Router.section(pid);
};


EntryController.prototype.createDynamicIDs = function(prefixes) {
    if (! EntryController.prototype.num) {
        EntryController.prototype.num = 0;
    }

    var links = {};
    prefixes.forEach(function(p) {
        var id = p + EntryController.prototype.num;
        links[p] = id;
    });

    EntryController.prototype.num++;
    return links;
};


EntryController.prototype.setupEvents = function() {
    var that = this;    // JavaScript workaround

    var removeHandler = function() { that.remove(); };
    var updateHandler = function() { that.update(); };

    this.post.find('#remove').on('click', removeHandler);
    this.post.find('#back').on('click', updateHandler);
    this.post.find('#done').on('click', updateHandler);

    this.comments.find('#write-comment').on('click', function() {
        var comm = that.comments.find('#comment');
        var list = that.comments.find('#comments-list');

        var data = { text : comm.val() };
        that.model.comment(list, data);

        comm.val("");
    });
};


EntryController.prototype.createDOMPost = function(id) {
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


EntryController.prototype.createDOMComments = function(id) {
    var template = [
        '<section id="' + id + '" data-transition="slide">',

            '<header class="title">',
                '<span class="title centered">Comments</span>',

                '<nav>',
                    '<a href="#back" id="back" data-router="section">',
                        '<span class="icon left"></span>',
                    '</a>',
                '</nav>',
            '</header>',


            '<article class="active">',
                '<form id="form" class="form">',
                    '<fieldset style="height: 200px;">',
                        '<label>Comment:</label>',
                        '<input id="comment" type="text" value="">',
                    '</fieldset>',

                    '<div class="margined">',
                        '<a href="#" id="write-comment" class="button anchor accept" data-icon="pencil" data-label="Write comment!">',
                            '<span class="icon pencil"></span>',
                            'Write comment!',
                        '</a>',
                    '</div>',
                '</form>',

                '<ul id="comments-list" class="scroll list">',
                    '<li class="anchor dark">List of Comments</li>',
                '</ul>',
            '</article>',

        '</section>',

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
    this.post.find('#title').val( this.model.title );
    this.post.find('#content').val( this.model.content );
    this.post.find('#tags').val( this.model.tags );

    Lungo.View.Article.title( this.model.title );
};


EntryController.prototype.update = function() {
    var data = {
        title   : this.post.find('#title').val(),
        content : this.post.find('#content').val(),
        tags    : this.post.find('#tags').val()
    };

    if (this.checkInputData(data)) {
        this.model.update(data);
    } else {
        this.remove();
    }
};


EntryController.prototype.remove = function() {
    Lungo.Router.back();

    this.post.remove();
    this.comments.remove();

    this.view.remove();
    this.model = null;
};
