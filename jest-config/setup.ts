// browser mocks globally available for every test
import 'jest-preset-angular';
import './global-mocks';

// If you need add more mocks, before starting to hand-code your own
// have a look at https://github.com/jest-community/awesome-jest#mocks

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// import 'zone.js/dist/zone-testing';
// import { getTestBed } from '@angular/core/testing';
// import {
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting
// } from '@angular/platform-browser-dynamic/testing';
//
// declare const require: {
//   context(path: string, deep?: boolean, filter?: RegExp): {
//     keys(): string[];
//     <T>(id: string): T;
//   };
// };

// // First, initialize the Angular testing environment.
// getTestBed().initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting()
// );
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().map(context);
