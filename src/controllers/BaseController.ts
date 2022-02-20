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
      this.model.bindAuthorizationErrorTextChanged(this.onAuthorizationErrorTextChanged);

      this.view.bindChangeAuthorizationForm(this.handleChangeAuthorizationForm);
      this.view.bindBlurInputAction(this.handleBlurInputAction);
      this.view.bindSignInUser(this.handleSignInUser);
      this.view.bindSignUpUser(this.handleSignUpUser);
    }
  }

  onAuthorizationErrorTextChanged = (newErrorText: string) => {
    this.view.changeAuthorizationErrorText(newErrorText);
  };

  handleChangeAuthorizationForm = (target: HTMLElement) => {
    this.view.changeAuthorizationForm(target);
  };

  handleBlurInputAction = (input: HTMLInputElement) => {
    this.view.blurInputAction(input);
  };

  handleSignInUser = async (user: User) => {
    try {
      await this.model.signInUser(user);
    } catch (error) {
      return;
    }
  };

  handleSignUpUser = async (user: User) => {
    try {
      await this.model.signUpUser(user);
      await setTimeout(() => this.handleSignInUser(user), 1000);
    } catch (error) {
      return;
    }
  };
}
