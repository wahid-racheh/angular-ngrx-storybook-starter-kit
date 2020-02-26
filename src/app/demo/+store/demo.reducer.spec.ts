import * as DemoActions from '@app/demo/+store/demo.actions';
import {
  demoInitialState as initialState,
  demoReducer as reducer
} from '@app/demo/+store/demo.reducer';

describe('DemoReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      // GIVEN
      // WHEN
      const result = reducer(undefined, {} as any);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('RESET_STATE', () => {
    it('should reset state to initial state', () => {
      // GIVEN
      const action = DemoActions.resetState();
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('SET_PAGE_TITLE', () => {
    it('should set pageTitle in state', () => {
      // GIVEN
      const title: string = 'title';
      const action = DemoActions.setPageTitle({ title });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });
});
