Template.person.balance = function() {
    var person = this;
    var num_people = People.find().count();
    person.balance = 0;

    Credits.find().forEach(function(credit) {
			       // if this is a valid credit transaction apply the amount to total balance
			       if (credit.person && credit.recipient && credit.amount) {
				   var amount = parseFloat(credit.amount);
				   if (credit.person.name === person.name) person.balance -= amount;
				   if (credit.recipient.name === person.name) person.balance += amount;
			       }
			   });

    Expenses.find().forEach(function(expense) {
				// if this is a valid expense transaction
				if (expense.person && expense.amount) {
				    //console.log('expense, bill to', expense.bill_to);

				    if (expense.bill_to && expense.bill_to.length !== 0) {
					var share_with = expense.bill_to.length;
				    } else {
					var share_with = num_people - 1;
				    }

				    //console.log('share_with', share_with);

				    var share_amount = parseFloat(expense.amount) / (share_with + 1);

				    // Apply credit for each person the expense is shared with, 
				    // otherwise bill the person
				    if (expense.person.name === person.name) {
					person.balance -= share_amount * share_with;
				    } else if (expense.bill_to && expense.bill_to.length !== 0) {
					//console.log('bill_to calc', expense.bill_to, person._id, _.include(expense.bill_to, person._id));
					if (_.include(expense.bill_to, person._id)) {
					    person.balance += share_amount;
					}
				    } else {
					person.balance += share_amount;
				    }

				}
			    });

    return person.balance;
};
