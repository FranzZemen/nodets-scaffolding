/**
 * Created by Franz on 4/30/2016.
 */

import {Model} from './Model';
import {IUser} from './IUser';
import {IOrg} from "./IOrg";

export class User extends Model implements IUser {
  username: string;
  email: string;
  roles: string[];
  org: IOrg;
  
  constructor(user:IUser) {
    super(user);
    this.username = user.username;
    this.email = user.email;
    this.roles = user.roles;
    this.org = user.org;
  }
  validate():void {
    console.log('validated!');
  }
}