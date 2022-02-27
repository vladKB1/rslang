import { Word } from '../services/API';
import { BaseView } from './BaseView';

export class TextBookView extends BaseView {
  textBook!: HTMLElement;

  container!: HTMLElement;

  constructor(words: Word[], isAuthorized: boolean, category: number | null, page: number | null) {
    super(isAuthorized);
    if (!category || !page) {
      this.renderTextBook(isAuthorized);
    } else {
      this.renderTextBookCategory(words, isAuthorized, category as number, page as number);
      this.renderPagination(30, category, page);
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

  renderTextBookCategory(words: Word[], isAuthorized: boolean, category: number, page: number) {
    this.main.classList.add('textbook-page');
    const container = this.createElement('div', 'categoryPage');
    words.forEach((word) => {
      const p = this.createElement('p', 'word');
      p.textContent = word.word;
      container.append(p);
    });
    console.log(isAuthorized, category, page);

    this.main.append(container);
  }
}
