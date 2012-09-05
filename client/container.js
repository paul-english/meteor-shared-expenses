Template.container.export = function() {
    return Session.get('export', false);
};

Template.container.data = function() {
    return Session.get('data');
};

Template.container.events = {

    "click": function(e) {
	console.log('click container');
    },

    "click #export": function(e) {
	console.log('export');
	var out = {
	    people: [],
	    expenses: [],
	    credits: []
	};

	People.find({}, {reactive:false}).forEach(function(person) {
						      out.people.push(person);
						  });
	Expenses.find({}, {reactive:false}).forEach(function(expense) {
							out.expenses.push(expense);
						    });
	Credits.find({}, {reactive:false}).forEach(function(credit) {
						       out.credits.push(credit);
						   });

	Session.set('export', true);
	Session.set('data', JSON.stringify(out));
    }

};

