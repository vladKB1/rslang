import { BaseModel } from '../models/BaseModel';
import { BaseView } from '../views/BaseView';
import { User } from '../services/API';

export class BaseController {
  model: BaseModel;

  view: BaseView;

  constructor(model: BaseModel, view: BaseView) {
    this.model = model;
    this.view = view;

    if (!model.isAuthorized) {
      this.view.bindChangeAuthorizationForm(this.handleChangeAuthorizationForm);
      this.view.bindBlurInputAction(this.handleBlurInputAction);
      this.view.bindSignInUser(this.handleSignInUser);
    }
  }

  handleChangeAuthorizationForm = (target: HTMLElement) => {
    this.view.changeAuthorizationForm(target);
  };

  handleBlurInputAction = (input: HTMLInputElement) => {
    this.view.blurInputAction(input);
  };

  handleSignInUser = (user: User) => {
    this.model.SignInUser(user);
  };
}
