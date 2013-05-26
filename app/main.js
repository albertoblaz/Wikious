
(function () {

    window.auth = new AuthManager();

    // Create Own User
    var user     = new User();
    var userView = new UserView(user);
    var userCont = new UserController(user, userView);

    window.user = user;


    // Create Users in the system
    var luis = new User();
    luis.signup({
        nick     : "rapsioux",
        pass     : "luis",
        name     : "Luis Mayorga",
        email    : "luis@may.com",
        age      : 40,
        location : "Russia",
        auth     : auth
    });

    var jose = new User();
    jose.signup({
        nick     : "jarias7",
        pass     : "jose",
        name     : "Jose Arias",
        email    : "jariasf@gmail.com",
        age      : 35,
        location : "Josephland",
        auth     : auth
    });


    // Create Wiki
    var wiki = new Blog("FIWiki");
    var wikiCont = new BlogController(wiki, null);
    var wikiCont2 = new BlogTagsController(wiki, null);

    window.wiki = wiki;
    wiki.notifyObservers();


    // Create Entry #1
    var entry = wiki.createEntry({
        title : 'Software Design',
        content : 'Software design is the process by which an agent creates a specification of a software artifact, intended to accomplish goals, using a set of primitive components and subject to constraints. Software design may refer to either "all the activities involved in conceptualizing, framing, implementing, commissioning, and ultimately modifying complex systems" or "the activity following requirements specification and before programming, as a stylized software engineering process."',
        tags : ['software', 'design'],
        dateCreation : "12:45 Apr 13 2013"
    });

    entry.rate(8);
    entry.rate(10);

    // Create 2 Comments for Entry #1
    entry.comment({
        text : "Amazing article!",
        user : luis,
        date : "2 days"
    });

    entry.comment({
        text : "Great explanation",
        user : jose,
        date : "1 day"
    });


    // Create Entry #2
    entry = wiki.createEntry({
        title : 'Software Architecture',
        content : 'The term software architecture intuitively denotes the high level structures of a software system. It can be defined as the set of structures needed to reason about the software system, which comprise the software elements, the relations between them, and the properties of both elements and relations. The term software architecture also denotes the set of practices used to select, define or design a software architecture.',
        tags : ['software', 'architecture'],
        dateCreation : "08:31 May 02 2012"
    });

    entry.rate(7);

})();
