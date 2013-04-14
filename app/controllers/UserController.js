
/**
 * Lo que hago aqui es crear el modelo y la vista (a la que se le pasa el modelo)
 * Al modelo hay que pasarle los datos (title, content y tags)
 * pero tendria que recogerlos del HTML tanto aqui como en el metodo update
 * Por eso haciendolo de esta manera, esa parte del codigo solo esta escrita una vez en el 'update'
 * Y luego le paso los observadores al modelo
 */
var EntryController = function(html) {
    this.html = html;

    this.model = new Entry();
    this.view = new EntryView(this.model);

    this.update();  // Get the received data and update the model

    var observers = [this, this.view];
    this.model.addObservers(observers);
};


EntryController.prototype.update = function() {
    var newTitle   = this.html.find('.title').text();
    var newContent = this.html.find('.content').text();
    var newTags    = this.html.find('.tags').text();

    this.model.update(newTitle, newContent, newTags);
};


EntryController.prototype.remove = function() {
    /*
    this.model.destroy();
    this.view.destroy();
    */
    this.model = null;
    this.view  = null;
    this = null;
};
