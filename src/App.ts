import { MainPageController } from './controllers/MainPageController';
import { MainPageModel } from './models/MainPageModel';
import { MainPageView } from './views/MainPageView';
import { SprintView } from './views/SprintView';
import { SprintModel } from './models/SprintModel';
import { SprintController } from './controllers/SprintController';
import { BaseModel } from './models/BaseModel';
import { BaseView } from './views/BaseView';
import { BaseController } from './controllers/BaseController';

type Model = BaseModel | MainPageModel | SprintModel;
type View = BaseView | MainPageView | SprintView;
type Controller = BaseController | MainPageController | SprintController;

export default class App {
  model!: Model;

  view!: View;

  controller!: Controller;

  init() {
    this.model = new SprintModel();
    this.view = new SprintView(this.model.isAuthorized);
    this.controller = new SprintController(this.model as SprintModel, this.view as SprintView);

    // window.addEventListener('hashchange', this.navigate);
    // this.navigate();
  }

  // navigate = () => {
  //   const path = window.location.hash.slice(1).split('/');

  //   switch (path[0]) {
  //     case 'sprint':
  //       break;
  //     default:
  //       // this.model = new MainPageModel();
  //       // this.view = new MainPageView(this.model.isAuthorized);
  //       // this.controller = new MainPageController(this.model as MainPageModel, this.view as MainPageView);

  //       this.model = new SprintModel();
  //       this.view = new SprintView(this.model.isAuthorized);
  //       this.controller = new SprintController(this.model as SprintModel, this.view as SprintView);
  //   }
  // };
}
