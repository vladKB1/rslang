import { BaseController } from './BaseController';
import { SprintView } from '../views/SprintView';
import { Word, SprintModel } from '../models/SprintModel';

export class SprintController extends BaseController {
  view!: SprintView;

  model!: SprintModel;

  container!: HTMLElement;

  wrapper!: HTMLElement;

  time!: number;

  score!: number;

  correctTranslation!: string;

  currentWord!: Word;

  wordTranslate!: string;

  currentLevel!: number;

  wrapperCard!: HTMLElement;

  correctAnswers!: Word[];

  incorrectAnswers!: Word[];

  currentPage: number;

  constructor(model: SprintModel, view: SprintView, level = 0, page = 0) {
    super(model, view);

    this.currentLevel = level;
    this.currentPage = page;

    this.mainSetup();

    this.model.bindReRenderPage(this.onReRenderSprintPage);
  }

  mainSetup() {
    this.container = document.querySelector('.main') as HTMLElement;
    this.container.classList.add('sprint');
    this.container.innerHTML = '';
    this.wrapper = this.view.createElement('div', 'sprint__field');
    this.wrapperCard = this.view.createElement('div', '.sprint-content__field');
    this.time = 60;
    this.score = 0;
    this.correctAnswers = [];
    this.incorrectAnswers = [];

    this.renderHeaderStartPage();
    this.renderMainStartPage();
    this.bindLevelSelection();
  }

  ReRenderSprintPage(isAuthorized: boolean) {
    this.view.reRenderBasePage(isAuthorized);
    this.view.footer.remove();
    this.bindBaseEvents();

    this.mainSetup();
  }

  onReRenderSprintPage = async (isAuthorized: boolean) => {
    this.ReRenderSprintPage(isAuthorized);
  };

  renderHeaderStartPage() {
    const sprintHeader = this.view.createElement('div', 'sprint__header');
    sprintHeader.innerHTML = this.view.getHeaderTemplate();
    this.container.appendChild(sprintHeader);
  }

  renderMainStartPage() {
    this.wrapper.innerHTML = this.view.getLevelsNavigationTemplate() + this.view.getButtonsLevelTemplate();
    this.container.appendChild(this.wrapper);
  }

  showPageResultSprint() {
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = this.view.getPageResult(
      this.correctAnswers.length,
      this.incorrectAnswers.length,
      this.score,
    );

    const correctWordsContainer = document.querySelector('.sprint__result-correct-list');
    this.correctAnswers.forEach((word: Word) => {
      const el = document.createElement('div');
      el.innerHTML = this.view.getResultWordTemplate(word);
      correctWordsContainer?.append(el);
    });

    const incorrectWordsContainer = document.querySelector('.sprint__result-incorrect-list');
    this.incorrectAnswers.forEach((word: Word) => {
      const el = document.createElement('div');
      el.innerHTML = this.view.getResultWordTemplate(word);
      incorrectWordsContainer?.append(el);
    });

    document.removeEventListener('keyup', this.keyupHandler);
    this.addPlayWordHandler();
  }

  bindLevelSelection() {
    const btnSelection = document.querySelector('.level_button_container') as HTMLElement;
    btnSelection.addEventListener('click', (e: Event) => {
      this.currentLevel = Number((e.target as HTMLElement).innerHTML) - 1;
      this.model.getWordsForLevel(this.currentLevel, this.currentPage).then(() => {
        this.renderBlockTimer();
        this.renderBlockCard();
        this.startTimer();
      });
    });
  }

  renderBlockTimer() {
    this.wrapper.innerHTML = this.view.getCardTimeTemplate();
    this.container.appendChild(this.wrapper);
    this.updateScore(0);
  }

  renderBlockCard() {
    this.getRandomWord();
    this.wrapperCard.innerHTML = this.view.getCardWordTemplate(this.currentWord);
    this.wrapper.appendChild(this.wrapperCard);
    this.addClickHandler();
  }

  private getRandomWord(): void {
    if (this.correctAnswers.length + this.incorrectAnswers.length === this.currentPage * 20 + 20) {
      this.currentPage++;
      this.model.getWordsForLevel(this.currentLevel, this.currentPage).then(() => {
        this.getRandomWord();
      });
      return;
    }

    const word = this.model.words[Math.floor(Math.random() * this.model.words.length)];
    const word2 = this.model.words[Math.floor(Math.random() * this.model.words.length)];

    const alreadyAnswered = this.correctAnswers.find((element: Word) => {
      if (element.word === word.word) {
        return true;
      }
    });

    const alreadyAnswered2 = this.incorrectAnswers.find((element: Word) => {
      if (element.word === word.word) {
        return true;
      }
    });
    if (alreadyAnswered || alreadyAnswered2) {
      return this.getRandomWord();
    }
    this.correctTranslation = word.wordTranslate;
    if (Math.random() > 0.5) {
      word.wordTranslateOnCard = word2.wordTranslate;
    } else {
      word.wordTranslateOnCard = word.wordTranslate;
    }
    this.currentWord = word;
  }

  startTimer(): void {
    const timerNode = document.getElementById('timer');
    let timerId;
    if (timerNode) {
      timerNode.innerText = `${this.time--}`;
      if (this.time < 0) {
        clearTimeout(timerId);
        this.showPageResultSprint();
      } else {
        timerId = setTimeout(() => {
          this.startTimer();
        }, 1000);
      }
    }
  }

  updateScore(addScore: number) {
    this.score = this.score + addScore;
    const scoreNode = document.getElementById('score');
    if (scoreNode) {
      scoreNode.innerHTML = `${this.score}`;
    }
  }

  private checkAnswer() {}

  addClickHandler() {
    const btnAnswer = document.querySelector('.sprint-content__field__buttons') as HTMLElement;
    btnAnswer.addEventListener(
      'click',

      (event: Event) => {
        const correctPressed = (event.target as HTMLElement).classList.contains('field__btn__true');
        const translateCorrect = this.currentWord.wordTranslateOnCard === this.correctTranslation;
        const answerIsCorrect = (correctPressed && translateCorrect) || (!correctPressed && !translateCorrect);
        if (answerIsCorrect) {
          this.updateScore(10);
          this.correctAnswers.push(this.currentWord);
        } else {
          this.incorrectAnswers.push(this.currentWord);
        }
        this.renderBlockCard();
      },
      { once: true },
    );

    document.addEventListener('keyup', this.keyupHandler);
  }

  keyupHandler = (event: KeyboardEvent) => {
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
      const correctPressed = event.code === 'ArrowRight';
      const translateCorrect = this.currentWord.wordTranslateOnCard === this.correctTranslation;
      const answerIsCorrect = (correctPressed && translateCorrect) || (!correctPressed && !translateCorrect);

      if (answerIsCorrect) {
        this.updateScore(10);
        this.correctAnswers.push(this.currentWord);
      } else {
        this.incorrectAnswers.push(this.currentWord);
      }
      document.removeEventListener('keyup', this.keyupHandler);
      this.renderBlockCard();
    }
  };

  addPlayWordHandler() {
    const resultContainer = document.querySelector('.sprint__result-page') as HTMLElement;
    resultContainer?.addEventListener('click', (e: Event) => {
      const target = e?.target as HTMLElement;
      if (target.classList.contains('icon-audio')) {
        const srcAudio = target.getAttribute('data-audio-src');
        const container = document.querySelector('.audio-container') as HTMLElement;
        container.innerHTML = this.view.getAudioBlock(`${srcAudio}`);
      }
    });
  }
}
