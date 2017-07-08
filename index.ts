// index.ts

import * as http from 'http';
import * as express from 'express';
import * as _ from 'lodash';
import { Server as WebSocketServer } from 'ws';
import { Log as l } from './server/util';
import { DodgeballServer } from './server/game';

let port = process.env.PORT || 8080;

let app = express();
app.use(express.static(__dirname + '/client/www/'));

let server = http.createServer(app);
server.listen(port, () => {
	l.log('Listening on port ' + port + '.');
});

let game: DodgeballServer = new DodgeballServer();

let wsServer = new WebSocketServer({ server: server });

wsServer.on('connection', (wsClient) => {
	let client: any = _.get(wsClient, '_socket');
	let ip: any = client.remoteAddress;
	l.log('Client connected.', ip);

	wsClient.onclose = () => {
		l.log('Client disconnected.');
	};
});