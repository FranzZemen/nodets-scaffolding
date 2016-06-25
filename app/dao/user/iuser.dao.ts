import {IBaseDAO} from "../iBaseDAO";
import {IUser} from "../../shapes/IUser";
import {ILoginCredential} from "../../security/ILoginCredential";
/**
 * Created by Franz on 5/14/2016.
 */


export interface IUserDAO extends IBaseDAO<IUser> {
  getUserByCredential(credential:ILoginCredential, appContext:string):Q.Promise<IUser>;
}
