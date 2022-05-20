import { TextBookModel } from '../models/TextBookModel';
import { TextBookView } from '../views/TextBookView';
import { BaseController } from './BaseController';

export class TextBookController extends BaseController {
  model!: TextBookModel;

  view!: TextBookView;

  constructor(model: TextBookModel, view: TextBookView) {
    super(model, view);

    if (this.model.isAuthorized) {
      this.view.bindToggleDifficult(this.handleToggleDifficult);

      this.view.addWordStatus(this.handleAddWordStatus());
    }
  }

  handleToggleDifficult = (wordId: string, isActive: boolean) => {
    this.model.toggleDifficult(wordId, isActive);
  };

  handleAddWordStatus = () => {
    const map = new Map();
    this.model.userWords.forEach((userWord) => map.set(userWord.wordId, userWord.difficulty));
    return this.model.words.map((word) => (map.has(word.id) ? map.get(word.id) : 'normal'));
  };
}
