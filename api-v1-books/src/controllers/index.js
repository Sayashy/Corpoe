
import { bookRepo } from '../repository';
import makeBookController from './bookController';

const bookController = makeBookController({ bookRepo });

export { bookController };