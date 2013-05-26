
var EntryRateController = function(model, view) {
    this.html  = null;
    this.model = model;
    this.view  = view;

    this.model.addObservers( [this, this.view] );
    this.initWindow();
};


/* Private API */

EntryRateController.prototype.initWindow = function() {
    var links = this.createDynamicIDs(['rate']);
    var rid = links['rate'];

    this.html = this.createDOM(rid);

    this.view.setLinks(links);

    this.setupEvents();
    this.render();
};


EntryRateController.prototype.createDynamicIDs = function(prefixes) {
    if (! EntryRateController.prototype.num) {
        EntryRateController.prototype.num = 0;
    }

    var links = {};
    prefixes.forEach(function(p) {
        var id = p + EntryRateController.prototype.num;
        links[p] = id;
    });

    EntryRateController.prototype.num++;
    return links;
};


EntryRateController.prototype.setupEvents = function() {
    var that = this;    // JavaScript workaround

    var range  = this.html.find('#range');

    range.on('change', function () {
        that.html.find('#points').text( range.val() );
    });

    var rateHandler = function () {
        var value = parseInt(range.val(), 10);
        that.rate(value);
        $(this).removeClass('accept')
               .addClass('disabled')
               .text("Thanks for rating!")
               .off('click', rateHandler)
               .on('click', function(event) {
                    event.preventDefault();
               });
    };

    this.html.find('#rate-btn').on('click', rateHandler);
};


EntryRateController.prototype.createDOM = function(id) {
    var title = this.model.title || 'New article';
    var template = [
        '<section id="' + id + '" data-transition="slide">',

            '<header data-title="Rate this article">',
                '<span class="title centered">Rate this article</span>',

                '<nav>',
                    '<a href="#back" data-router="section" data-icon="left">',
                        '<span class="icon left"></span>',
                    '</a>',
                '</nav>',
            '</header>',

            '<article class="active scroll">',
                '<div class="margined" style="height: 280px;">',
                    '<div style="text-align: center;height: 280px;">',
                        '<div>',
                            '<strong id="opinion" style="font-size: 1.625em; line-height: 1.25em;">Give us your opinion about this article</strong>',
                        '</div>',

                        '<div style="font-size: 8em;margin-top: 30%;">',
                            '<label class="interrogant">¿</label>',
                            '<label style="font-size: 1.25em;" id="points" class="points"></label>',
                            '<label class="interrogant">?</label>',
                        '</div>',
                    '</div>',

                    '<form style="margin-top: 7%;">',
                        '<p style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">',
                            'Average score:',
                            '<label id="average" style="margin-left: 5px;"></label>',
                        '</p>',

                        '<input id="range" type="range" min="0" max="10" value="5">',
                        '<a href="#" style="margin-top: 25px;" id="rate-btn" class="button anchor accept">Submit vote!</a>',
                    '</form>',
                '</div>',
            '</article>',

        '</section>'
    ].join(" ");

    var dom = $(template);
    $('body').append(dom);

    return dom;
};


EntryRateController.prototype.rate = function(value) {
    this.html.find('#opinion').text("Your rate of this article was");
    this.html.find('.interrogant').remove();
    this.model.rate(value);
};


/* Public API */

EntryRateController.prototype.notify = function() {
    this.render();
};


EntryRateController.prototype.render = function() {
    var avg = this.model.averageScore() || "No rated";
    this.html.find('#average').text( avg );
};

/*
EntryRateController.prototype.update = function() {
    var data = {
        title   : this.html.find('#title').val(),
        content : this.html.find('#content').val(),
        tags    : this.html.find('#tags').val().split(", ")
    };

    if (this.checkInputData(data)) {
        this.model.update(data);
    } else {
        this.remove();
    }
};
*/
