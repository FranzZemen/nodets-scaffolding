/**
 * Created by Franz on 4/30/2016.
 */
import {Model} from './Model';
import {IOrg} from './IOrg';

export class Org extends Model implements IOrg {
  name: string;
  constructor(org: IOrg) {
    super(org);
    this.name = org.name;
  }
}