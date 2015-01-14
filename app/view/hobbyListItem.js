var React = require('react');

var HobbyListItem = React.createClass({

  displayName: 'HobbyListItem',
  handleSelection: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.persons.selectHobby(this.props.hobby.id);
  },
  delete: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.persons.selectedPerson.deleteHobby(this.props.hobby.id);
  },
  render: function() {
    var hobby = this.props.hobby;
    var persons = this.props.persons;
    var selected = persons.selectedHobby && (hobby.id === persons.selectedHobby.id);
    return (
      <a onClick={this.handleSelection}
        className={selected ? "list-group-item active" : "list-group-item"} 
        href="#">{hobby.name}
        <span onClick={this.delete}
          className="glyphicon glyphicon-trash pull-right"></span>
      </a>
    );
  }
});

module.exports = HobbyListItem;
