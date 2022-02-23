import { BaseView } from './BaseView';

import backgroundImageSource from '../assets/images/svg/description-main.svg';
import textBookImg from '../assets/images/svg/description-text-book.svg';
import sprintImg from '../assets/images/svg/sprint.svg';
import audioCallImg from '../assets/images/svg/audiocall.svg';
import vladKB1 from '../assets/images/svg/vladKB1-avatar.svg';
import AntonKos from '../assets/images/svg/AntonKos-avatar.svg';
import Tsvetinskaya from '../assets/images/svg/Tsvetinskaya-L-avatar.svg';

export type TeamMate = {
  photo: string;
  name: string;
  gitHub: string;
  about: string;
};

export class MainPageView extends BaseView {
  constructor(isAuthorized: boolean) {
    super(isAuthorized);
    this.renderMainPage(isAuthorized);
  }

  createSectionRsLang(isAuthorized: boolean): HTMLElement {
    const container = this.createElement('div', 'container', 'description-container');

    const text = this.createElement('div', 'text');
    const title = this.createElement('h1', 'title', 'main-title');
    title.textContent = 'RS Lang school';
    const description = this.createElement('p', 'description', 'main-description');
    description.textContent =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin condimentum turpis, diam fermentum nibh volutpat egestas ac vestibulum.';

    text.append(title, description);

    if (!isAuthorized) {
      const logInButton = this.createElement('a', 'button', 'log-in-button') as HTMLAnchorElement;
      logInButton.href = '#authorization-popup';
      logInButton.textContent = 'Войти';
      text.append(logInButton);
    }

    container.append(text);
    return container;
  }

  createSectionTextBook(): HTMLElement {
    const container = this.createElement('div', 'container', 'description-text-book-container');
    const textBook = this.createImage(textBookImg, 'text-book', 'text-book-img');

    const descriptionTextBook = this.createElement('div', 'description-text-book');

    const title = this.createElement('h1', 'title', 'text-book-title');
    title.textContent = 'Наш учебник';

    const p = this.createElement('p', 'description');
    p.textContent =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin condimentum turpis, diam fermentum nibh volutpat egestas ac vestibulum. Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin condimentum turpis, diam fermentum nibh volutpat egestas ac vestibulum.Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin condimentum turpis, diam fermentum nibh volutpat egestas ac vestibulum.';

    descriptionTextBook.append(title, p);
    container.append(textBook, descriptionTextBook);

    return container;
  }

  createSectionMiniGames(): HTMLElement {
    const div = this.createElement('div', 'container', 'mini-games-container');

    const MiniGamesTitle = this.createElement('h1', 'title', 'mini-games-title');
    MiniGamesTitle.textContent = 'Мини-игры';

    const description = this.createElement('div', 'mini-games-description');
    const p1 = this.createElement('p', 'description');
    const p2 = this.createElement('p', 'description');
    const p3 = this.createElement('p', 'description');
    const p4 = this.createElement('p', 'description');
    p1.textContent =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit et, posuere egestas ac cras nullam curae efficitur accumsan eros, tellus penatibus aliquam phasellus maximus aliquet nisi.';
    p2.textContent =
      'Efficitur neque ridiculus amet hendrerit ex natoque parturient gravida at fringilla, condimentum imperdiet accumsan mollis eros proin himenaeos bibendum felis nisi, mus placerat commodo elementum feugiat orci justo platea nam.';
    p3.textContent =
      'Consectetur mus turpis quis eleifend nullam velit quisque netus risus nisi sagittis felis ornare himenaeos phasellus, mi enim venenatis aenean senectus convallis sed est nam dignissim taciti ut placerat eget.';
    p4.textContent =
      'Consectetur mus turpis quis eleifend nullam velit quisque netus risus nisi sagittis felis ornare himenaeos phasellus, mi enim venenatis aenean senectus convallis sed est nam dignissim taciti ut placerat eget.';
    description.append(MiniGamesTitle, p1, p2, p3, p4);

    const games = this.createElement('div', 'games');

    const sprintGame = this.createElement('a', 'game-card', 'sprint') as HTMLAnchorElement;
    sprintGame.href = '#game-sprint';
    let title = this.createElement('h2', 'game-card-title');
    let image = this.createImage(sprintImg, 'sprintImg', 'game-card-img', 'sprint__img');
    title.textContent = 'Спринт';
    sprintGame.append(title, image);

    const audioGame = this.createElement('a', 'game-card', 'audio-call') as HTMLAnchorElement;
    audioGame.href = '#game-audio';
    title = this.createElement('h2', 'game-card-title');
    image = this.createImage(audioCallImg, 'audioCallImg', 'game-card-img', 'audio-call__img');
    title.textContent = 'Аудиовызов';
    audioGame.append(title, image);

    games.append(sprintGame, audioGame);

    div.append(description, games);

    return div;
  }

