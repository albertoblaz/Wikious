
(function () {

    // Create Own User
    var auth = new AuthManager();

    var user     = new User();
    user.auth = auth;
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
    var wikiView = new BlogView(wiki);
    var wikiCont = new BlogController(wiki, wikiView);

    window.wiki = wiki;


    // Create Entries
    var datas = [
        {
            title : 'Software Design',
            content : 'Software design is the process by which an agent creates a specification of a software artifact, intended to accomplish goals, using a set of primitive components and subject to constraints. Software design may refer to either "all the activities involved in conceptualizing, framing, implementing, commissioning, and ultimately modifying complex systems" or "the activity following requirements specification and before programming, as a stylized software engineering process."',
            tags : 'software, design'
        },

        {
            title : 'Software Architecture',
            content : 'The term software architecture intuitively denotes the high level structures of a software system. It can be defined as the set of structures needed to reason about the software system, which comprise the software elements, the relations between them, and the properties of both elements and relations. The term software architecture also denotes the set of practices used to select, define or design a software architecture.',
            tags : 'software, architecture'
        }
    ];

    var wc = true;
    datas.forEach(function(data) {
        var entry = new Entry();
        var view  = new EntryView(entry);
        var cont  = new EntryController(entry, view);

        var DOMList = $('#posts').find('.entries');
        view.appendInto(DOMList);

        entry.update(data);

        if (wc) {
            var list = cont.comments.find('#comments-list');
            entry.comment(list, {
                text : "Amazing article!",
                user : luis,
                date : "2 days"
            });

            entry.comment(list, {
                text : "Great explanation",
                user : jose,
                date : "1 day"
            });

            wc = false;
        }

        window.wiki.entries.push(entry);
    });

})();
