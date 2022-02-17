import { MainPageModel } from '../models/MainPageModel';
import { MainPageView } from '../views/MainPageView';
import { BaseController } from './BaseController';

export class MainPageController extends BaseController {
  constructor(model: MainPageModel, view: MainPageView) {
    super(model, view);
  }
}
