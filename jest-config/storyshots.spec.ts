import addonStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';
import path from 'path';

// Mock `Math.random()` to fix an issue `dropdownId` from `@ng-select`
// which is changing every snapshot
Math.random = jest.fn(() => 0.5);

addonStoryshots({
  framework: 'angular',
  configPath: path.join(__dirname, '../.storybook'),
  test: multiSnapshotWithOptions({})
});
