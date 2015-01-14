var React = require('react');
var PersonList = require('./personList');
var Astarisx = require('astarisx');

var Navigation = React.createClass({
  mixins: [Astarisx.mixin.view],
  displayName: 'Navigation',
  addPerson: function(){
    this.state.appContext.persons.addPerson(this.state.newValue);
    this.setState({
      newValue: ""
    });
  },
  update: function(e){
    this.setState({
      newValue: e.target.value
    });
  },
  getInitialState: function() {
    return {
      newValue: "" 
    };
  },
  render: function(){
    return (
      <div>
        <div className="input-group">
          <input value={this.state.newValue}
            onChange={this.update}
            type="text" className="form-control" placeholder="Full Name"/>
          <span className="input-group-btn">
            <button onClick={this.addPerson} className="btn btn-default" type="button">Add</button>
          </span>
        </div>
        <PersonList />
      </div>
    );    
  }

});

module.exports = Navigation;
