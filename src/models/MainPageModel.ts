import { BaseModel } from './BaseModel';

export class MainPageModel extends BaseModel {
  constructor() {
    super();
  }

  bindReRenderPage(callback: (isAuthorized: boolean) => void) {
    this.onReRenderPage = callback;
  }
}
