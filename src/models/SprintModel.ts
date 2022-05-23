import { BaseModel } from './BaseModel';
import { makeRequest, getWords, Word, UserWord, createUserWord } from '../services/API';

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

  updateStatistics(correctAnswers: Word[], incorrectAnswers: Word[]) {
    correctAnswers.forEach(async (correctWord) => {
      let index = -1;
      for (let i = 0; i < this.userWords.length; i++) {
        if (this.userWords[i].wordId === correctWord.id) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        const userWord: UserWord = {
          difficulty: 'normal',
          optional: {
            counter: 1,
            progressCounter: 1,
            statisticsCounter: 1,
          },
        };

        this.userWords.push(
          await makeRequest(
            createUserWord(this.user.userId as string, this.user.token as string, correctWord.id, userWord),
            'createUserWord',
          ),
        );
      } else {
        this.userWords[index].optional.counter++;
        if (this.userWords[index].optional.progressCounter < 5) this.userWords[index].optional.progressCounter++;
        this.userWords[index].optional.statisticsCounter++;

        if (this.userWords[index].optional.progressCounter === 5) {
          this.userWords[index].difficulty = 'learned';
        }
      }
    });
    incorrectAnswers.forEach(async (incorrectWord) => {
      let index = -1;
      for (let i = 0; i < this.userWords.length; i++) {
        if (this.userWords[i].wordId === incorrectWord.id) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        const userWord: UserWord = {
          difficulty: 'normal',
          optional: {
            counter: 1,
            progressCounter: 0,
            statisticsCounter: 0,
          },
        };

        this.userWords.push(
          await makeRequest(
            createUserWord(this.user.userId as string, this.user.token as string, incorrectWord.id, userWord),
            'createUserWord',
          ),
        );
      } else {
        this.userWords[index].optional.counter++;
        if (this.userWords[index].difficulty === 'learned') {
          this.userWords[index].difficulty = 'normal';
          this.userWords[index].optional.progressCounter = 0;
        }
      }
    });

    this.commit('userWords', this.userWords);
  }
}
