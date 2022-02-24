import { BaseModel } from './BaseModel';

export class TextBookModel extends BaseModel {
  category!: number;

  page!: number;

  constructor() {
    super();

    const path = this.statePage.split('/');
    if (path.length === 3) {
      this.category = Number(path[1]);
      this.page = Number(path[2]);
    }
  }
}
