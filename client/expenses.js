Template.expenses.expenses = function() {
    return Expenses.find({}, {sort:{date: -1}});
};

Template.expenses.events = {
};

