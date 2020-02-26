# [angular-ngrx-storybook-starter-kit](https://github.com/wahid-racheh/angular-ngrx-storybook-starter-kit)

Preconfigured Angular Ngrx Storybook Starter Kit

## Technical stack

- [Angular](https://github.com/angular/angular) (v9.0.1")
- [Angular material](https://v7.material.angular.io/) (v9.0.0)
- [Storybook](https://github.com/storybooks/storybook) (v5.3.13)
- [Jest](https://github.com/facebook/jest) (v24.9.0)

## System Requirements

- [Node](https://nodejs.org) v10.16.3 or greater
- [Npm](https://www.npmjs.com) v6.9.0 or greater
- [Sass](https://sass-lang.com/install) (which require ruby)

All of these must be available in your PATH. To verify things are set up properly, you can run this:

```sh
$ node --version
$ npm --version
```

## Requirement for sonar plugin

- [SonarQube](https://docs.sonarqube.org)
- [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html) (v11+)

After that, go to the project folder and install all npm dependencies, then run the application in development mode.

```sh
$ npm run setup
```

```sh
$ npm start
```

You are now ready to go, your application is available at http://localhost:4200.

## Directory Structure

- `.storybook/` - Storybook configurations.
- `coverage/` - Coverage and test reports.
- `dist/` - Build files and configuration.
- `jest-config/` - Jest configurations.
- `documentation/` - App documentation.
- `e2e/` - End To End tests.
- `node_modules/` - Node dependencies.
- `public/` - Public folder which contains storybook build.
- `scripts/` - Extended build scripts.
- `src/` - App source code.

## Build system

There are some `tasks` available in `package.json`.

- **start** - Run the application in development server
- **build** - Build the app in production mode
- **test** - Run test
- **test:debug** - Run test with debug mode
- **test:coverage** - Run test with coverage reports
- **lint** - Lint typescript files
- **e2e** - Run end to end test
- **build-storybook** - Build storybook
- **semantic** - Run semantic release in dry-run mode (in local)
- **storybook** - Run storybook server
- **doc** - Generate app documentation
- **sonar** - Run sonar analysis on local machine

## Git

### Commit rules

The messages follows the branch workflow :

breaking|feat|fix|chore|refactor|test|docs|no-release(MODULE_NAME|JIRA_NUMBER): HEADER_MESSAGE

BODY_MESSAGE

The description of mentioned types:

- breaking: A big feature/refactor which includes a breaking change
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- config: Updating configurations of linter, ts, webpack, babel etc.
- chore: Updating configurations or make a refactor etc; no production code change.
- test: Adding missing tests or correcting existing tests
- docs: changing the readme or adding additional documentation
- no-release: a specific type which you can use in specific cases when no release is needed for your change

## Highlights

**Angular 9** Create smarter and faster Angular apps with the latest official Angular release

**NGRX** Handle app state using ngrx.

**Storybook** Snapshot testing for angular components with integrated local server

**Angular material** Angular material componants.

**CommitLint** Lint messages on commit with husky

**Prettier** Auto-format/fix your ts code according to your TSLint configuration

**semantic-release** automates the whole package release workflow (should set your configurations)

**Jest** Unit testing with coverage and storyshots using jest

**Sonar** Code analysis and coverage preview

**compodoc** Generate documentation for your app modules, components ...

## Troubleshooting

<details>

<summary>"npm run setup" command not working</summary>

Here's what the setup script does. If it fails, try doing each of these things
individually yourself in every package:

```
# verify your environment will work with the project
node ./scripts/verify

# install dependencies
npm i

# verify the project is ready to run
npm run build
```

If any of those scripts fail, please try to work out what went wrong by the
error message you get.

</details>
