import App from './App';
import './styles/main.scss';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});







// import './styles/main.scss';
import './minigame/sprint/styles/style.css';

import { SprintController } from './minigame/sprint/sprintController';

const app = new SprintController(1, 3);
app.renderHeaderStartPage();
app.renderMainStartPage();
app.levelSelection();

const satrtGameDeault = document.getElementById('start-game__default');
satrtGameDeault?.addEventListener('click');
