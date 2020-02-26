/**
 * Browser mocks globally available for every test
 * See: https://github.com/thymikee/jest-preset-angular
 */

const storageMock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {})
  };
};

const cookieMock = () => {
  let cookie = '';
  return {
    get: () => cookie,
    set: (value: any) => {
      // HACK: Ok that's not correct but do the job for simulating cookie clearing.
      if (value.indexOf('expires=Thu, 01 Jan 1970 00:00:00 GMT') !== -1) {
        return;
      }
      cookie += value;
    }
  };
};

Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });
Object.defineProperty(window, 'cookie', { value: cookieMock() });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true
  })
});
