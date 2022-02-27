import { BaseModel } from './BaseModel';
import { makeRequest, getWords, Word } from '../services/API';

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
