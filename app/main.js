
var auth = new AuthManager();

var user = new User();
var usco = new UserController(user);
user.auth = auth;

var blog = new Blog("FIWiki");
var view = new BlogView(blog);
var cont = new BlogController(blog, view);


window.user = user;
window.wiki = wiki;
