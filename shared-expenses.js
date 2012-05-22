People = new Meteor.Collection("people");
Expenses = new Meteor.Collection("expenses");
Credits = new Meteor.Collection("credits");


if (Meteor.is_client) {
    Handlebars.registerHelper('money', function(value) {
				  if (value) return "$" + parseFloat(value).toFixed(2);
				  return '---';
			      });
    Handlebars.registerHelper('fixed', function(value) {
				  if (value) return parseFloat(value).toFixed(2);
				  return '---';
			      });
    Handlebars.registerHelper('nice_person', function(value) {
				  if (value) return value.name;
				  return '---';
			      });
    Handlebars.registerHelper('first_name', function(value) {
				  if (value) return value.split(" ")[0];
				  return '---';
			      });
    Handlebars.registerHelper('nice_date', function(value) {
				  if (value) {
				      var date = new Date(value);
				      return (date.getMonth()+1) +"/"+ (date.getDate()) +"/"+ (date.getFullYear());
				  }
				  return '---';
			      });

    Template.container.events = {
	"click": function() {
	}
    };

    Template.expenses.expenses = function() {
	return Expenses.find({}, {sort:{date: -1}});
    };
    Template.expenses.events = {
	'click .new': function(e) {
	    Expenses.insert({date: new Date()}, function(err, id) {
				Session.set("selected", id);
			    });
	}
    };

    Template.expense.person_selected_is = function(name) {
	var expense = Expenses.findOne(Session.get("selected"));
	if (expense) var person = expense.person;
	if (person) return person.name === name;
	return null;
    };
    Template.expense.selected = function() {
	return Session.equals("selected", this._id);
    };
    Template.expense.people = function() {
	return People.find({}, {sort:{name: 1}});
    };
    Template.expense.events = {
	'click': function(e) {
	    Session.set("selected", this._id);
	    e.stopPropagation();
	},
	'click .delete': function() {
	    Expenses.remove(Session.get("selected"));
	},
	'click .delete i': function() {
	    Expenses.remove(Session.get("selected"));
	},
	'change .amount input': function(e) {
	    var input = e.target;
	    Expenses.update(Session.get("selected"), {$set: {amount: input.value}});
	},
	'change .note textarea': function(e) {
	    var textarea = e.target;
	    Expenses.update(Session.get("selected"), {$set: {note: textarea.value}});
	},
	'change .date input': function(e) {
	    var input = e.target;
	    Expenses.update(Session.get("selected"), {$set: {date: input.value}});
	},
	'change .person select': function(e) {
	    var select = e.target;
	    console.log(select.value);
	    Expenses.update(Session.get("selected"), {$set: {person: People.findOne(select.value)}});
	}
    };

    Template.credits.credits = function() {
	return Credits.find({}, {sort:{date: -1}});
    };
    Template.credits.events = {
	'click .new': function(e) {
	    Credits.insert({date: new Date()}, function(err, id) {
				Session.set("selected", id);
			    });
	}
    };

    Template.credit.person_selected_is = function(name) {
	var credit = Credits.findOne(Session.get("selected"));
	if (credit) var person = credit.person;
	if (person) return person.name === name;
	return null;
    };
    Template.credit.selected = function() {
	return Session.equals("selected", this._id);
    };
    Template.credit.people = function() {
	return People.find({}, {sort:{name: 1}});
    };
    Template.credit.recipient_selected_is = function(name) {
	var credit = Credits.findOne(Session.get("selected"));
	if (credit) var person = credit.recipient;
	if (person) return person.name === name;
	return null;
    };

    Template.credit.events = {
	'click': function(e) {
	    Session.set("selected", this._id);
	    e.stopPropagation();
	},
	'click .delete': function() {
	    Credits.remove(Session.get("selected"));
	},
	'click .delete i': function() {
	    Credits.remove(Session.get("selected"));
	},
	'change .amount input': function(e) {
	    var input = e.target;
	    Credits.update(Session.get("selected"), {$set: {amount: input.value}});
	},
	'change .note textarea': function(e) {
	    var textarea = e.target;
	    Credits.update(Session.get("selected"), {$set: {note: textarea.value}});
	},
	'change .date input': function(e) {
	    var input = e.target;
	    Credits.update(Session.get("selected"), {$set: {date: new Date(input.value)}});
	},
	'change .person select': function(e) {
	    var select = e.target;
	    Credits.update(Session.get("selected"), {$set: {person: People.findOne(select.value)}});
	},
	'change .recipient select': function(e) {
	    var select = e.target;
	    Credits.update(Session.get("selected"), {$set: {recipient: People.findOne(select.value)}});
	}
    };

    Template.side.people = function() {
	return People.find({}, {sort:{name: 1}});
    };

    Template.person.balance = function() {
	var person = this;
	var num_people = People.find().count();
	person.balance = 0;

	Credits.find().forEach(function(credit) {
				   if (credit.person && credit.recipient && credit.amount) {
				       var amount = parseFloat(credit.amount);
				       if (credit.person.name === person.name) person.balance -= amount;
				       if (credit.recipient.name === person.name) person.balance += amount;
				   }
			       });

	Expenses.find().forEach(function(expense) {
				    if (expense.person && expense.amount) {
					var share = parseFloat(expense.amount) / num_people;
					if (expense.person.name === person.name) person.balance -= share * 2;
					else person.balance += share;
				    }
			       });

	return person.balance;
    };
}

if (Meteor.is_server) {
    Meteor.startup(function () {
		       if (People.find().count() === 0) {
			   var names = ["Silvia Iglesias",
				       "Erika Stephenson",
				       "Paul English"];
			   for (var i = 0; i < names.length; i++) {
			       People.insert({name: names[i], balance: 0});
			   }
		       }

		       if (Expenses.find().count() === 0) {
			   Expenses.insert({person:People.findOne({name:"Silvia Iglesias"}), date: new Date(), note: "electric bill", amount:24});
			   Expenses.insert({person:People.findOne({name:"Paul English"}), date: new Date(), note: "drier exhaust & teflon tape", amount:12});
			   Expenses.insert({person:People.findOne({name:"Erika Stephenson"}), date: new Date(), note: "housewares", amount:6});
		       }

		       if (Credits.find().count() === 0) {
			   Credits.insert({person:People.findOne({name:"Erika Stephenson"}), date: new Date(), note: "check for electric bill", amount:6, recipient:People.findOne({name:"Silvia Iglesias"})});
		       }
		   });
}