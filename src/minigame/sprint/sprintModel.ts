export const baseUrl = 'https://react-rslang-team15.herokuapp.com/';

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

export class SprintModel {
  words!: Word[];

  getWordsForlevel(level: number, page?: number) {
    return fetch(`${baseUrl}words?page=${page}&group=${level}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.words = data;
      });
  }
}
