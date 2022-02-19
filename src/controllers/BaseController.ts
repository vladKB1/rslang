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
      this.view.bindSignUpUser(this.handleSignUpUser);
    }
  }

  handleChangeAuthorizationForm = (target: HTMLElement) => {
    this.view.changeAuthorizationForm(target);
  };

  handleBlurInputAction = (input: HTMLInputElement) => {
    this.view.blurInputAction(input);
  };

  handleSignInUser = async (user: User) => {
    await this.model.SignInUser(user);
  };

  handleSignUpUser = async (user: User) => {
    await this.model.SignUpUser(user);
    setTimeout(() => this.model.SignInUser(user), 1000);
  };
}
