// index.ts

import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import { Server as WebSocketServer } from 'ws';
import { Log as l } from './server/util';
import { DodgeballServer } from './server/game';

const PORT = process.env.PORT || 8080;

let app = express();
app.use('/', express.static(path.join(__dirname, 'client/www')));

let server = http.createServer(app);
server.listen(PORT, () => {
	l.log('Listening on port ' + PORT + '.');
});

let game: DodgeballServer = new DodgeballServer();

let wsServer = new WebSocketServer({ server: server });

wsServer.on('connection', (wsClient) => {
	l.log('Client connected.');

	wsClient.onclose = () => {
		l.log('Client disconnected.');
	};
});