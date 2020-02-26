import { Observable, Subject } from 'rxjs';

export const getValueFromObservable = (observable: Observable<any>): any => {
  let value = null;
  if (observable) {
    const subscribsion = observable.subscribe(v => (value = v));
    subscribsion.unsubscribe();
  }
  return value;
};

export const unsubscribe = (subject: Subject<any> | any): void => {
  if (subject instanceof Subject) {
    subject.next();
    subject.complete();
  } else {
    subject.unsubscribe();
  }
};

export const stringToJson = (input: string): any => {
  if (input) {
    input = input
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, '\\\\')
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    // remove non-printable and other non-valid JSON chars
    input = input.replace(/[\u0000-\u0019]+/g, '');
    input = input.replace(/'/g, '"');
    try {
      return JSON.parse(input);
    } catch (ex) {}
  }
  return input;
};
