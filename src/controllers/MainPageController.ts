import { MainPageModel } from '../models/MainPageModel';
import { MainPageView } from '../views/MainPageView';
import { BaseController } from './BaseController';

export class MainPageController extends BaseController {
  model!: MainPageModel;

  view!: MainPageView;

  constructor(model: MainPageModel, view: MainPageView) {
    super(model, view);
    this.model.bindReRenderPage(this.onReRenderMainPage);
  }

  onReRenderMainPage = async (isAuthorized: boolean) => {
    await this.view.reRenderMainPage(isAuthorized);
    this.bindBaseEvents();
  };
}
