/**
 * Created by Franz on 5/14/2016.
 */
import {IUser} from 'bsh-shared/model';
import {ILoginCredential} from 'bsh-shared/security';
import {IBaseDAO} from 'bsh-shared/dao';

export interface IUserDAO extends IBaseDAO<IUser> {
  getUserByCredential(credential:ILoginCredential, appContext:string):Q.Promise<IUser>;
}
