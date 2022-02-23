import { TextBookModel } from '../models/TextBookModel';
import { TextBookView } from '../views/TextBookView';
import { BaseController } from './BaseController';

export class TextBookController extends BaseController {
  model!: TextBookModel;

  view!: TextBookView;

  constructor(model: TextBookModel, view: TextBookView) {
    super(model, view);
  }
}
