ClientRouter = Backbone.Router.extend({
					  routes: {
					      ":route/"          :       "get_route",
					      ":route/:action/"  :       "get_route"
					  },

					  /* Generic routes */
					  get_route: function( route, action ) {
					      var args, query;
					      if ( action ) {
						  args   = action.split('?');
						  query  = args[1];
						  action = args[0];
					      }

					      Meteor.request.setController(route);
					      Meteor.request.setAction(action);
					      Meteor.request.setQuery(query);
					  },

					  /* Every time a route is called we set it in the Session */
					  initialize: function() {
					      this.bind("all", function() {
							    Session.set('route', Backbone.history.fragment);
							});
					  }
				      });

var Router = new ClientRouter;
Backbone.history.start({pushState: true});

// Here I'm using the Base library for class convenience (I don't really like the way Javascript handles OO) : @see : http://dean.edwards.name/weblog/2006/03/base/
var Request = Base.extend({
			      constructor: function() {
			      },

			      setController: function( controller ) {
				  this.controller = controller;
			      },
			      setAction: function( action ) {
				  this.action = action;
			      },
			      setQuery: function( query ) {
				  if (query) {
				      var query_object = {};
				      query.replace(
					  new RegExp("([^?=&]+)(=([^&]*))?", "g"),
					  function($0, $1, $2, $3) { query_object[$1] = $3; }
				      );
				  }
				  this.query = query_object;
			      }
			  });

Meteor.request = new Request;