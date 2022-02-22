import { Word } from '../models/SprintModel';
import { baseUrl } from '../services/API';

import { BaseView } from './BaseView';

export class SprintView extends BaseView {
  constructor(isAuthorized: boolean) {
    super(isAuthorized);
    this.footer.remove();
  }

  getHeaderTemplate() {
    return `
    <button class="sprint__header__button sprint__sound">
    <img class="sound-on"></button>
    <button class="sprint__header__button sprint__home"><img class="home"></button>`;
  }

  getLevelsNavigationTemplate() {
    return `
    <div class="sprint__start-page"
    <div class="sprint__start-page__main">
      <h1 class="sprint-title">СПРИНТ</h1>
      <p class="sprint-description-game">Быстрая игра для проверки Ваших знаний !</p>
      <p class="sprint-description-game">За 1 минуту Вам нужно выбрать максимальное количество правильных вариантов
        перевода слова</p>
      <p class="sprint-description-game">Для начала игры необходимо выбрать уровень сложности, в зависимости от
        знаний
  </div>
  </div>`;
  }

  getButtonsLevelTemplate() {
    return `
    <div class="sprint__start-page__buttons level_button_container">
        <button class="button-level level-one">1</button>
        <button class="button-level level-two">2</button>
        <button class="button-level level-three">3</button>
        <button class="button-level level-four">4</button>
        <button class="button-level level-five">5</button>
        <button class="button-level level-six">6</button>
      </div>`;
  }

  getCardTimeTemplate() {
    return `
    <div class="sprint-content">
    <div class="sprint-content__header">
      <div class="sprint-content__clock" id="timer"></div>
      <div class="sprint-content__counter" id="score"></div>
    </div>`;
  }

  getCardWordTemplate(word: Word): string {
    return `
    <div class="sprint-content__field">
        <div class="sprint-content__field__word">${word.word}</div>
        <div class="sprint-content__field__translate">${word.wordTranslateOnCard}</div>
        <div class="sprint-content__field__buttons">
          <button class="sprint-content__field__btn field__btn__false"> Неверно !</button>
          <button class="sprint-content__field__btn field__btn__true">Верно !</button>
        </div>
      </div>
  </div>`;
  }

  getPageResult(correctAnswers: number, incorrectAnswers: number, scoreNode: number) {
    return `
  <div class="sprint__result-page">
    <div class="audio-container"></div>
    <h2 class="sprint__result-title">Твой результат: ${scoreNode} баллов</h2>
    <div class="sprint__result-list">
      <h3 class="sprint__result-title-true">Правильных ответов: <span class="false-count">${correctAnswers}</span></h3>
      <div class="sprint__result-correct-list"></div>
      <div class="list-separation">
        <p class="line">-----------------------------------------</p>
        <h3 class="sprint__result-title-false">Неправильных ответов: <span class="true-count">${incorrectAnswers}</span></h3>
        <div class="sprint__result-incorrect-list"></div>
      </div>
    </div>
  </div>`;
  }

  getResultWordTemplate(word: Word) {
    return `
    <div class="sprint__result-list__item">
      <span class="audio-icon__container">
        <button class="icon-audio" data-audio-src="${baseUrl + '/' + word.audio}"><img class="icon-sound">
        </button>
        <span class="sprint__result__word">${word.word}</span>
        <span> - </span>
        <span class="sprint__result__word-translate">${word.wordTranslate}</span>
    </div>`;
  }

  getAudioBlock(src: string): string {
    return `<audio preload="none" autoplay src="${src}"></audio>`;
  }
}
