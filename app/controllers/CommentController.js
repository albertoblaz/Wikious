
/**
 * Lo que hago aqui es crear el modelo y la vista (a la que se le pasa el modelo)
 * Al modelo hay que pasarle los datos (title, content y tags)
 * pero tendria que recogerlos del HTML tanto aqui como en el metodo update
 * Por eso haciendolo de esta manera, esa parte del codigo solo esta escrita una vez en el 'update'
 * Y luego le paso los observadores al modelo
 */
var CommentController = function(html) {
    this.html = html;

    this.model = new Comment();
    this.view = new CommentView(this.model);

    this.update();  // Get the received data and update the model

    var observers = [this, this.view];
    this.model.addObservers(observers);
};


CommentController.prototype.update = function() {
    var newUser   = this.html.find('.user').text();
    var newText = this.html.find('.text').text();
    var newDate    = this.html.find('.date').text();

    this.model.update(newUser, newText, newDate);
};


CommentController.prototype.remove = function() {
    /*
    this.model.destroy();
    this.view.destroy();
    */
    this.model = null;
    this.view  = null;
    this = null;
};
