import { TIME_1_DAY } from './utils.constants';

export const SESSION_COOKIE_NAME = 'nest.session';
export const SESSION_SECRET = process.env.SESSION_SECRET ?? 'default';
export const SESSION_MAX_AGE = TIME_1_DAY * 90;
