import { BaseView } from './BaseView';

export class TextBookView extends BaseView {
  constructor(isAuthorized: boolean) {
    super(isAuthorized);
    this.renderTextBook(isAuthorized);
  }

  renderTextBook(isAuthorized: boolean) {
    const titles = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2'];
    const container = this.createElement('div', 'textbook-container');

    titles.forEach((title) => {
      const category = this.createElement('div', 'category', title);
      const categoryTitle = this.createElement('span', 'category-title');
      categoryTitle.textContent = title;
      category.append(categoryTitle);

      container.append(category);
    });

    const difficultWords = this.createElement('div', 'difficult-words-category');
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
}
