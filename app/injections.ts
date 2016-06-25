/**
 * Created by Franz on 5/15/2016.
 */
import {Injector} from './injection/injector';
import {UserDAO} from './dao/user/user.dao';
import {LoginService} from './services/login.service';
import {USER_DAO_INJECTION_KEY, LOGIN_SERVICE_INJECTION_KEY, SECURITY_CONTROLLER_KEY,SOMETHING_SERVICE_INJECTION_KEY} from './util/injectionConstants';
import {} from "./util/injectionConstants";
import {SomeThingService} from "./services/someThing.service";

const globalInjector:Injector = new Injector();
function registerGlobalInjections () {
  // Create or instantiate injections (if they themselves have dependencies)
  globalInjector.register(USER_DAO_INJECTION_KEY, new UserDAO());
  globalInjector.register(LOGIN_SERVICE_INJECTION_KEY, globalInjector.instantiate(LoginService));
  globalInjector.register(SOMETHING_SERVICE_INJECTION_KEY, globalInjector.instantiate(SomeThingService));
}

export {
  globalInjector,
  registerGlobalInjections
}

