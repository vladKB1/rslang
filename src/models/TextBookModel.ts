import {
  createUserWord,
  deleteUserWord,
  getWord,
  getWords,
  makeRequest,
  updateUserWord,
  UserWord,
  Word,
} from '../services/API';
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
          if (userWord.difficulty === 'difficult') {
            await content.push(await makeRequest(getWord(userWord.wordId), 'getWord'));
          }
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

  toggleWordCardButtons = async (wordId: string, status: string, isActive: boolean) => {
    if (isActive) {
      await makeRequest(
        deleteUserWord(this.user.userId as string, this.user.token as string, wordId),
        'deleteUserWord',
      );

      this.userWords.splice(
        this.userWords.findIndex((userWord) => userWord.wordId === wordId),
        1,
      );

      this.commit('userWords', this.userWords);
      return;
    }

    let userWord: UserWord = {
      difficulty: status,
      optional: {
        counter: 0,
        progressCounter: 0,
        statisticsCounter: 0,
      },
    };

    let isExists = false;
    for (let i = 0; i < this.userWords.length; i++) {
      if (this.userWords[i].wordId === wordId) {
        this.userWords[i].difficulty = status;
        if (status === 'difficult') {
          this.userWords[i].optional.progressCounter = 0;
        } else if (status === 'learned') {
          this.userWords[i].optional.progressCounter = 5;
        }
        userWord = this.userWords[i];
        isExists = true;
        break;
      }
    }

    if (!isExists) {
      this.userWords.push(
        await makeRequest(
          createUserWord(this.user.userId as string, this.user.token as string, wordId, userWord),
          'createUserWord',
        ),
      );
    } else {
      this.userWords.push(
        await makeRequest(
          updateUserWord(this.user.userId as string, this.user.token as string, wordId, userWord),
          'updateUserWord',
        ),
      );
    }

    this.commit('userWords', this.userWords);
  };
}
