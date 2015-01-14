var Astarisx = require('astarisx');
var hobbyCtor = require('./hobby');

var Hobby = function(){
    return new hobbyCtor().apply(this, arguments);
};

var person = Astarisx.createModelClass({

  getInitialState: function(){
    var hobbies = this.$state.hobbies || [];
    var arr = hobbies.map(function(hobby){
      return new Hobby(hobby);
    });
    return {
      id: this.id || Date.now(),
      hobbies: arr
    };
  },

  id: {
    get: function(){
      return this.$state.id;
    }
  },
  
  firstName: {
    get: function(){ 
      return this.$state.firstName; 
    },
    set: function(newValue){
      this.setState({firstname: newValue});
    }
  },

  lastName: {
    get: function(){ 
      return this.$state.lastName; 
    },
    set: function(newValue){
      this.setState({lastName: newValue});
    }
  },

  fullName: {
    kind: 'pseudo',
    get: function(){
      if(this.lastName === void(0)){
        return this.firstName;
      }
      return this.firstName + ' ' + this.lastName;
    },
    set: function(newValue){
      var nextState = {};
      var nameArr = newValue.split(' ');
      var isSpace = newValue.slice(-1)[0] === ' ';
      var firstname = nameArr[0];
      var lastname = nameArr.slice(1).join(' ');

      nextState.firstName = firstname.length === 0 ? void(0) : firstname;
      nextState.lastName = lastname.length === 0 && !isSpace ? void(0) : lastname;

      this.setState(nextState);
    }
  },

  occupation: {
    aliasFor: 'job',
    get: function(){
      return this.$state.occupation;
    },
    set: function(newValue){
      this.setState({'occupation': newValue });
    }
  },

  dob: {
    get: function(){
      return this.$state.dob;
    },
    set: function(newValue){
      this.setState({'dob': newValue});
    }
  },

  gender: {
    get: function(){ 
      return this.$state.gender; 
    },
    set: function(newValue){
      this.setState({'gender': newValue});
    }
  },

  hobbies: {
    kind: 'array',
    get: function(){
      return this.$state.hobbies;
    }
  },

  age: {
    kind: 'pseudo',
    get: function(){
      if(this.dob === void(0) || this.dob.length < 10){
        return 'Enter your Birthday';
      }
      var DOB = new Date(this.dob);
      var ageDate = new Date(Date.now() - DOB.getTime());
      var age = Math.abs(ageDate.getFullYear() - 1970);
      return isNaN(age) ? 'Enter your Birthday' : age + ' years old';
    }
  },
  addHobby: function(hobbyName){
    var newHobbiesArr = this.hobbies.concat(new Hobby({hobby: hobbyName}));
    this.setState({hobbies: newHobbiesArr});
  },
  deleteHobby: function(id){
    var newHobbiesArr = this.hobbies.filter(function(hobby){
      return id !== hobby.id;
    });
    this.setState({hobbies: newHobbiesArr}, {'persons':{ selectedHobby: void(0)}});
  }
});

module.exports = person;
