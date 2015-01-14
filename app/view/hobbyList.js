var React = require('react');
var Astarisx = require('astarisx');
var HobbyListItem = require('./hobbyListItem');

var HobbyList = React.createClass({
  displayName: 'HobbyList',
  mixins: [Astarisx.mixin.view],
  getInitialState: function() {
    return {
      newValue: "" 
    };
  },
  updateHobby: function(e){
    this.state.appContext.persons.selectedHobby.name = e.target.value;
  },
  addHobby: function(){
    this.state.appContext.persons.selectedPerson.addHobby(this.state.newValue);
    this.setState({
      newValue: ""
    });
  },
  update: function(e){
    this.setState({
      newValue: e.target.value
    });
  },
  render: function() {
    var persons = this.state.appContext.persons;
    var selectedPerson = persons.selectedPerson;
    var selectedHobby = persons.selectedHobby;
    var hobbies = selectedPerson !== void(0) ? selectedPerson.hobbies : [];
    var list = hobbies.map(function(hobby){
      return (
        <HobbyListItem
          key={hobby.id}
          hobby={hobby}
          persons={persons} />
      );
    });
    return (<div>
      <div className="input-group">
        <input value={this.state.newValue}
          onChange={this.update}
          type="text" className="form-control" placeholder="What do you like doing in your spare time?"/>
        <span className="input-group-btn">
          <button onClick={this.addHobby} className="btn btn-default" type="button">Add</button>
        </span>
      </div>
      <input className="form-control" type="text" value={selectedHobby ? selectedHobby.name : ''}
          onChange={this.updateHobby} placeholder="Select hobby to update"/>
      <div className="list-group">
        {list}
      </div>
    </div>);
  }
});

module.exports = HobbyList;
