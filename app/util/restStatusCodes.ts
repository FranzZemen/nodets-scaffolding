/**
 * Created by Franz on 5/14/2016.
 */
const enum RestStatusCodes {
  Success = 200,
  BadData = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Expired = 409,    
  ServerError = 500,
  NotFound = 404,
  ClientSide = 412
}

export {
  RestStatusCodes
}