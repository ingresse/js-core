function numeric(value = '', allowed = [' ', '.']) {
  const filteredValue = [];
  const stringArray = value.trimStart().split('');

  stringArray.forEach((character) => {
    const isAllowed = allowed.includes(character);
    const isNonDigit = /\D/.test(character);
    const shouldRemove = !!(!isAllowed && isNonDigit);

    if (!shouldRemove) {
      filteredValue.push(character);
    }
  });

  return filteredValue.join('');
}

export const patterns = {
  numeric,
};
