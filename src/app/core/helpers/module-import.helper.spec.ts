import { throwIfAlreadyLoaded } from './module-import.helper';

describe('Helper `throwIfAlreadyLoaded`', () => {
  it('should go through when no `parentModule` is defined', () => {
    expect(() => throwIfAlreadyLoaded(null, 'moduleName')).not.toThrowError();
  });

  it('should throw error when `parentModule` is defined', () => {
    expect(() => throwIfAlreadyLoaded('moduleName', 'moduleName')).toThrowError();
  });
});
