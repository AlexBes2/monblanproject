# Monblanproject

A responsive social-profile page built as a test project. The interface follows a provided Figma design and includes a profile header, post feed, date-based filtering, and grid/list view switching.

## Features

- Responsive layout for mobile, tablet, and desktop screens
- Profile header with username, start date, and stats
- Date filtering with two flatpickr inputs (from/to)
- Grid and list view toggle with saved preference
- Post cards with likes, comments, and upload information
- Gulp-based build pipeline for HTML, SCSS, JavaScript, and assets

## Design

- Figma: https://www.figma.com/file/MwGYHQfDaytsvUW7ivCNMY/%D0%A2%D0%B5%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BA%D0%B0%D0%BB%D1%8C%D1%89%D0%B8%D0%BA%D0%BE%D0%B2?node-id=0%3A1

## Tech Stack

- HTML
- SCSS
- Vanilla JavaScript
- Gulp
- flatpickr
- Google Fonts

## Project Structure

```text
monblanproject/
├── src/
│   ├── index.html
│   ├── images/
│   ├── js/
│   │   ├── app.js
│   │   ├── calendar-manager.js
│   │   ├── constants.js
│   │   ├── posts-manager.js
│   │   ├── ui-utils.js
│   │   └── view-manager.js
│   └── scss/
│       ├── _base.scss
│       ├── _mixins.scss
│       ├── _posts.scss
│       ├── _profile.scss
│       ├── _variables.scss
│       └── main.scss
├── dist/
├── gulpfile.js
├── package.json
└── README.md
```

## Installation

Requirements:

- Node.js 18+
- npm

Install dependencies:

```bash
npm install
```

## Development

Start the dev workflow:

```bash
npm start
# or
npx gulp
```

This watches the source files and rebuilds the output in the dist folder.

## Build

Create a production build:

```bash
npm run build
# or
npx gulp build
```

## Preview

You can preview the built project locally with a simple static server:

```bash
cd dist
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Scripts

- npm start — starts the Gulp workflow
- npm run build — generates the production build
- npm run dev — runs the watcher

## Notes

- The project uses mock data for the post feed.
- The date filter is limited to the period shown in the design.
- Preferences such as the selected view are stored in localStorage.

## License

ISC
