Meteor.startup(function () {

		   // Create seed data if it doesn't already exist

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
