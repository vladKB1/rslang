import './styles/main.scss';

import { MainPageModel } from './models/MainPageModel';
import { MainPageView } from './views/MainPageView';
import { MainPageController } from './controllers/MainPageController';

const app = new MainPageController(new MainPageModel(), new MainPageView());
console.log(app);
