import i18n from 'i18next';

export const messageRequired = (field: string) => {
  return i18n.t('field_required', {field});
};

export const messageInValid = (field: string) => {
  return i18n.t('field_invalid', {field});
};
