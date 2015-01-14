var Astarisx = require('astarisx');
var personCtor = require('../models/person');
var hobbyCtor = require('../models/hobby');

var personChangeHandler = function(nextState, nextAppState, callback){
  var coll = this.collection.map(function(person){
    if(nextState.id === person.id){
      return new Person(nextState);
    }
    return person;
  });
  this.setState({
    collection: coll, 
    selectedPerson: new Person(nextState)
  }, nextAppState);
};

var Person = function(){
    return new personCtor(personChangeHandler).apply(this, arguments);
};

var hobbyChangeHandler = function(nextState/*, nextAppState, callback*/){
    var hobbies = this.selectedPerson.hobbies.map(function(hobby){
      if(nextState.id === hobby.id){
        return nextState;
      }
      return hobby;
    });
    var newPerson = new Person(this.selectedPerson, {hobbies: hobbies});
    var nextAppState = {};
    nextAppState[this.$dataContext] = {selectedHobby: new Hobby(nextState)};
    personChangeHandler.call(this, newPerson, nextAppState);
};

var Hobby = function(){
    return new hobbyCtor(hobbyChangeHandler).apply(this, arguments);
};

var personsViewModel = Astarisx.createViewModelClass({  //short form => createVMClass()

  /* This is where you make ajax calls. Do not put ajax calls in getInitialState */
  dataContextWillInitialize: function(){

    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './data/demo.json', true);
    xhr.onload = function(e) {
      if (this.status == 200) {
        var persons = JSON.parse(this.response);
        if(!!persons){
          //The server should return projects not flagged as deleted
          var personsCollection = persons.map(function(person){
            return new Person(person);
          });
          self.setState({
            collection: personsCollection
          }, false);
        }
      }
    };
    xhr.send();
    // this.setState({ collection: personsCollection }/*, {$notify: "SideBarView"}, false*/);
  },

  // getDisplays: function(){
  //   return {
  //     "main":{
  //       component: DetailsView,
  //       path: function(){ return '/person/' + this.selectedPerson.id; }
  //     }
  //   }
  // },

  // getRoutes: function(){
  //   return {
  //     displayPerson: {
  //       path: '/person/:id',
  //       handler: personRouteHandler,
  //     },
  //     list: {
  //       path: '/people',
  //       handler: personRouteHandler,
  //     }
  //   };
  // },

  // getWatchedState: function() {
  //   return {
  //     'hobbies': {
  //       alias: 'hobbiesContext',
  //     },
  //     'online': {
  //       alias: 'imOnline'
  //     }
  //   };
  // },

  // imOnline: {
  //   kind:'pseudo',
  //   get: function(){
  //     return this.$state.imOnline;
  //   }
  // },

  // selectedHobby: {
  //   kind: 'pseudo',
  //   get: function() {
  //     return this.$state.hobbiesContext.current ?
  //       this.$state.hobbiesContext.current.name: void(0);
  //   }
  // },

  collection: {
    kind: 'array',
    get: function(){ return this.$state.collection; },
  },
  
  selectedPerson: {
    kind: 'instance',
    get: function() { return this.$state.selectedPerson; }
  },

  selectPerson: function(id){
    var person;
    if(this.selectedPerson === void(0) || this.selectedPerson.id !== id){     
      for (var i = this.collection.length - 1; i >= 0; i--) {
        if(this.collection[i].id === id){
          person = new Person(this.collection[i]);
          break;
        }
      }
      this.setState({
        selectedPerson: person,
        selectedHobby: void(0)
      });
    }
  }, 

  selectedHobby: {
    kind: 'instance',
    get: function() { return new Hobby(this.$state.selectedHobby); }
  },

  selectHobby: function(id){
    var person;
    if(this.selectedPerson !== void(0)){    
      for (var i = this.selectedPerson.hobbies.length - 1; i >= 0; i--) {
        if(this.selectedPerson.hobbies[i].id === id){
          hobby = new Hobby(this.selectedPerson.hobbies[i]);
          break;
        }
      }
      this.setState({
        selectedHobby: hobby
      });
    }
  },
  // selectPerson: function(id, callback){
  //   var selectedPerson;

  //   if(!id){
  //       this.setState({selectedPerson: selectedPerson },
  //         {$path: '/people' }, callback);
  //         return;
  //   }
  //   for (var i = this.collection.length - 1; i >= 0; i--) {
  //     if(this.collection[i].id === id){
  //       selectedPerson = new Person(this.collection[i]);
  //       this.setState({ selectedPerson: selectedPerson },
  //         {$path: '/person/' + selectedPerson.id }, callback);
  //       break;
  //     }
  //   }
  //   if(!selectedPerson){
  //     this.setState({selectedPerson: selectedPerson },
  //       {$pageNotFound: true }, callback);
  //   }
  // },

  addPerson: function(fullName){
    var nextState = {};
    var name;

    if(fullName && fullName.length > 0){
      name = fullName.split(' ');
      nextState.selectedPerson = new Person({
        firstName: name[0],
        lastName: name.slice(1).join(' ')
      });
      nextState.collection = this.collection.slice(0);
      nextState.collection = nextState.collection.concat(nextState.selectedPerson);
      this.setState(nextState);
    }
  },

  deletePerson: function(id){
    var nextState = {};
    nextState.collection = this.collection.filter(function(person){
      return person.id !== id;
    }.bind(this));
    if(this.selectedPerson && this.selectedPerson.id === id){
      nextState.selectedPerson = void(0);
    }
    this.setState(nextState);
  }

});
module.exports = personsViewModel;
