var React = require("react");
var ReactDOM = require("react-dom");
var Main = require("./main.jsx");

var Component = React.createClass({
  render:function(){
    return (
    	<Main/>
    );
  }
});

ReactDOM.render(
  	<Component/>,
  	document.getElementById('content')
);
