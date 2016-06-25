/**
 * Created by Franz on 5/21/2016.
 */

import Q = require('q');

export interface IBaseDAO<T> {
  findByPrimaryKey(key:string) : Q.Promise<T>
}
