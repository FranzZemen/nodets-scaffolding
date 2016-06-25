/**
 * Created by Franz on 5/14/2016.
 */
import {IModel} from './IModel';
import {IOrg} from "./IOrg";

export interface IUser extends IModel {
  username: string;
  email: string;
  roles: string[];
  org: IOrg;
}
