var Astarisx = require('astarisx');
var personsViewModel = require('./persons');

var controllerViewModel = Astarisx.createCVMClass({
  dataContextWillInitialize: function(){
    this.initializeDataContext('*');
  },
  persons: {
    viewModel: personsViewModel,
    get: function(){
      return this.$state.persons;
    }
  }
});

module.exports = controllerViewModel;
