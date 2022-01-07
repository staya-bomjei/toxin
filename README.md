# toxin

## Описание проекта
Второе задание из обучающей программы MetaLamp.

Проект представляет из себя вёрстку страниц из [**макета**](https://www.figma.com/file/MumYcKVk9RkKZEG6dR5E3A/) средствами шаблонизаторов [**SCSS**](https://sass-lang.com/documentation) и [**Pug**](https://pugjs.org/api/getting-started.html) и с соблюдением [**БЭМ-методологии**](https://ru.bem.info/), и придерживаясь стайлгайдов от AirBnB по [**JavaScript**](https://github.com/airbnb/javascript) и [**SCSS**](https://github.com/airbnb/css).

## GitHub Pages
[**Navigation**](https://staya-bomjei.github.io/toxin)

### UI-Kit
* [**Colors & Type**](https://staya-bomjei.github.io/toxin/colors-and-type.html)
* [**Form Elements**](https://staya-bomjei.github.io/toxin/form-elements.html)
* [**Cards**](https://staya-bomjei.github.io/toxin/cards.html)
* [**Headers & Footers**](https://staya-bomjei.github.io/toxin/headers-and-footers.html)

### Pages
* [**Landing Page**](https://staya-bomjei.github.io/toxin/landing-page.html)
* [**Search room**](https://staya-bomjei.github.io/toxin/search-room.html)
* [**Room details**](https://staya-bomjei.github.io/toxin/room-details.html)
* [**Registration**](https://staya-bomjei.github.io/toxin/registration.html)
* [**Sign In**](https://staya-bomjei.github.io/toxin/sign-in-page.html)
* [**Error Page**](https://staya-bomjei.github.io/toxin/error-page.html)

## Развертывание

### Клонировать репозиторий:

```
  git clone https://github.com/staya-bomjei/toxin.git
```

`npm install --legacy-peer-deps` - устанавливает все зависимости проекта

> Примечание: опция --legacy-peer-deps нужна чтобы установить pug3.0.2 и pug-loader2.4.0 вместе, это необходимо, так как pug-loader предназначен для pug версии 2+, которая содержит уязвимости. Можно ли заменить pug-loader на другой? Можно, вот только ни один из найденных мною не предоставляет самый главный функционал: возможность вычислять путь до картинки в pug файлах, и передавать вычисленное значение в миксины, мне это нужно чтобы позволить себе хранить картинки используемые на страницах рядом со страницами. 

### Сборка проекта:

`npm run start` - запускает локальный сервер на порту **4200**, на котором будет собираться проект

`npm run dev` - собирает проект без минификации файлов в директорию `./build`

`npm run prod` - собирает проект c минификацией файлов и оптимизацией импортов в директорию `./build`

### Linting

`npm run stylelint` - запускает линтинг scss файлов по стандарту airbnb

`npm run eslint` - запускает линтинг js файлов по стандарту airbnb

### GitHub Pages

`npm run deploy` - собирает проект в режиме production и пушит собранный проект в ветку gh-pages

### Структура исходников
```
|-src
| |-assets
| | |-favicons
| | |-fonts
| |-components
| | |-advantage
| | |    ...
| |-libs
| | |-chart
| | |    ...
| |-page-layouts
| | |-base
| | |    ...
| |-pages
| | |-cards
| | |    ...
| |-styles
| | |-fonts.scss
| | |-global.scss
| | |-variables.scss
|-.eslintrc.js
|-.gitignore
|-.stylelintrc.json
|-package-lock.json
|-package.json
|-README.md
|-webpack.config.js
```
* Webpack собирает все страницы из **pages**, а те в свою очередь импортируют файлы инициализации блоков и их миксины из **components**;
* в **assets** хранятся шрифты и иконки, но не изображения, т.к. все изображения используемые страницами и блоками находятся в их же директориях;
* в **page-layouts** хранятся базовые разметки для разных типов страниц;
* в **libs** хранятся обёртки ко внешним библиотекам с минимальным интерфейсом, для того чтобы в случае чего их можно было легко заменить, а так же необходимые им файлы; 
* в **styles** хранятся стили для подключения шрифтов, глобальные стили, а так же различные переменные проекта.
### Структура блока
```
| | |    ...
| | |-dropdown
| | | |-const.js
| | | |-Counter.js
| | | |-Datepicker.js
| | | |-Dropdown.js
| | | |-dropdown.pug
| | | |-dropdown.scss
| | | |-index.js
| | | |-Summator.js
| | |    ...

```
* Каждый блок обязательно содержит **component.pug** файл с единственным миксином блока;
* блок может иметь файл **Component.js**, который содержит единственный класс **Component**, который выполняет необходимую инициализацию и прикрепляет обработчики событий с помощью метода **init()**; 
* блок может иметь файл инициализации **index.js**, который импортирует стили **component.scss** и файлы инициализации внутренних компонентов, а так же вызывает **init()** метод класса из **Component.js** для всех узлов dom дерева, отмеченных специальным классом;
* блок может имет файл **const.js**, в котором будут храниться константы селекторов, классов, атрибутов, блока;
* если компонент слишком сложный, то он может быть разбит с помощью наследования и иметь несколько файлов **Component.js**, в таком случае в **index.js** будет вызываться метод **init()** нужного класса с помощью фабрики;
* у блока может быть директория **img**, в которой хранятся используемые блоком изображения.

## Структура страницы
```
| | |    ...
| | |-form-elements
| | | |-data.json
| | | |-form-elements.pug
| | | |-form-elements.scss
| | | |-img
| | | | |-user-photo-1.png
| | | |-index.js
| | |    ...
```
Структура страницы соответствует структуре блока **но**:
* страницы имеют **data.json** файл, в котором записаны данные для инициализации используемых компонентов;
* страницы всегда наследуются от какой-нибудь раскладки из **page-layouts**.

## Версия Node
**v16.13.1**

## Зависимости проекта

* [**air-datepicker**](https://github.com/t1m0n/air-datepicker) (version: 3.0.1)
* [**chart**](https://github.com/chartjs/Chart.js) (version: 3.6.2)
* [**inputmask**](https://github.com/RobinHerbots/Inputmask) (version: 5.0.6)
* [**jquery**](https://github.com/jquery/jquery) (version: 3.6.0)
* [**nomralize.css**](https://github.com/necolas/normalize.css/) (version: 8.0.1)
