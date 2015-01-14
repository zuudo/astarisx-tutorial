var React = require('react');
var Astarisx = require('astarisx');
var PersonListItem = require('./personListItem');

var PersonList = React.createClass({

  displayName: 'PersonList',
  mixins: [Astarisx.mixin.view],
  render: function() {
    var persons = this.state.appContext.persons;
    var collection = persons.collection;
    var list = collection.map(function(person){
      return (
        <PersonListItem
          key={person.id}
          person={person}
          persons={persons} />
      );
    });
    return (
      <div className="list-group">
        {list}
      </div>
    );
  }
});

module.exports = PersonList;
