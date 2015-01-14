var React = require('react');

var PersonListItem = React.createClass({

  displayName: 'PersonListItem',
  handleSelection: function(e){
    e.preventDefault();
    this.props.persons.selectPerson(this.props.person.id);
  },

  deletePerson: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.persons.deletePerson(this.props.person.id);
  },
  // render: function() {
  //   // var selectedHobby = this.props.selected && !!this.props.personsCxt.selectedHobby ? " is " + this.props.personsCxt.selectedHobby : "";
  //   // var person = this.props.person;
  //   return (
  //     <a
  //       onClick={this.handleSelection}
  //       href="#"
  //       className={this.props.selected ? "list-group-item active" : "list-group-item"} >
  //           {this.props.personsCxt.imOnline ? "" : "Offline -> "} {person.firstName + " " + person.lastName + selectedHobby}
  //           <span onClick={this.delete} className="glyphicon glyphicon-trash pull-right"></span>
  //       </a>
  //   );
  // }
  render: function() {
    var person = this.props.person;
    var persons = this.props.persons;
    var selected = persons.selectedPerson && (person.id === persons.selectedPerson.id);
    return (
      <a 
        onClick={this.handleSelection}
        className={selected ? "list-group-item active" : "list-group-item"} 
        href="#">{person.firstName + " " + person.lastName}
        <span onClick={this.deletePerson}
          className="glyphicon glyphicon-trash pull-right"></span>
      </a>
    );
  }

});

module.exports = PersonListItem;
