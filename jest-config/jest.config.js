const tsconfig = require('../tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  rootDir: '../',
  preset: 'jest-preset-angular',
  testURL: 'http://localhost/',
  setupFilesAfterEnv: ['<rootDir>/jest-config/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      diagnostics: false,
      isolatedModules: true,
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')]
    }
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/node_modules/jest-preset-angular/HTMLCommentSerializer.js'
  ],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@storybook/*)', 'jest-canvas-mock'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['json', 'lcov', 'html', 'text'],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!**/*-routing.module.ts',
    '!**/*.mock.ts',
    '!**/*.stories.ts',
    '!**/+store/**/*.actions.ts',
    '!**/+store/**/*.selectors.ts'
  ],
  coveragePathIgnorePatterns: ['/jest-config/', '/node_modules/'],
  moduleNameMapper
};
