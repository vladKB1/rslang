import { getDifficultWords, getWords, makeRequest, Word } from '../services/API';
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
      let content;

      if (this.category === 7) {
        content = await makeRequest(
          getDifficultWords(this.user.userId as string, this.user.token as string),
          'getDifficultWords',
        );
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
      return;
    }
  };
}
