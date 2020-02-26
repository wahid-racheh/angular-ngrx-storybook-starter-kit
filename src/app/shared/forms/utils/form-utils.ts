export const isEmpty = (data: any): boolean => {
  return (
    data === null ||
    data === undefined ||
    (data instanceof Array
      ? !data.length
      : typeof data === 'string'
      ? !data.replace(/\s/g, '').length
      : !data)
  );
};
