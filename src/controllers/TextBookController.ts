import { UserWordData } from '../models/BaseModel';
import { TextBookModel } from '../models/TextBookModel';
import { TextBookView } from '../views/TextBookView';
import { BaseController } from './BaseController';

export class TextBookController extends BaseController {
  model!: TextBookModel;

  view!: TextBookView;

  constructor(model: TextBookModel, view: TextBookView) {
    super(model, view);

    if (this.model.isAuthorized) {
      this.view.bindToggleWordCardButton(this.handleToggleWordCardButtons);
      this.view.addWordStatus(this.handleAddWordStatus());
    }
  }

  handleToggleWordCardButtons = (
    wordId: string,
    status: string,
    isDifficultActive: boolean,
    isLearnedActive: boolean,
  ) => {
    this.model.toggleWordCardButtons(wordId, status, isDifficultActive, isLearnedActive);
  };

  handleAddWordStatus = (): UserWordData[] => {
    const map = new Map();
    this.model.userWords?.forEach((userWord) => map.set(userWord.wordId, userWord));

    return this.model.words.map((word) => {
      if (map.has(word.id)) {
        return map.get(word.id);
      } else {
        return {
          id: '',
          difficulty: 'normal',
          wordId: word.id,
          optional: {
            counter: 0,
            progressCounter: 0,
            statisticsCounter: 0,
          },
        };
      }
    });
  };
}
