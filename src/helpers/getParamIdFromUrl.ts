export const getParamIdFromUrl = (url: string): string => {
  const match = url.match(/\d+/g);
  if (match && match[0]) return match[0];
  return "";
};
