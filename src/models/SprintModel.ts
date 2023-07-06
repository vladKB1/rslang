import { BaseModel } from './BaseModel';
import { makeRequest, getWords, Word, UserWord, createUserWord, updateUserWord } from '../services/API';

export class SprintModel extends BaseModel {
  words!: Word[];

  constructor() {
    super();
  }

  getWordsForLevel(level: number, page = 0) {
    const queryParams = [];
    if (level?.toString() !== 'undefined') {
      queryParams.push({ key: 'group', value: level.toString() });
    }
    if (page?.toString() !== 'undefined' || page?.toString() !== 'NaN') {
      queryParams.push({ key: 'page', value: page?.toString() });
    }

    return makeRequest(getWords(queryParams), 'getWords').then((data: Word[]) => (this.words = data));
  }

  updateStatistics(words: Word[], isCorrect: boolean) {
    words.forEach(async (word) => {
      let index = -1;
      for (let i = 0; i < this.userWords.length; i++) {
        if (this.userWords[i].wordId === word.id) {
          index = i;
          break;
        }
      }

      let userWord: UserWord = {
        difficulty: 'normal',
        optional: {
          counter: 1,
          progressCounter: 1,
          statisticsCounter: 1,
        },
      };

      if (index === -1 && !isCorrect) {
        userWord = {
          difficulty: 'normal',
          optional: {
            counter: 1,
            progressCounter: 0,
            statisticsCounter: 0,
          },
        };
      } else if (index) {
        if (isCorrect) {
          this.userWords[index].optional.counter++;
          if (this.userWords[index].optional.progressCounter < 5) this.userWords[index].optional.progressCounter++;
          this.userWords[index].optional.statisticsCounter++;

          if (this.userWords[index].optional.progressCounter === 5) {
            this.userWords[index].difficulty = 'learned';
          }
        } else {
          this.userWords[index].optional.counter++;
          if (this.userWords[index].difficulty === 'learned') {
            this.userWords[index].difficulty = 'normal';
            this.userWords[index].optional.progressCounter = 0;
          }
        }

        userWord = {
          difficulty: this.userWords[index].difficulty,
          optional: {
            counter: this.userWords[index].optional.counter,
            progressCounter: this.userWords[index].optional.progressCounter,
            statisticsCounter: this.userWords[index].optional.statisticsCounter,
          },
        };
      }

      if (!index) {
        await makeRequest(
          createUserWord(this.user.userId as string, this.user.token as string, word.id, userWord),
          'createUserWord',
        );
      } else {
        await makeRequest(
          updateUserWord(this.user.userId as string, this.user.token as string, word.id, userWord),
          'updateUserWord',
        );
      }
    });
  }
}
