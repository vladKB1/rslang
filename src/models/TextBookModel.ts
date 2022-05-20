import { getWord, getWords, makeRequest, Word } from '../services/API';
import { BaseModel } from './BaseModel';

export class TextBookModel extends BaseModel {
  category!: number | null;

  page!: number | null;

  words!: Word[];

  constructor(category: number | null, page: number | null) {
    super();
    this.category = category;
    this.page = page;
    this.words = [];
  }

  getWordsForCategory = async (category: number, page: number) => {
    try {
      let content = [] as Word[];

      if (this.category === 7) {
        for (const userWord of this.userWords) {
          await content.push(await makeRequest(getWord(userWord.wordId), 'getWord'));
        }
      } else {
        content = await makeRequest(
          getWords([
            { key: 'group', value: (category - 1).toString() },
            { key: 'page', value: (page - 1).toString() },
          ]),
          'getWords',
        );
      }

      this.words = content as Word[];
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log('getWordForCategory ERROR: ', errorMessage);

      if (errorMessage.startsWith('UNAUTHORIZED:')) {
        this.reSignIn();
        return;
      }

      console.log('getWordForCategory ERROR: ', errorMessage);
      return;
    }
  };
}
