export const isRequired = (val) => {
  if (!val.length) return "Поле обезательно";
  return undefined;
};

export const phoneValidator = (val) => {
  if (val.length === 11 && /^7[0-9]+$/.test(val)) return undefined;
  return "Не корректный номер";
};

export const onlyLetterValidator = (val) => {
  if (/^[А-ЯЁа-яёA-Za-z]*$/.test(val)) return undefined;
  return "Только буквы";
};
