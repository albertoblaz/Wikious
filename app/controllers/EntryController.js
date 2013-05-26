
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
    var links = this.createDynamicIDs(['post', 'comment']);
    var pid = links['post'];
    var cid = links['comment'];

    this.post = this.createDOMPost(pid);
    this.comments = this.createDOMComments(cid);

    var list = this.comments.find('#comments-list');
    this.model.DOM.comments = list;

    this.view.setLinks(links);

    this.setupEvents();
    this.render();
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

    var removeHandler  = function() { that.remove();  };
    var updateHandler  = function() { that.update();  };
    var commentHandler = function() { that.comment(); };

    // this.post.find('#back').on('click', updateHandler);
    this.post.find('#remove').on('click', removeHandler);
    this.post.find('#done').on('click', updateHandler);
    this.comments.find('#write-comment').on('click', commentHandler);
};


EntryController.prototype.createDOMPost = function(id) {
    var title = this.model.title || 'New article';
    var template = [
        '<section id="' + id + '" data-transition="slide">',

            '<header class="title">',
                '<span class="title centered">' + title + '</span>',

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

                '<form id="entry" class="form" style="height: 75%">',
                    '<fieldset>',
                        '<label>Title:</label>',
                        '<input id="title" type="text" value="">',
                    '</fieldset>',

                    '<fieldset style="height: 66%;">',
                        '<label>Content:</label>',
                        '<textarea id="content" type="text" value="" style="height: 90%;"></textarea>',
                    '</fieldset>',

                    '<fieldset>',
                        '<label>Categories:</label>',
                        '<input id="tags" type="text" value="">',
                    '</fieldset>',

                    '<fieldset>',
                        '<label>Created:</label>',
                        '<input id="dateCreation" type="text" value="" readonly>',
                    '</fieldset>',

                    '<fieldset>',
                        '<label>Last Edit:</label>',
                        '<input id="dateLastEdition" type="text" value="" readonly>',
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


EntryController.prototype.comment = function() {
    var comm = this.comments.find('#comment');

    var data = { text : comm.val() };
    if (data.text) {
        this.model.comment(data);
        comm.val("");
    }
};


/* Public API */

EntryController.prototype.notify = function() {
    this.render();
};


EntryController.prototype.render = function() {
    var that = this;

    var fields = [ 'title', 'content', 'tags', 'dateCreation', 'dateLastEdition' ];
    fields.forEach(function(f) {
        that.post.find('#' + f).val( that.model[f] );
    });

    Lungo.View.Article.title( this.model.title );
};


EntryController.prototype.filterTags = function() {
    var domTags = this.post.find('#tags').val();
    var tags = domTags.split(",");
/*
    if (typeof tags === "string") {
        tags = domTags.split(" ");
    }
*/
    tags = tags.map(function(t) { return t.trim(); });
    return tags;
};


EntryController.prototype.update = function() {
    var data = {
        title   : this.post.find('#title').val(),
        content : this.post.find('#content').val(),
        tags    : this.filterTags()
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
    this.model.remove();
    this.model = null;
};
