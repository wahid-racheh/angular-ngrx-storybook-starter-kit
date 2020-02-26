// Needed variables in gtilab CI are NPM_TOKEN and GITLAB_TOKEN
// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md#authentication
// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration
// https://medium.com/@casperle13/git-flow-and-semantic-release-with-gitlab-be54b2c64818
// TODO
// set env variables in Settings → CI/CD → Variables
// NPM_TOKEN
// GITLAB_TOKEN
// SSH_PRIVATE_KEY

const commitAnalyzerOptions = {
  preset: 'angular',
  releaseRules: [
    { type: 'breaking', release: 'major' },
    { type: 'refactor', release: 'patch' },
    { type: 'chore', release: 'patch' },
    { scope: 'no-release', release: false },
    { scope: 'test', release: false }
  ],
  parserOpts: {
    noteKeywords: []
  }
};

const releaseNotesGeneratorOptions = {
  presetConfig: {
    types: [
      { type: 'breaking', section: 'Features' },
      { type: 'refactor', section: 'Bug Fixes' },
      { type: 'chore', section: 'Config' },
      { scope: 'no-release', hidden: true },
      { scope: 'test', hidden: true }
    ]
  }
};

module.exports = {
  debug: true,
  repositoryUrl: '[https://github.com/wahid-racheh/angular-ngrx-storybook-starter-kit]',

  plugins: [
    // analyze commits with conventional-changelog
    ['@semantic-release/commit-analyzer', commitAnalyzerOptions],
    // generate changelog content with conventional-changelog
    ['@semantic-release/release-notes-generator', releaseNotesGeneratorOptions],
    // updates the changelog file
    '@semantic-release/changelog',
    // publishes to npm
    ['@semantic-release/npm', { npmPublish: true }],
    // creating a git tag
    [
      '@semantic-release/gitlab',
      {
        gitlabUrl: '[https://github.com/wahid-racheh]'
      }
    ],
    // creating a new version commit
    '@semantic-release/git'
  ]
};
