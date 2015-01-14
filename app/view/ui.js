var React = require('react');
var Astarisx = require('astarisx');
var cvm = require('../viewModels/cvm');

var MenuBar = require('./menuBar');
var Nav = require('./navigation');
var Details = require('./details');

var UI = React.createClass({
  mixins: [Astarisx.mixin.ui],
  componentWillMount: function(){
    this.initializeAppContext({ 
      controllerViewModel: cvm,
      enableUndo: true
    });
  },

  render: function(){
    console.log('Application State --> ', this.state.appContext);
    return (<div>
      <MenuBar />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Nav />
          </div>
          <div className="col-md-8">
            <Details />
          </div>
        </div>
      </div>
    </div>);
  }
});
module.exports = UI;
