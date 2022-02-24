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

type Model = BaseModel;
type View = BaseView;
type Controller = BaseController;

export default class App {
  model!: Model;

  view!: View;

  controller!: Controller;

  init() {
    window.addEventListener('hashchange', this.navigate);
    this.navigate();
  }

  navigate = () => {
    console.log(window.location.hash);
    let path = window.location.hash.slice(1).split('/');
    console.log(path);

    if (this.model?.statePage === path.join('/')) {
      return;
    }

    if (path[0] === 'header') {
      path = (this.model?.statePage ? this.model.statePage : 'mainPage').split('/');
      window.location.hash = path.join('/');
      return;
    }

    const isPopUp = path[0] === 'authorization-popup';
    const isLogOut = path[0] === 'logout';

    if (isPopUp || isLogOut) {
      if (!this.view) {
        path = (this.model?.statePage ? this.model.statePage : 'mainPage').split('/');
        window.location.hash = path.join('/');
      }
      return;
    }

    console.log(path[0]);

    switch (path[0]) {
      case 'textbook': {
        let category = null;
        let page = null;

        if (path.length === 2) {
          path.pop();
          window.location.hash = path.join('/');
          return;
        } else if (path.length > 3) {
          path = [path[0], path[1], path[2]];
          window.location.hash = path.join('/');
          return;
        } else if (path.length === 3) {
          const prevPath = path.join('/');

          if (isNaN(+path[1]) || +path[1] <= 0) {
            path[1] = '1';
          } else if (+path[1] > 7) {
            path[1] = '7';
          }

          if (isNaN(+path[2]) || +path[2] <= 0) {
            path[2] = '1';
          } else if (+path[2] > 30) {
            path[2] = '30';

            if (+path[1] === 7) {
              path[2] = '1';
            }
          }

          if (prevPath !== path.join('/')) {
            window.location.hash = path.join('/');
            return;
          }

          category = Number(path[1]);
          page = Number(path[2]);
        }

        this.model = new TextBookModel();
        this.view = new TextBookView(this.model.isAuthorized, category, page);
        this.controller = new TextBookController(this.model as TextBookModel, this.view as TextBookView);
        break;
      }
      case 'game-sprint': {
        if (path.length > 1) {
          path = [path[0]];
          window.location.hash = path.join('/');
          return;
        }
        this.model = new SprintModel();
        this.view = new SprintView(this.model.isAuthorized);
        this.controller = new SprintController(this.model as SprintModel, this.view as SprintView);
        break;
      }
      case 'game-audio': {
        if (path.length > 1) {
          path = [path[0]];
          window.location.hash = path.join('/');
          return;
        }
        break;
      }
      case 'statistics': {
        break;
      }
      default: {
        if (path.length > 2) {
          path = [path[0], path[1]];
          window.location.hash = path.join('/');
          return;
        }

        if (path[0] !== 'mainPage') {
          window.location.hash = 'mainPage';
          return;
        }

        if (path.length === 2) {
          if (path[1] !== 'mini-games' && path[1] !== 'about') {
            window.location.hash = `mainPage`;
            return;
          } else if ((path[1] === 'mini-games' || path[1] === 'about') && this.view instanceof MainPageModel) {
            return;
          }
        }

        this.model = new MainPageModel();
        this.view = new MainPageView(this.model.isAuthorized);
        this.controller = new MainPageController(this.model as MainPageModel, this.view as MainPageView);
      }
    }
  };
}
