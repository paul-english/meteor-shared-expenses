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

