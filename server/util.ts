// util.ts

import * as colors from 'colors';

export class Log {
	public static log: any = function() {
		var context = colors.green('[Server]');
		return Function.prototype.bind.call(console.log, console, context);
	}();

	public static error: any = function() {
		var context = colors.red('[Server:ERROR]');
		return Function.prototype.bind.call(console.error, console, context);
	}();
}
