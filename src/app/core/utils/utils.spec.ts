import { Observable, of, Subject } from 'rxjs';

import { getValueFromObservable, stringToJson, unsubscribe } from '@app/core/utils/utils';

describe('CoreUtils', () => {
  describe('getValueFromObservable', () => {
    it('should return the correct value from observable', () => {
      // GIVEN
      const data = 'test';
      // WHEN
      const observable = getValueFromObservable(of(data));
      // THEN
      expect(data).toBe(observable);
    });
  });

  describe('stringToJson', () => {
    it('should convert json string to json object', () => {
      // GIVEN
      const string =
        "{'target':'test nom 2', 'targetCodeCD':'test prenom 2', 'email':'email@email.com'}";
      // WHEN
      const json = stringToJson(string);
      // THEN
      expect(json).not.toBe(null);
      expect(json.target).toEqual('test nom 2');
    });
  });

  describe('unsubscribe', () => {
    it('should unsubscribe an observable', () => {
      // GIVEN
      const observable: Observable<boolean> = of(true);
      const subscribtion: any = observable.subscribe((v: boolean) => {});
      // WHEN
      unsubscribe(subscribtion);
      // THEN
      expect(subscribtion.isStopped).toBeTruthy();
    });

    it('should unsubscribe a subject', () => {
      // GIVEN
      const subject: Subject<boolean> = new Subject<boolean>();
      // WHEN
      unsubscribe(subject);
      // THEN
      expect(subject.isStopped).toBeTruthy();
    });
  });
});
