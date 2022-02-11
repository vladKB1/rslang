export type MenuItem = {
  itemName: string;
  id: string;
  nestedMenu: MenuItem[] | null;
};

export class BaseView {
  body: HTMLElement;

  app: HTMLElement;

  constructor() {
    this.body = this.getElement('body') as HTMLElement;
    this.body.innerHTML = '';
    this.body.append(this.renderBasePage());

    this.app = this.getElement('#root') as HTMLElement;
  }

  createElement(tag: string, className?: string): Element {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);

    return element as HTMLElement;
  }

  createLogo(className: string, href: string, title: string): HTMLElement {
    const logo = this.createElement('a', className) as HTMLAnchorElement;
    logo.href = href;

    const img = this.createElement('div', `${className}-img`) as HTMLElement;
    const txt = this.createElement('span', `${className}-txt`) as HTMLSpanElement;
    txt.textContent = title;

    logo.append(img, txt);
    return logo as HTMLElement;
  }

  createMenu(className: string, items: MenuItem[]): HTMLElement {
    const menu = this.createElement('ul', className);

    items.forEach((item) => {
      const li = this.createElement('li') as HTMLLIElement;
      const div = this.createElement('div');

      const a = this.createElement('a') as HTMLAnchorElement;
      a.id = item.id;
      a.textContent = item.itemName;

      div.append(a);
      if (item.nestedMenu) {
        const nestedMenu = this.createMenu(`${item.id}-menu`, item.nestedMenu) as HTMLElement;
        nestedMenu.classList.add('hidden');
        div.append(nestedMenu);
      }

      li.append(div);
      menu.append(li);
    });

    return menu as HTMLElement;
  }

  createHeader(): HTMLElement {
    const header = this.createElement('header', 'header');
    header.id = 'header';

    const logo = this.createLogo('main-logo', '#header', 'RS Lang');

    const menu = this.createElement('nav', 'header-nav-container');
    menu.append(
      this.createMenu('main-menu', [
        {
          itemName: 'Учебник',
          id: 'textbook',
          nestedMenu: null,
        },
        {
          itemName: 'Мини-игры',
          id: 'mini-games',
          nestedMenu: [
            {
              itemName: 'Аудиовызов',
              id: 'game-audio',
              nestedMenu: null,
            },
            {
              itemName: 'Спринт',
              id: 'game-sprint',
              nestedMenu: null,
            },
          ],
        },
      ]),
    );

    const logInButton = this.createElement('button', 'log-in-button');
    logInButton.textContent = 'Войти';

    const div = this.createElement('div');
    div.append(logo, menu);

    header.append(div, logInButton);

    return header as HTMLElement;
  }

  renderBasePage(): HTMLElement {
    const BasePage = this.createElement('div');
    BasePage.id = 'root';

    BasePage.append(this.createHeader());

    return BasePage as HTMLElement;
  }
}
