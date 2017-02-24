/* eslint-disable import/prefer-default-export, no-useless-escape */
export const slugify = string => (
  string.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')        // Replace multiple - with single -
);
