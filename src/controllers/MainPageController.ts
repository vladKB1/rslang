import { SprintController } from '../minigame/sprint/sprintController';
import { MainPageModel } from '../models/MainPageModel';
import { MainPageView } from '../views/MainPageView';
import { BaseController } from './BaseController';

export class MainPageController extends BaseController {
  constructor(model: MainPageModel, view: MainPageView) {
    super(model, view);

    this.addOpenGameHandlers();
  }

  addOpenGameHandlers() {
    const sprintGame = document.querySelector('.sprint');
    sprintGame?.addEventListener('click', this.startSprintGame);
  }

  startSprintGame = () => {
    const appSprint = new SprintController();
    appSprint.renderMainStartPage();
    appSprint.levelSelection();
  };
}
