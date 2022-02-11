export type MenuItem = {
  itemName: string;
  id: string;
  nestedMenu: MenuItem[] | null;
};

export class BaseView {
  body: HTMLElement;

  app: HTMLElement;

  header: HTMLElement;

  mainMenu: HTMLElement;

  main: HTMLElement;

  footer: HTMLElement;

  constructor() {
    this.body = this.getElement('body');
    this.body.innerHTML = '';
    this.body.append(this.renderBasePage());

    this.app = this.getElement('#root');
    this.header = this.getElement('header');
    this.mainMenu = this.getElement('main-menu');
    this.main = this.getElement('main');
    this.footer = this.getElement('footer');
  }

  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    return element as HTMLElement;
  }

  createLogo(className: string, href: string, title?: string): HTMLElement {
    const logo = this.createElement('a', className) as HTMLAnchorElement;
    logo.href = href;

    const img = this.createElement('div', `${className}-img`);
    logo.append(img);

    if (title != undefined) {
      const txt = this.createElement('span', `${className}-txt`);
      txt.textContent = title;
      logo.append(txt);
    }

    return logo;
  }

  createMenu(className: string, items: MenuItem[]): HTMLElement {
    const menu = this.createElement('ul', className);

    items.forEach((item) => {
      const li = this.createElement('li');
      const div = this.createElement('div');

      const a = this.createElement('a') as HTMLAnchorElement;
      a.id = item.id;
      a.href = `#${item.id}`;
      a.textContent = item.itemName;

      div.append(a);

      if (item.nestedMenu) {
        const nestedMenu = this.createMenu(`${item.id}-menu`, item.nestedMenu);
        nestedMenu.classList.add('hidden');
        div.append(nestedMenu);
      }

      li.append(div);
      menu.append(li);
    });

    return menu;
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
        {
          itemName: 'О команде',
          id: 'aboutUs',
          nestedMenu: null,
        },
      ]),
    );

    const logInButton = this.createElement('button', 'log-in-button');
    logInButton.textContent = 'Войти';

    const div = this.createElement('div');
    div.append(logo, menu);

    header.append(div, logInButton);

    return header;
  }

  createFooter(): HTMLElement {
    const footer = this.createElement('footer', 'footer');

    const copyright = this.createElement('div', 'copyright');
    const span = this.createElement('span');
    span.textContent = '© 2022 RS LANG';
    copyright.append(span);

    const gitHub = this.createElement('div', 'github');
    const team = ['vladKB1', 'Tsvetinskaya-L', 'AntonKos'];
    gitHub.append(
      ...team.map((teammate) => {
        const a = this.createElement('a') as HTMLAnchorElement;
        a.textContent = teammate;
        a.href = `https://github.com/${teammate}`;
        return a;
      }),
    );

    const logo = this.createLogo('rs-school-logo', 'https://rs.school/js/');

    footer.append(copyright, gitHub, logo);

    return footer;
  }

  renderBasePage(): HTMLElement {
    const BasePage = this.createElement('div');
    BasePage.id = 'root';

    BasePage.append(this.createHeader());
    BasePage.append(this.createElement('main', 'main'));
    BasePage.append(this.createFooter());

    return BasePage;
  }
}
