var Astarisx = require('astarisx');

var hobby = Astarisx.createMClass({
  
  getInitialState: function(){
    return { id: this.id || Date.now() }
  },

  id: {
    get: function(){
      return this.$state.id;
    }
  },

  hobby: {
    get: function(){
      return this.$state.hobby;
    }
  },

  name: {
    kind: 'pseudo',
    get: function(){
      return this.$state.hobby;
    },
    set: function(newValue){
      this.setState({'hobby': newValue });
    }
  },

});

module.exports = hobby;
