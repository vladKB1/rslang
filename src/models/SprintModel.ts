import { BaseModel } from './BaseModel';
import { makeRequest, getWords } from '../services/API';

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
}
