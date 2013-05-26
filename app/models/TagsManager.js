
var TagsManager = function() {
    this.tags = {};

    this.DOM = {
        tags : null
    };
};


TagsManager.prototype.tag = function(article, tags) {
    var that = this;

    tags.forEach(function(tagName) {
        var tagView;
        var tag = that.tags[tagName];

        if (! tag) {
            tag = new Tag(tagName);
            that.tags[tagName] = tag;

            tagView = new TagView(tag);
            tagView.appendInto(that.DOM.tags);
        }

        tag.add(article);
    });
};


TagsManager.prototype.untag = function(article, tags) {
    var that = this;

    tags.forEach(function(tagName) {
        var t = that.tags[tagName];
        t.remove(article);
        if (! t.count()) {
            delete that.tags[tagName];
        }
    });
};
