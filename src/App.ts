import { MainPageController } from './controllers/MainPageController';
import { MainPageModel } from './models/MainPageModel';
import { MainPageView } from './views/MainPageView';
import { SprintView } from './views/SprintView';
import { SprintModel } from './models/SprintModel';
import { SprintController } from './controllers/SprintController';
import { BaseModel } from './models/BaseModel';
import { BaseView } from './views/BaseView';
import { BaseController } from './controllers/BaseController';
import { TextBookController } from './controllers/TextBookController';
import { TextBookModel } from './models/TextBookModel';
import { TextBookView } from './views/TextBookView';

type Model = BaseModel | MainPageModel | SprintModel;
type View = BaseView | MainPageView | SprintView;
type Controller = BaseController | MainPageController | SprintController;

export default class App {
  model!: Model;

  view!: View;

  controller!: Controller;

  init() {
    window.addEventListener('hashchange', this.navigate);
    this.navigate();
  }

  navigate = () => {
    let path = window.location.hash.slice(1).split('/');

    if (this.model?.statePage.split('/')[0] === path[0]) {
      return;
    }

    if (path[0] === 'header') {
      path = (this.model?.statePage ? this.model.statePage : 'mainPage').split('/');
      window.location.hash = path.join('/');
      return;
    }

    const isPopUp = path[0] === 'authorization-popup';
    const isLogOut = path[0] === 'logout';

    if ((isPopUp || isLogOut) && !this.view) {
      path = (this.model?.statePage ? this.model.statePage : 'mainPage').split('/');
      window.location.hash = path.toString();
    } else if (isPopUp || isLogOut) {
      return;
    }

    switch (path[0]) {
      case '':
      case 'mainPage':
        this.model = new MainPageModel();
        this.view = new MainPageView(this.model.isAuthorized);
        this.controller = new MainPageController(this.model as MainPageModel, this.view as MainPageView);
        break;
      case 'textbook':
        this.model = new TextBookModel();
        this.view = new TextBookView(this.model.isAuthorized);
        this.controller = new TextBookController(this.model as TextBookModel, this.view as TextBookView);
        break;
      case 'game-sprint':
        this.model = new SprintModel();
        this.view = new SprintView(this.model.isAuthorized);
        this.controller = new SprintController(this.model as SprintModel, this.view as SprintView);
        break;
      case 'game-audio':
        break;
      case 'statistics':
        break;
    }
  };
}