  createTeamMate(teamMate: TeamMate): HTMLElement {
    const container = this.createElement('div', 'teammate-container');

    const photo = this.createElement('div', 'teammate-img');
    const image = this.createElement('img') as HTMLImageElement;
    image.src = teamMate.photo;
    image.alt = teamMate.name;
    photo.append(image);

    const teamMateName = this.createElement('div', 'title', 'teammate-name');
    const a = this.createElement('a') as HTMLAnchorElement;
    a.href = teamMate.gitHub;
    a.textContent = teamMate.name;
    teamMateName.append(a);

    const about = this.createElement('div', 'description', 'teammate-about');
    const p = this.createElement('p');
    p.textContent = teamMate.about;
    about.append(p);

    container.append(photo, teamMateName, about);
    return container;
  }

  createSectionAboutUs(): HTMLElement {
    const container = this.createElement('div', 'container', 'about-us-container');
    const title = this.createElement('h1', 'title', 'about-us-title');
    title.textContent = 'НАД ПРОЕКТОМ РАБОТАЛИ';

    const about = this.createElement('div', 'about-us');
    about.append(
      this.createTeamMate({
        photo: vladKB1,
        name: 'Владислав',
        gitHub: 'https://github.com/vladKB1',
        about: 'Главная страница, авторизация, учебник, статистика',
      }),
    );
    about.append(
      this.createTeamMate({
        photo: Tsvetinskaya,
        name: 'Лидия',
        gitHub: 'https://github.com/Tsvetinskaya-L',
        about: 'Мини-игра "Спринт"',
      }),
    );
    about.append(
      this.createTeamMate({
        photo: AntonKos,
        name: 'Антон',
        gitHub: 'https://github.com/AntonKos',
        about: 'Мини-игра "Аудиовызов"',
      }),
    );

    container.append(title, about);
    return container;
  }

  async renderMainPage(isAuthorized: boolean) {
    const sectionRsLang = this.createElement('section', 'rslang-description');
    sectionRsLang.id = 'mainPage';
    const backgroundImage = this.createImage(backgroundImageSource, '', 'description-background-img');

    sectionRsLang.append(backgroundImage, this.createSectionRsLang(isAuthorized));
    this.main.append(sectionRsLang);

    const sectionTextBook = this.createElement('section', 'section-text-book');
    sectionTextBook.append(this.createSectionTextBook());
    this.main.append(sectionTextBook);

    const sectionMiniGames = this.createElement('section', 'mini-games');
    sectionMiniGames.id = 'mainPage/mini-games';
    sectionMiniGames.append(this.createSectionMiniGames());
    this.main.append(sectionMiniGames);

    const sectionAboutUs = this.createElement('section', 'about-us');
    sectionAboutUs.id = 'mainPage/about';
    sectionAboutUs.append(this.createSectionAboutUs());
    this.main.append(sectionAboutUs);
  }

  async reRenderMainPage(isAuthorized: boolean) {
    await this.reRenderBasePage(isAuthorized);
    await this.renderMainPage(isAuthorized);
  }
}
