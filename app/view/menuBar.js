var React = require('react');
var Astarisx = require('astarisx');

var Component = React.createClass({

  displayName: 'MenuBar',
  mixins: [Astarisx.mixin.view],
  undo: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.state.appContext.revert();
  },
  redo: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.state.appContext.advance();
  },
  render: function(){

    // var onlineBtnTxt = this.props.appContext.online ? "Go offline" : "Go online";
    // var onlineBtnClass = this.props.appContext.online ? "btn btn-success btn-sm": "btn btn-danger btn-sm";
    // var noOfPeople = this.props.appContext.personCount;
    // var basePath = this.props.appContext.basePath;
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          {/*<h5 className="pull-right">Size: <b>{this.props.appContext.media}</b></h5>*/}
          <div className="navbar-header">
            <button type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              Astarisx CRM
            </a>
          </div>

          <div ref="menu" className="collapse navbar-collapse">
          {/*  <ul className="nav navbar-nav">
              <li><a href={basePath + "/broken/link"}>Bad Link</a></li>
              <li><a href={basePath + "/person/3"}>John Citizen</a></li>
            </ul>*/}
            <form className="navbar-form pull-right" role="search">
              <button onClick={this.undo}
                disabled={!this.state.appContext.$canRevert}
                className="btn btn-default btn-sm">
              Undo
              </button>
               <button onClick={this.redo}
                disabled={!this.state.appContext.$canAdvance}
                className="btn btn-default btn-sm">
              Redo
              </button>
              {/*<button onClick={this.toggleOnlineState}
                className={onlineBtnClass}>
                {onlineBtnTxt}
              </button>*/}
            </form>
          </div>

        </div>
      </nav>
    );
  }
});

module.exports = Component;
