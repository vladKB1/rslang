import { Word, baseUrl } from '../services/API';
import { BaseView } from './BaseView';

export class TextBookView extends BaseView {
  textBook!: HTMLElement;

  container!: HTMLElement;

  constructor(words: Word[], isAuthorized: boolean, category: number | null, page: number | null) {
    super(isAuthorized);
    this.footer.remove();

    if (!category || !page) {
      this.renderTextBook(isAuthorized);
    } else {
      this.renderTextBookCategory(words, isAuthorized, category as number, page as number);
      if (category !== 7) this.renderPagination(30, category, page);
    }
  }

  renderTextBook(isAuthorized: boolean) {
    this.main.classList.add('textbook-page');
    const titles = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2'];
    const container = this.createElement('div', 'textbook-container');

    titles.forEach((title, index) => {
      const category = this.createElement('a', 'category', title) as HTMLAnchorElement;
      category.id = index.toString();
      category.href = `#textbook/${index + 1}/1`;
      const categoryTitle = this.createElement('span', 'category-title');
      categoryTitle.textContent = title;
      category.append(categoryTitle);

      container.append(category);
    });

    const difficultWords = this.createElement('a', 'difficult-words-category') as HTMLAnchorElement;
    difficultWords.id = '7';
    difficultWords.href = `#textbook/${7}/1`;
    const title = this.createElement('span', 'category-title');
    title.textContent = 'Сложные слова';
    difficultWords.append(title);

    if (!isAuthorized) {
      difficultWords.classList.add('disabled');
      difficultWords.href = '#textbook';
      const description = this.createElement('span', 'description');
      description.textContent = 'Доступно только для авторизованных пользователей.';
      difficultWords.append(description);
    }

    container.append(difficultWords);
    this.main.append(container);
  }

  createWordCard(word: Word): HTMLElement {
    const wordCard = this.createElement('div', 'word-card');
    wordCard.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${baseUrl}/${word.image}") center/cover no-repeat`;

    const wrapperTitle = this.createElement('div', 'word-card__wrapper-title');

    const title = this.createElement('h2', 'word-card__title');
    title.textContent = word.word;

    const translationBlock = this.createElement('div', 'word-card__translation-block');
    const translation = this.createElement('h3', 'word-card__translation');
    translation.innerHTML = word.wordTranslate;
    const transcription = this.createElement('h3', 'word-card__transcription');
    transcription.innerHTML = word.transcription;
    const playAudioButton = this.createElement('div', 'word-card__play-audio-button');
    translationBlock.append(translation, transcription, playAudioButton);

    wrapperTitle.append(title, translationBlock);

    const wrapprerDescription = this.createElement('div', 'word-card__wrapper-description');

    const meaningBlock = this.createElement('div', 'word-card__meaning-block');
    const meaningEnglish = this.createElement('h4', 'word-card__meaning-text');
    meaningEnglish.innerHTML = word.textMeaning;
    const meaningRussian = this.createElement('h4', 'word-card__meaning-text');
    meaningRussian.innerHTML = word.textMeaningTranslate;
    meaningBlock.append(meaningEnglish, meaningRussian);

    const line = this.createElement('div', 'line');

    const exampleBlock = this.createElement('div', 'word-card__example-block');
    const exampleEnglish = this.createElement('h4', 'word-card__example-text');
    exampleEnglish.innerHTML = word.textExample;
    const exampleRussian = this.createElement('h4', 'word-card__example-text');
    exampleRussian.innerHTML = word.textExampleTranslate;
    exampleBlock.append(exampleEnglish, exampleRussian);

    wrapprerDescription.append(meaningBlock, line, exampleBlock);

    wordCard.append(wrapperTitle, wrapprerDescription);
    return wordCard;
  }

  renderTextBookCategory(words: Word[], isAuthorized: boolean, category: number, page: number) {
    this.main.classList.add('textbook-page');
    const container = this.createElement('div', 'categoryPage');

    console.log(words.length);
    words.forEach((word) => {
      console.log(word);
      const p = this.createElement('p', 'word');
      p.textContent = word.word;
      container.append(this.createWordCard(word));
    });

    this.main.append(container);
  }

  renderPagination(pages: number, currentCategory: number, currentPage: number) {
    //TODO: replace numbers to constants
    const container = this.createElement('div', 'pagination-container');
    const pagination = this.createElement('div', 'pagination');

    const ArrowLeft = this.createElement('a', 'pagination__list-item', 'pagination__arrow') as HTMLAnchorElement;
    ArrowLeft.textContent = '<';
    if (currentPage === 1) {
      ArrowLeft.classList.add('not-active-arrow');
    } else {
      ArrowLeft.href = `#textbook/${currentCategory}/${currentPage - 1}`;
    }

    const ArrowRight = this.createElement('a', 'pagination__list-item', 'pagination__arrow') as HTMLAnchorElement;
    ArrowRight.textContent = '>';
    if (currentPage === 30) {
      ArrowRight.classList.add('not-active-arrow');
    } else {
      ArrowRight.href = `#textbook/${currentCategory}/${currentPage + 1}`;
    }

    const paginationList = this.createElement('div', 'pagination__list');
    const endPage = Math.min(currentPage + 4, 30);

    for (let i = Math.min(currentPage, 25); i <= endPage; i++) {
      const page = this.createElement('a', 'pagination__list-item') as HTMLAnchorElement;
      page.href = `#textbook/${currentCategory}/${i}`;
      page.textContent = i.toString();
      paginationList.append(page);

      if (i === currentPage) {
        page.classList.add('active-page');
      }
    }
    if (currentPage <= 3) {
      for (let i = currentPage - 1; i >= 1; i--) {
        const page = this.createElement('a', 'pagination__list-item') as HTMLAnchorElement;
        page.href = `#textbook/${currentCategory}/${i}`;
        page.textContent = i.toString();
        paginationList.prepend(page);
      }
    } else if (currentPage > 3) {
      const dots = this.createElement('div', 'pagination__list-dots') as HTMLAnchorElement;
      dots.textContent = '...';
      paginationList.prepend(dots);
      const page = this.createElement('a', 'pagination__list-item') as HTMLAnchorElement;
      page.href = `#textbook/${currentCategory}/1`;
      page.textContent = '1';
      paginationList.prepend(page);
    }

    if (endPage >= 28) {
      for (let i = endPage + 1; i <= 30; i++) {
        const page = this.createElement('a', 'pagination__list-item') as HTMLAnchorElement;
        page.href = `#textbook/${currentCategory}/${i}`;
        page.textContent = i.toString();
        paginationList.append(page);
      }
    } else if (currentPage < 28) {
      const dots = this.createElement('div', 'pagination__list-dots') as HTMLAnchorElement;
      dots.textContent = '...';
      paginationList.append(dots);
      const page = this.createElement('a', 'pagination__list-item') as HTMLAnchorElement;
      page.href = `#textbook/${currentCategory}/30`;
      page.textContent = '30';
      paginationList.append(page);
    }

    pagination.append(ArrowLeft, paginationList, ArrowRight);
    container.append(pagination);
    this.main.append(container);
  }
}
