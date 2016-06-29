var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var allData = [];

var Content = React.createClass({
  render: function() {
    return (
      <p style={this.props.styleContent}>{this.props.message}</p>
    );
  },
});

var Main = React.createClass({
  getInitialState: function() {
      return {
        data: []
      };
  },
  componentWillMount: function() {
    firebase.database().ref('posts').on('value', function(snapshot) {
      this.setState({
           data: snapshot.val()
      });
    }.bind(this));
  },
  render:function(){
    allData.push(this.state.data);

    var upperItems = allData.map(function(data, i) {
      if(data.message != 'undefined') {
        return (
          <Content key={i} message={data.message} styleContent={data.position}/>
        );
      }
    });

    return (
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={150} transitionLeaveTimeout={130}>
        {upperItems}
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = Main;
