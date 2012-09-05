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

Handlebars.registerHelper('nice_bill_to', function(bill_to) {
			      console.log('bill_to helper', bill_to);

			      if (bill_to && bill_to.length > 0) {
				  var out = [];
				  if ((bill_to.length + 1) !== People.find().count()) {
				      People.find({}).forEach(function(person) {
								  if (_.include(bill_to, person._id)) {
								      out.push(person.name);
								  }
							      });
				      return out.join(',');
				  }
			      }
			      return '---';
			  });