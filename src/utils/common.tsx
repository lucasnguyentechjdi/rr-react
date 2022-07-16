export const PURPOSE_OF_ASK = [
  {key: 'buy', name: 'Buy'},
  {key: 'sell', name: 'Sell'},
  {key: 'custom', name: 'Custom'},
];

export enum PURPOSE_OF_ASK_ENUM {
  BUY = 'buy',
  SELL = 'sell',
  CUSTOM = 'custom',
}

export enum PURPOSE_OF_ASK_TYPE_ENUM {
  TEXTFIELD = 'textfield',
  CALENDAR = 'datetime',
  TEXTBOX = 'textbox',
  TEXT = 'text',
  INTERGER = 'interger',
}

export const mergeUnique = (arr1: any[], arr2: any[]) => {
  const merged = [...arr1];
  if (!arr2) return merged;
  arr2.forEach((item: any) => {
    if (merged.filter((x: any) => x.code === item.code).length > 0) {
      return;
    }
    merged.push(item);
  });
  return merged;
};
