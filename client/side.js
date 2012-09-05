Template.side.people = function() {
    return People.find({}, {sort:{name: 1}});
};

