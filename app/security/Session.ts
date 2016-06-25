/**
 * Created by Franz on 5/14/2016.
 */

import {IUser} from '../shapes/IUser';

export class Session {
  constructor(public user:IUser, public token:string) {}
}