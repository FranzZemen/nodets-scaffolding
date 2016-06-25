/**
 * Created by Franz on 4/30/2016.
 */
import {ILoginCredential} from "./ILoginCredential";
import {PASSWORD_REGEX, USERNAME_REGEX} from "../util/rejex";

export class LoginCredential implements ILoginCredential {
  username: string;
  password: string;
  constructor(credential: ILoginCredential) {
    this.username = credential.username;
    this.password = credential.password;
  }
  validate () {
    return PASSWORD_REGEX.test(this.password) && USERNAME_REGEX.test(this.username);
  }
}