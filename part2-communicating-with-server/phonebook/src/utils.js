const isSubstring = (entity, subString) => {
  return entity.toLowerCase().includes(subString.toLowerCase());
};

export { isSubstring };
