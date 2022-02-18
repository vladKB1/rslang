import rsSchoolLogo from '../assets/images/svg/rs_school_js.svg';
import signInImg from '../assets/images/svg/sign-in-image.svg';

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

  constructor(isAuthorized: boolean) {
    this.body = this.getElement('body');
    this.body.innerHTML = '';
    this.body.append(this.renderBasePage(isAuthorized));

    this.app = this.getElement('#root');
    this.header = this.getElement('header');
    this.mainMenu = this.getElement('main-menu');
    this.main = this.getElement('main');
    this.footer = this.getElement('footer');
  }

  createElement(tag: string, ...classNames: string[]): HTMLElement {
    const element = document.createElement(tag);
    if (classNames?.length) element.classList.add(...(classNames as string[]));
    return element;
  }

  createImage(src: string, alt: string, ...classNames: string[]): HTMLImageElement {
    const img = this.createElement('img', ...classNames) as HTMLImageElement;
    img.src = src;
    img.alt = alt;
    return img;
  }

  getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    return element as HTMLElement;
  }

  createLogo(className: string, href: string, title?: string): HTMLElement {
    const logo = this.createElement('a', className) as HTMLAnchorElement;
    logo.href = href;

    if (title != undefined) {
      const txt = this.createElement('span', `${className}-txt`);
      txt.textContent = title;
      logo.append(txt);
    }

    return logo;
  }

  createMenu(className: string, items: MenuItem[]): HTMLElement {
    const menu = this.createElement('ul', 'navigation', className);

    items.forEach((item) => {
      const li = this.createElement('li');
      const boarder = this.createElement('div', 'nav-item');

      const a = this.createElement('a') as HTMLAnchorElement;
      a.id = item.id;
      a.href = `#${item.id}`;
      a.textContent = item.itemName;

      boarder.append(a);

      if (item.nestedMenu) {
        const nestedMenu = this.createMenu(`${item.id}-menu`, item.nestedMenu);
        nestedMenu.classList.add('sub-nav', 'hidden');
        boarder.append(nestedMenu);
      }

      li.append(boarder);
      menu.append(li);
    });

    return menu;
  }

  createHeader(isAuthorized: boolean): HTMLElement {
    const header = this.createElement('header', 'header');
    header.id = 'header';
    const container = this.createElement('div', 'container', 'header-container');

    const logo = this.createLogo('main-logo', '#header', 'RS Lang');

    const menu = this.createElement('nav', 'header-nav-container');
    menu.append(
      this.createMenu('main-menu', [
        {
          itemName: 'Учебник',
          id: 'textbook',
          nestedMenu: isAuthorized
            ? [
                {
                  itemName: 'Сложные слова',
                  id: 'text-book-difficult-words',
                  nestedMenu: null,
                },
              ]
            : null,
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

    container.append(logo, menu);

    if (!isAuthorized) {
      const logInButton = this.createElement('button', 'button', 'log-in-button');
      logInButton.textContent = 'Войти';
      container.append(logInButton);
    }

    header.append(container);

    return header;
  }

  createFooter(): HTMLElement {
    const footer = this.createElement('footer', 'footer');
    const container = this.createElement('div', 'container', 'footer-container');

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

    const logo = this.createElement('a', 'rs-school-logo') as HTMLAnchorElement;
    logo.href = 'https://rs.school/js/';
    const img = this.createImage(rsSchoolLogo, 'rs-school', 'rs-school-logo-img');
    logo.append(img);

    container.append(copyright, gitHub, logo);
    footer.append(container);

    return footer;
  }

  renderBasePage(isAuthorized: boolean): HTMLElement {
    const BasePage = this.createElement('div');
    BasePage.id = 'root';

    BasePage.append(this.createHeader(isAuthorized));
    BasePage.append(this.createElement('main', 'main'));
    BasePage.append(this.createFooter());

    return BasePage;
  }

  closePopUp(popUp: HTMLElement) {
    popUp.classList.add('hidden');
    popUp.remove();
  }

  CreatePopUp(className: string): HTMLElement {
    const popUp = this.createElement('div', 'popup', className, 'hidden');

    popUp.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target?.closest('.popup__content')) {
        this.closePopUp(target?.closest('.popup') as HTMLElement);
      }
    });

    const body = this.createElement('div', 'popup__body');
    const content = this.createElement('div', 'popup__content');
    const close = this.createElement('a', 'popup__close', 'authorization-popup__close') as HTMLAnchorElement;
    close.href = `#header`;
    close.textContent = 'X';

    close.addEventListener('click', (event) => {
      this.closePopUp(close.closest('.popup') as HTMLElement);
      event.preventDefault();
    });

    content.append(close);
    body.append(content);
    popUp.append(body);

    return popUp;
  }

  createAuthorizationForm(): HTMLElement {
    const authorizationForm = this.createElement('form', 'authorization-form');

    const title = this.createElement('h1', 'title', 'authorization-form__title');
    title.textContent = 'Добро пожаловать!';

    const email = this.createElement('div', 'authorization-form__input-container', 'email');
    const emailInput = this.createElement('input', 'authorization-form__input', 'email__input') as HTMLInputElement;
    emailInput.type = 'text';
    emailInput.name = 'email';
    const emailPlaceHolder = this.createElement('span', 'email-place-older', 'focus-place-holder');
    emailPlaceHolder.setAttribute('data-placeholder', 'Почта');
    email.append(emailInput, emailPlaceHolder);

    const password = this.createElement('div', 'authorization-form__input-container', 'password');
    const passwordInput = this.createElement(
      'input',
      'authorization-form__input',
      'password__input',
    ) as HTMLInputElement;
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    const passwordPlaceHolder = this.createElement('span', 'password-place-holder', 'focus-place-holder');
    passwordPlaceHolder.setAttribute('data-placeholder', 'Пароль');
    password.append(passwordInput, passwordPlaceHolder);

    const logInButton = this.createElement('button', 'button', 'authorization-form__log-in-button');
    logInButton.textContent = 'Войти';

    const singUpContainer = this.createElement('div', 'sing-up-container');
    const description = this.createElement('span', 'description');
    description.textContent = 'Нет аккаунта? ';
    const singUpButton = this.createElement('a', 'sing-up-container__button');
    singUpButton.textContent = 'Регистрация';
    singUpContainer.append(description, singUpButton);

    authorizationForm.append(title, email, password, logInButton, singUpContainer);
    return authorizationForm;
  }

  renderAuthorizationPopUp() {
    const popUp = this.CreatePopUp('authorization-popup');
    const content = popUp.getElementsByClassName('popup__content')[0];

    const image = this.createImage(signInImg, 'sign-in-image', 'sign-in-image');
    const AuthorizationForm = this.createAuthorizationForm();

    content.append(image, AuthorizationForm);

    this.body.append(popUp);

    popUp.classList.remove('hidden');
  }

  bindRenderAuthorizationPopUp(handler: () => void) {
    this.header?.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).className === 'button log-in-button') {
        handler();
      }
    });
  }
}
