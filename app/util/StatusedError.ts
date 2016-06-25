/**
 * Created by Franz on 5/14/2016.
 */
import {RestStatusCodes} from './restStatusCodes';

export class StatusedError extends Error {
  statusMessage: string;
  get fullMessage() {
    return '' + this.message + ': '  + this.statusMessage;
  }
  constructor(public statusCode:RestStatusCodes, message?:string) {
    super(message)
    switch(statusCode) {
      case RestStatusCodes.Unauthorized:
        this.statusMessage = 'Permission Denied';
        break;
      case RestStatusCodes.Forbidden:
        this.statusMessage = 'Login Failed';
        break;
      case RestStatusCodes.BadData:
        this.statusMessage = 'Bad Input';
        break;
      case RestStatusCodes.ServerError:
        this.statusMessage = 'Server Error. Try again later.';
        break;
      case RestStatusCodes.Expired:
        this.statusMessage = 'Your session expired';
        break;
      case RestStatusCodes.NotFound:
        this.statusMessage = 'Not found';
        break;
      case RestStatusCodes.ClientSide:
        this.statusMessage = 'Error processing (client side)';
        break;
    }
  }
}
