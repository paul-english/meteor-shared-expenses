Template.credits.credits = function() {
    return Credits.find({}, {sort:{date: -1}});
};

Template.credits.events = {
};

