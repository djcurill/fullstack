const isSubstring = (criteria, words) => {
  return words.toLowerCase().includes(criteria.toLowerCase());
};

export { isSubstring };
