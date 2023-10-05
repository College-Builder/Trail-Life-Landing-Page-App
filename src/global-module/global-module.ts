import Middleware from './middleware/middleware';
import Mailer from './mailer/mailer';

export default class GlobalModule {
	static Mailer = Mailer;
	static Middleware = Middleware;
}
