import rsSchoolLogo from '../assets/images/svg/rs_school_js.svg';
import signInImg from '../assets/images/svg/sign-in-image.svg';
import userAvatar from '../assets/images/svg/user-avatar.svg';
import favicon from '../favicon.ico';
import { User } from '../services/API';

export type MenuItem = {
  itemName: string;
  id: string;
  nestedMenu: MenuItem[] | null;
};

export class BaseView {
  body!: HTMLElement;

  app!: HTMLElement;

  header!: HTMLElement;

  mainMenu!: HTMLElement;

  main!: HTMLElement;

  footer!: HTMLElement;

  authorizationPopUp!: HTMLElement;

  authorizationForm!: HTMLElement;

  authorizationErrorText!: HTMLElement;

  signInButton!: HTMLElement;

  signUpButton!: HTMLElement;

  logOutButton!: HTMLElement;

  user!: HTMLElement;

  constructor(isAuthorized: boolean) {
    this.reRenderBasePage(isAuthorized);
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

  reRenderBasePage(isAuthorized: boolean) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.append(link);

    this.body = this.getElement('body');
    this.body.innerHTML = '';
    this.body.append(this.renderBasePage(isAuthorized));
    if (!isAuthorized) this.body.append(this.renderAuthorizationPopUp());

    this.app = this.getElement('#root');
    this.header = this.getElement('header');
    this.mainMenu = this.getElement('main-menu');
    this.main = this.getElement('main');
    this.footer = this.getElement('footer');

    if (!isAuthorized) {
      this.authorizationPopUp = this.getElement('.authorization-popup');
      this.authorizationForm = this.getElement('.authorization-form');
      this.authorizationErrorText = this.getElement('.authorization-form__error-text');
      this.signInButton = this.getElement('.authorization-form__log-in-button');
      this.signUpButton = this.getElement('.authorization-form__sign-up-button');
    } else {
      this.user = this.getElement('.user');
      this.logOutButton = this.getElement('.logout');
    }
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

      const a = this.createElement('a', item.id) as HTMLAnchorElement;
      a.href = `#${item.id}`;
      a.textContent = item.itemName;

      boarder.append(a);

      if (item.nestedMenu) {
        const nestedMenu = this.createMenu(`${item.id}-menu`, item.nestedMenu);
        nestedMenu.classList.remove('navigation');
        nestedMenu.classList.add('sub-nav', 'un-shown');
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

    const logo = this.createLogo('main-logo', '#mainPage', 'RS Lang');

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
                  id: 'textbook/difficult-words',
                  nestedMenu: null,
                },
              ]
            : null,
        },
        {
          itemName: 'Мини-игры',
          id: 'mainPage/mini-games',
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
          id: 'mainPage/about',
          nestedMenu: null,
        },
      ]),
    );

    container.append(logo, menu);

    if (!isAuthorized) {
      const logInButton = this.createElement('a', 'button', 'log-in-button') as HTMLAnchorElement;
      logInButton.href = '#authorization-popup';
      logInButton.textContent = 'Войти';
      container.append(logInButton);
    } else {
      const user = this.createElement('a', 'user');
      const userImage = this.createImage(userAvatar, 'user-avatar', 'user__avatar');
      const userMenu = this.createElement('nav', 'user__nav-container', 'un-shown');

      const userSettings = this.createElement('div', 'user__settings');
      const bigUserImage = this.createImage(userAvatar, 'user-avatar', 'user__avatar');
      const userSettingsRank = this.createElement('span', 'user__rank');
      userSettingsRank.textContent = 'Пользователь';
      userSettings.append(bigUserImage, userSettingsRank);

      const subNav = this.createMenu('user-menu', [
        {
          itemName: 'Статистика',
          id: 'statistics',
          nestedMenu: null,
        },
        {
          itemName: 'Выход',
          id: 'logout',
          nestedMenu: null,
        },
      ]);
      subNav.classList.add('sub-nav');
      subNav.classList.remove('navigation');

      userMenu.append(userSettings, subNav);
      user.append(userImage, userMenu);
      container.append(user);
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

  CreatePopUp(className: string): HTMLElement {
    const popUp = this.createElement('div', 'popup', className);
    popUp.id = className;

    const popUpArea = this.createElement('a', 'popup__area') as HTMLAnchorElement;
    popUpArea.href = '#header';
    popUp.append(popUpArea);

    const body = this.createElement('div', 'popup__body');
    const content = this.createElement('div', 'popup__content');
    const close = this.createElement('a', 'popup__close', 'authorization-popup__close') as HTMLAnchorElement;
    close.href = `#header`;
    close.textContent = 'X';

    content.append(close);
    body.append(content);
    popUp.append(body);

    return popUp;
  }

  createChangeFormContainer(question: string, buttonText: string): HTMLElement {
    const container = this.createElement('div', 'change-form-container');

    const description = this.createElement('span', 'description');
    description.textContent = question;

    const button = this.createElement('a', 'change-form-container__button');
    button.textContent = buttonText;

    container.append(description, button);
    return container;
  }

  createAuthorizationForm(): HTMLElement {
    const authorizationForm = this.createElement('form', 'authorization-form') as HTMLFormElement;
    authorizationForm.method = 'POST';

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

    const errorText = this.createElement('div', 'authorization-form__error-text');

    const logInButton = this.createElement('button', 'button', 'authorization-form__log-in-button');
    logInButton.textContent = 'Войти';
    const singUpContainer = this.createChangeFormContainer('Нет аккаунта? ', 'Регистрация');
    singUpContainer.classList.add('sign-up-container');

    const SignUpButton = this.createElement('button', 'button', 'authorization-form__sign-up-button', 'un-shown');
    SignUpButton.textContent = 'Зарегистрироваться';
    const logInContainer = this.createChangeFormContainer('Уже есть аккаунт? ', 'Войти');
    logInContainer.classList.add('log-in-container', 'un-shown');

    authorizationForm.append(title, email, password, errorText);
    authorizationForm.append(logInButton, singUpContainer);
    authorizationForm.append(SignUpButton, logInContainer);
    return authorizationForm;
  }

  renderAuthorizationPopUp(): HTMLElement {
    const popUp = this.CreatePopUp('authorization-popup');
    const content = popUp.getElementsByClassName('popup__content')[0];

    const image = this.createImage(signInImg, 'sign-in-image', 'sign-in-image');
    const AuthorizationForm = this.createAuthorizationForm();

    content.append(image, AuthorizationForm);
    return popUp;
  }

  changeAuthorizationErrorText(newErrorText: string) {
    this.authorizationErrorText.textContent = newErrorText;
  }

  changeAuthorizationForm(target: HTMLElement) {
    const logInButton = this.authorizationForm?.querySelector('.authorization-form__log-in-button');
    const signUpContainer = this.authorizationForm?.querySelector('.sign-up-container');
    const signUpButton = this.authorizationForm?.querySelector('.authorization-form__sign-up-button');
    const logInContainer = this.authorizationForm?.querySelector('.log-in-container');

    if (target.closest('.sign-up-container')) {
      logInButton?.classList.add('un-shown');
      signUpContainer?.classList.add('un-shown');

      signUpButton?.classList.remove('un-shown');
      logInContainer?.classList.remove('un-shown');
    } else if (target.closest('.log-in-container')) {
      signUpButton?.classList.add('un-shown');
      logInContainer?.classList.add('un-shown');

      logInButton?.classList.remove('un-shown');
      signUpContainer?.classList.remove('un-shown');
    }
  }

  bindChangeAuthorizationForm(handler: (container: HTMLElement) => void) {
    this.authorizationForm?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('change-form-container__button')) {
        handler(target);
      }
    });
  }

  blurInputAction(input: HTMLInputElement) {
    if ((input as HTMLInputElement).value) {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  }

  bindBlurInputAction(handler: (target: HTMLInputElement) => void) {
    const inputs = this.authorizationForm.querySelectorAll('.authorization-form__input');

    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        handler(input as HTMLInputElement);
      });
    });
  }

  bindMouseEventToNavItem(isAuthorized: boolean) {
    const targets = [...this.header.querySelectorAll('.navigation .nav-item')];
    if (isAuthorized) targets.push(this.header.querySelector('.user') as Element);

    targets.forEach((target) => {
      target.addEventListener('mouseover', () => {
        if (target.classList.contains('nav-item')) {
          const ul = target.querySelector('ul');
          ul?.classList.remove('un-shown');
        } else if (target.classList.contains('user')) {
          const nav = target.querySelector('nav');
          nav?.classList.remove('un-shown');
        }
      });
    });

    targets.forEach((target) => {
      target.addEventListener('mouseout', () => {
        if (target.classList.contains('nav-item')) {
          const ul = target.querySelector('ul');
          ul?.classList.add('un-shown');
        } else if (target.classList.contains('user')) {
          const nav = target.querySelector('nav');
          nav?.classList.add('un-shown');
        }
      });
    });
  }

  bindSignInUser(handler: (user: User) => void) {
    this.authorizationForm?.addEventListener('submit', (event) => {
      event.preventDefault();

      if (event.submitter === this.signInButton) {
        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
        handler(formData as User);
      }
    });
  }

  bindSignUpUser(handler: (user: User) => void) {
    this.authorizationForm?.addEventListener('submit', (event) => {
      event.preventDefault();

      if (event.submitter === this.signUpButton) {
        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
        handler(formData as User);
      }
    });
  }

  bindLogOutUser(handler: () => void) {
    this.header?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target === this.logOutButton) {
        handler();
      }
    });
  }
}
