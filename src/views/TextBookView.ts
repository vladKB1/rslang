import { BaseView } from './BaseView';

export class TextBookView extends BaseView {
  constructor(isAuthorized: boolean, category?: number | null, page?: number | null) {
    super(isAuthorized);

    if (!category || !page) {
      this.renderTextBook(isAuthorized);
    } else {
      this.renderTextBookCategory(isAuthorized, category as number, page as number);
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
      const description = this.createElement('span', 'description');
      description.textContent = 'Доступно только для авторизованных пользователей.';
      difficultWords.append(description);
    }

    container.append(difficultWords);
    this.main.append(container);
  }

  renderTextBookCategory(isAuthorized: boolean, category: number, page: number) {
    this.main.classList.add('textbook-page');
    const container = this.createElement('div', 'categoryPage');
    container.append(`isAuthorized: ${isAuthorized};\nCategory: ${category};\nPage: ${page};\n`);
    this.main.append(container);
  }
}
