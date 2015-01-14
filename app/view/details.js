var React = require('react');
var PersonForm = require('./personForm');
// var HobbyList = require('./hobbyList');

var Details = React.createClass({

  displayName: 'Details',
  render: function() {
    return (<div> 
      <PersonForm />
      {/*<HobbyList />*/}
    </div>);
  }

});

module.exports = Details;
