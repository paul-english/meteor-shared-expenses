Template.expense.person_selected_is = function(name) {
    var expense = Expenses.findOne(Session.get("selected"));
    if (expense) var person = expense.person;
    if (person) return person.name === name;
    return null;
};

Template.expense.bill_to_selected = function(id) {
    var expense = Expenses.findOne(Session.get("selected"));
    if (expense) var bill_to = expense.bill_to;
    //console.log('expense bill_to helper', id, bill_to, _.include(bill_to, id));
    if (bill_to) return _.include(bill_to, id);
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
	//console.log("click set selected", this, e.target);
	if (!this.name) {
	    Session.set("selected", this._id);
	}
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
	//console.log(select.value);
	Expenses.update(Session.get("selected"), {$set: {person: People.findOne(select.value)}});
    },
    'change .to input': function(e) {
	var expense = Expenses.findOne(Session.get("selected"));
	//console.log('expense', expense);
	var bill_to = expense.bill_to;
	if (!bill_to) {
	    bill_to = [this._id];
	} else {
	    if (_.include(bill_to, this._id)) {
		bill_to = _.without(bill_to, this._id);
	    } else {
		bill_to.push(this._id);
	    }
	}
	//console.log('bill to', bill_to);
	Expenses.update(Session.get("selected"), {$set: {bill_to: bill_to}});
	e.stopPropagation();
    }
};

