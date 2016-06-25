/**
 * Created by Franz on 4/30/2016.
 */
import {IModel} from './IModel';

export class Model implements IModel {
  bid: string;
  insertDate: number;
  updateDate: number;
  
  
  constructor(model:IModel) {
    this.bid = model.bid;
    this.insertDate = model.insertDate;
    this.updateDate = model.updateDate;
  }
}