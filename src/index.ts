import { BaseController } from './controllers/BaseController';
import { BaseModel } from './models/BaseModel';
import './styles/main.scss';
import { BaseView } from './views/BaseView';

const app = new BaseController(new BaseModel(), new BaseView());
console.log(app);
