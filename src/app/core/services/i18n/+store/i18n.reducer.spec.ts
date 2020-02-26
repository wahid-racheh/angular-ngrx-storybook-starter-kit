import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';
import {
  i18nInitialState as initialState,
  i18nReducer as reducer
} from '@app/core/services/i18n/+store/i18n.reducer';

describe('I18nReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      // GIVEN
      // WHEN
      const result = reducer(undefined, {} as any);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('SET_LANGUAGE', () => {
    it('should set lang to `fr` in state', () => {
      // GIVEN
      const lang: string = 'fr';
      const action = I18nActions.setLanguage({ lang });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });
});
