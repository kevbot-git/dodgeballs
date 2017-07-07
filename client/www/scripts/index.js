// index.js

var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);

ws.onopen = () => {
	log('Connected.');
};

ws.onmessage = (event) => {
	log(event);
};

var log = function() {
	var context = '[Client]';
	return Function.prototype.bind.call(console.log, console, context);
}();

var error = function() {
	var context ='[Client:ERROR]';
	return Function.prototype.bind.call(console.error, console, context);
}();