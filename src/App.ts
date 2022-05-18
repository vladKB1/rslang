import { MainPageController } from './controllers/MainPageController';
import { MainPageModel } from './models/MainPageModel';
import { MainPageView } from './views/MainPageView';
import { SprintView } from './views/SprintView';
import { SprintModel } from './models/SprintModel';
import { SprintController } from './controllers/SprintController';
import { TextBookController } from './controllers/TextBookController';
import { TextBookModel } from './models/TextBookModel';
import { TextBookView } from './views/TextBookView';

type Model = MainPageModel | TextBookModel | SprintModel;
type View = MainPageView | TextBookView | SprintView;
type Controller = MainPageController | TextBookController | SprintController;

export default class App {
  model!: Model;

  view!: View;

  controller!: Controller;

  init() {
    window.addEventListener('hashchange', this.navigate);
    this.navigate();
  }

  navigate = async () => {
    let path = window.location.hash.slice(1).split('/');

    if (this.model?.statePage === path.join('/')) {
      return;
    }
    if (this.view instanceof TextBookView) {
      this.view.currentAudio?.pause();
      this.view.currentAudio = null;
    }

    switch (path[0]) {
      case 'logout': {
        const statePage = this.model?.statePage ? this.model.statePage : 'mainPage';
        this.model.statePage = 'logout';
        window.location.hash = statePage;
        return;
      }
      case 'authorization-popup': {
        if (!this.view) {
          path = (this.model?.statePage ? this.model.statePage : 'mainPage').split('/');
          window.location.hash = path.join('/');
        }
        return;
      }
      case 'header': {
        window.location.hash = this.model?.statePage ? this.model.statePage : 'mainPage';
        return;
      }
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
          }

          if (+path[1] === 7) {
            path[2] = '1';
          }

          if (prevPath !== path.join('/')) {
            window.location.hash = path.join('/');
            return;
          }

          if (path.join('/') === 'textbook/7/1' && !this.model?.isAuthorized) {
            window.location.hash = this.model?.statePage ? this.model.statePage : 'textbook';
            return;
          }

          category = Number(path[1]);
          page = Number(path[2]);
        }

        this.model = new TextBookModel(category, page);
        if (category && page) {
          await (this.model as TextBookModel).getWordsForCategory(category as number, page as number);
        }
        this.view = new TextBookView((this.model as TextBookModel).words, this.model.isAuthorized, category, page);
        this.controller = new TextBookController(this.model as TextBookModel, this.view as TextBookView);
        break;
      }
      case 'game-sprint': {
        if (path.length > 1) {
          path = [path[0]];
          window.location.hash = path.join('/');
          return;
        }

        let category;
        let page;
        const statePage = this.model?.statePage.split('/');
        if (statePage) {
          if (statePage[0] === 'textbook' && statePage.length === 3) {
            category = Number(statePage[1]) - 1;
            page = Number(statePage[2]) - 1;
          }
        }

        this.model = new SprintModel();
        this.view = new SprintView(this.model.isAuthorized);
        this.controller = new SprintController(this.model as SprintModel, this.view as SprintView, category, page);
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
