import { BaseModel } from '../models/BaseModel';
import { BaseView } from '../views/BaseView';

export class BaseController {
  model: BaseModel;

  view: BaseView;

  constructor(model: BaseModel, view: BaseView) {
    this.model = model;
    this.view = view;
  }
}
