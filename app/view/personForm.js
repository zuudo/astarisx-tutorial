var React = require('react');
var Astarisx = require('astarisx');
var HobbyList = require('./hobbyList');

var PersonForm = React.createClass({

  displayName: 'PersonForm',

  updateName: function(e){
    this.state.appContext.persons.selectedPerson.fullName = e.target.value;
  },
  updateOccupation: function(e){
    this.state.appContext.persons.selectedPerson.occupation = e.target.value;
  },
  updateGender: function(e){
    this.state.appContext.persons.selectedPerson.gender = e.target.value;
  },
  updateDOB: function(e){
    this.state.appContext.persons.selectedPerson.dob = e.target.value;
  },
  mixins: [Astarisx.mixin.view],  
  render: function() {
    var persons = this.state.appContext.persons;
    var current = persons.selectedPerson;

    var display;
    if(!current){
      display = <div>Select or add a person</div>;
    } else {
      display = (
        <div>
          <form className="form-horizontal" role="form">
            <div className="form-group">
                <label className="col-md-2 control-label">Name</label>
                <div className="col-md-3">
                  <input className="form-control" type="text" 
                    value={current.fullName}
                    onChange={this.updateName} />
              </div>
            </div>
            <div className="form-group">
                <label className="col-md-2 control-label">Occupation</label>
                <div className="col-md-3">
                  <input className="form-control" type="text"
                    value={current.occupation}
                    onChange={this.updateOccupation} />
              </div>
            </div>
            <div className="form-group">
                <label className="col-md-2 control-label">Gender</label>
                <div className="col-md-3">
                  <div className="radio">
                  <label>
                    <input type="radio" 
                      value="male"
                      checked={current.gender === 'male'}
                      onChange={this.updateGender} />
                    Male
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                      value="female"
                      checked={current.gender === 'female'}
                      onChange={this.updateGender} />
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
                <label className="col-md-2 control-label">Birthday</label>
                <div className="col-md-3">
                  <input className="form-control" type="text"
                  placeholder="yyyy-mm-dd"
                  value={current.dob}
                  onChange={this.updateDOB} />
              </div>
            </div>
              <div className="form-group">
                <label className="col-md-2 control-label">Age</label>
                <div className="col-md-3">
                  <div>
                    {current.age}
                  </div>
              </div>
            </div>
          </form>
          <HobbyList />
        </div>
      );
    }
    return <div>{display}</div>;
  }

});

module.exports = PersonForm;
