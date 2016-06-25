/**
 * Created by Franz on 5/28/2016.
 */

import _ = require('lodash');

const enum RoleEnum {
  Admin,
  Public
}

const Roles: {key:RoleEnum,role:string}[] = [
  {key:RoleEnum.Admin, role:'admin'},
  {key:RoleEnum.Public, role:'public'}
];

function getRole(role: RoleEnum):string {
  let roleObj = _.find(Roles,{key:role});
  if (roleObj) {
    return roleObj.role;
  }
}

export {Roles, RoleEnum, getRole};
