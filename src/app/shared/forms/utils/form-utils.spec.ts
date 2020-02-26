import { isEmpty } from '@app/shared/forms/utils/form-utils';

describe('Form utils', () => {
  describe('`isEmpty`', () => {
    it('should return true when data is null', () => {
      // GIVEN
      // WHEN
      const ok = isEmpty(null);
      // THEN
      expect(ok).toBeTruthy();
    });

    it('should return true when data is undefined', () => {
      // GIVEN
      // WHEN
      const ok = isEmpty(undefined);
      // THEN
      expect(ok).toBeTruthy();
    });

    it('should return true when data string is ""', () => {
      // GIVEN
      // WHEN
      const ok = isEmpty('');
      // THEN
      expect(ok).toBeTruthy();
    });

    it('should return true when data array is empty', () => {
      // GIVEN
      // WHEN
      const ok = isEmpty([]);
      // THEN
      expect(ok).toBeTruthy();
    });
  });
});
