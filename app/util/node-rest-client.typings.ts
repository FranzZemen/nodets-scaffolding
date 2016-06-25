/**
 * Created by franzzemen on 6/25/16.
 */

declare module 'node-rest-client' {
  class ClientRequest {
    on(event:string,callback:(err:Error)=>void);
  }

  class Client {
    get(url:string, callback:(data:any, response:any)=>any):ClientRequest;
    get(url:string, callback:(data:any, args:any, response:any)=>any):ClientRequest;
    post(url:string, args:any, callback:(data:any, response:any)=>any):ClientRequest;
    on(event:string,callback:(err:Error)=>void):ClientRequest;
  }
}