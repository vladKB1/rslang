export const baseUrl = 'https://react-rslang-team15.herokuapp.com/';
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
    return fetch(`${baseUrl}words?page=${page}&group=${level}`)
      .then((response) => response.json())
      .then((data) => (this.words = data));
  }
}
