import { BaseModel } from './BaseModel';

export class TextBookModel extends BaseModel {
  category!: number;

  page!: number;

  constructor() {
    super();
  }
}
