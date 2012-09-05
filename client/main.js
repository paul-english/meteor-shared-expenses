/**
 *  Loads the template according to the route
 */
Handlebars.registerHelper('main_view', function(){
			      /* This does nothing but triggers the Meteor.ui.chunk HTML automatic update on route change */
			      Session.get('route');

			      /* If the Route changes (mostly via Router.navigate('new/route', {trigger:true}), Meteor.ui.chunk allows our content to be re-rendered */
			      return Meteor.ui.chunk(Template[Meteor.get_template()]);
			  });

Meteor.get_template = function() {
    Meteor.view = Meteor.request.controller;
    Meteor.view += Meteor.request.action ? '_' + Meteor.request.action : '' ;

    // Error handling

    return Meteor.view;
}

Template.main.view = function() {
    return ActiveView;
};

