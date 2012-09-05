Template.navigation.events = {
    'click a': function(e) {
	$('.nav li').removeClass('active');
	$(e.target).parents('li').addClass('active');
    },

    'click .bills': function(e) {
	
    },

    'click .payments': function(e) {
	
    },

    'click .new-bill': function(e) {
	Expenses.insert({date: new Date()}, function(err, id) {
			    Session.set("selected", id);
			});
    },

    'click .new-payment': function(e) {
	Credits.insert({date: new Date()}, function(err, id) {
			   Session.set("selected", id);
		       });
    }
};
