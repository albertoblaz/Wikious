
var User = function(name, email, age, location) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.location = location;
};

User.prototype.sayHi = function() {
    console.log("Hello World, my name is " + this.name + " and I am " + this.age + " years old");
};
