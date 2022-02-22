export const baseUrl = 'https://react-learnwords-example.herokuapp.com/';
import { BaseModel } from './BaseModel';

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  wordTranslateOnCard?: string;
}

export class SprintModel extends BaseModel {
  words!: Word[];

  constructor() {
    super();
  }

  getWordsForLevel(level: number, page?: number) {
    return fetch(`${baseUrl}words?group=${level}&page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => (this.words = data));
  }
}
