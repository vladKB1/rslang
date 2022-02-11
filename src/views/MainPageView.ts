import { BaseView } from './BaseView';

export type TeamMate = {
  photo: string;
  name: string;
  gitHub: string;
  about: string;
};

export class MainPageView extends BaseView {
  constructor() {
    super();
    this.renderMainPage();
  }

  createSectionRsLang(): HTMLElement {
    const div = this.createElement('div', 'container');

    const textBlock = this.createElement('div', 'textBlock');
    const title = this.createElement('h1');
    title.textContent = 'RS LANG IS THE MOST POWERFUL WAY TO LEARN ENGLISH';
    const description = this.createElement('p');
    description.textContent =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin condimentum turpis, diam fermentum nibh volutpat egestas ac vestibulum natoque nostra. Eros bibendum dictum ligula per vel suscipit tempus class turpis mattis nulla, euismod morbi condimentum maximus ac nascetur non curae vitae ornare, sit sed sem nec potenti urna sapien efficitur scelerisque conubia.';
    const logInButton = this.createElement('button', 'logInButton');
    logInButton.textContent = 'Войти';

    textBlock.append(title, description, logInButton);
    div.append(textBlock);

    const imageBlock = this.createElement('div', 'imageBlock');
    const image = this.createElement('img') as HTMLImageElement;
    image.src = '../../public/assets/images';
    image.alt = 'image';

    imageBlock.append(image);
    div.append(imageBlock);

    return div;
  }

  createSectionMiniGames(): HTMLElement {
    const div = this.createElement('div', 'container');

    const description = this.createElement('div', 'mini-games-description');
    const p = this.createElement('p');
    p.textContent =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit et, posuere egestas ac cras nullam curae efficitur accumsan eros, tellus penatibus aliquam phasellus maximus aliquet nisi. Efficitur neque ridiculus amet hendrerit ex natoque parturient gravida at fringilla, condimentum imperdiet accumsan mollis eros proin himenaeos bibendum felis nisi, mus placerat commodo elementum feugiat orci justo platea nam. Consectetur mus turpis quis eleifend nullam velit quisque netus risus nisi sagittis felis ornare himenaeos phasellus, mi enim venenatis aenean senectus convallis sed est nam dignissim taciti ut placerat eget.';
    description.append(p);

    const sprintGame = this.createElement('div', 'game-card');
    let title = this.createElement('h3', 'game-card-title');
    title.textContent = 'Спринт';
    sprintGame.append(title);

    const audioGame = this.createElement('div', 'game-card');
    title = this.createElement('h3', 'game-card-title');
    title.textContent = 'Аудиовызов';
    sprintGame.append(title);

    div.append(description, sprintGame, audioGame);
    return div;
  }

  createTeamMate(teamMate: TeamMate): HTMLElement {
    const container = this.createElement('div', 'teammeat-container');

    const photo = this.createElement('div', 'teammate-img');
    const image = this.createElement('img') as HTMLImageElement;
    image.src = teamMate.photo;
    image.alt = teamMate.name;
    photo.append(image);

    const teamMateName = this.createElement('div', 'teammate-name');
    const a = this.createElement('a') as HTMLAnchorElement;
    a.href = teamMate.gitHub;
    a.textContent = teamMate.name;
    teamMateName.append(a);

    const about = this.createElement('div', 'teammate-about');
    const p = this.createElement('p');
    p.textContent = teamMate.about;
    about.append(p);

    container.append(photo, teamMateName, about);
    return container;
  }

  createSectionAboutUs(): HTMLElement {
    const div = this.createElement('div', 'container');
    const title = this.createElement('h2', 'about-us-title');
    title.textContent = 'О команде';
    div.append(title);

    div.append(
      this.createTeamMate({
        photo: '../../public/assets/aboutUs/vladKB1',
        name: 'Влад',
        gitHub: 'https://github.com/vladKB1',
        about: 'Главная страница, авторизация, учебник, статистика',
      }),
    );
    div.append(
      this.createTeamMate({
        photo: '../../public/assets/aboutUs/Tsvetinskaya-L',
        name: 'Лидия',
        gitHub: 'https://github.com/Tsvetinskaya-L',
        about: 'Мини-игра "Спринт"',
      }),
    );
    div.append(
      this.createTeamMate({
        photo: '../../public/assets/aboutUs/AntonKos',
        name: 'Антон',
        gitHub: 'https://github.com/AntonKos',
        about: 'Мини-игра "Аудиовызов"',
      }),
    );

    return div;
  }

  renderMainPage(): void {
    const sectionRsLang = this.createElement('section', 'rslang-description');
    sectionRsLang.append(this.createSectionRsLang());
    this.main.append(sectionRsLang);

    const sectionMiniGames = this.createElement('section', 'mini-games');
    sectionMiniGames.id = 'mini-games';
    sectionMiniGames.append(this.createSectionMiniGames());
    this.main.append(sectionMiniGames);

    const sectionAboutUs = this.createElement('section', 'about-us');
    sectionAboutUs.id = 'aboutUs';
    sectionAboutUs.append(this.createSectionAboutUs());
    this.main.append(sectionAboutUs);
  }
}
