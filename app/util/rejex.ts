/**
 * Created by Franz on 5/14/2016.
 */
const ALPHANUMERIC_REGEX = /^[A-Z0-9]*$/i;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Z\d$@$!%*#?&]{8,64}$/i;
const TOKEN_REGEX = /^[A-Z0-9\-]*$/i;
const USERNAME_REGEX = /^[A-Z0-9._%+-@]{4,64}$/i;

export {
  ALPHANUMERIC_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  TOKEN_REGEX,
  USERNAME_REGEX
}