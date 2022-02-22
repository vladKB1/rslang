import { MainPageModel } from '../models/MainPageModel';
import { MainPageView } from '../views/MainPageView';
import { BaseController } from './BaseController';

export class MainPageController extends BaseController {
  model!: MainPageModel;

  view!: MainPageView;

  constructor(model: MainPageModel, view: MainPageView) {
    super(model, view);

    this.model.bindReRenderPage(this.onReRenderMainPage);
    //this.addOpenGameHandlers();
  }

  onReRenderMainPage = async (isAuthorized: boolean) => {
    await this.view.reRenderMainPage(isAuthorized);

    if (!this.model.isAuthorized) {
      this.model.bindAuthorizationErrorTextChanged(this.onAuthorizationErrorTextChanged);

      this.view.bindChangeAuthorizationForm(this.handleChangeAuthorizationForm);
      this.view.bindBlurInputAction(this.handleBlurInputAction);
      this.view.bindSignInUser(this.handleSignInUser);
      this.view.bindSignUpUser(this.handleSignUpUser);
    } else {
      this.view.bindLogOutUser(this.handleLogOutUser);
    }

    this.view.bindMouseEventToNavItem(this.model.isAuthorized);
  };
}
