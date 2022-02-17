import { MainPageController } from './controllers/MainPageController';
import { MainPageModel } from './models/MainPageModel';
import { MainPageView } from './views/MainPageView';

export default class App {
  model!: MainPageModel;

  view!: MainPageView;

  controller!: MainPageController;

  init() {
    this.model = new MainPageModel();
    this.view = new MainPageView(this.model.isAuthorized);
    this.controller = new MainPageController(this.model, this.view);
  }
}
