
var Entry = function(title, content, tags) {
    this.title = title;
    this.content = content;
    this.tags = tags;   // TODO esto lo vamos a hacer asi al final ??

    this.comment = [];
    this.likes = 0;
};

Entry.prototype.comment = function(user, text) {
    var c = new Comment(user, text);
    this.comment.push(c);
};

Entry.prototype.like = function() {
    this.likes++;
};
