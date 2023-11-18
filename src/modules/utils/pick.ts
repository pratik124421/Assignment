
const pick = (object: Record<string, any>, keys: string[]) =>
keys.reduce((obj: any, key: string) => {
  if (object && object.hasOwnProperty(key)) {
    obj[key] = object[key];
  }
  return obj;
}, {});

export default pick;
