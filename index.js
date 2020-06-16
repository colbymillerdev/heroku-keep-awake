const fetch = require('node-fetch');

const wakeDyno = (url, options = {}) => {
  const { interval = 29, logging = true } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    fetch(url)
      .then(() => logging && console.log('Successfully woke the dyno'))
      .catch(() => logging && console.log('Error attempting to wake the dyno'))
      .finally(() => wakeDyno(url, options));
  }, milliseconds);
};

const wakeDynos = (urls, options = {}) => {
  const { interval = 29, logging = true } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    if (!Array.isArray(urls)) return;

    const promises = urls.map((url) => fetch(url));
    Promise.all(promises)
      .then(() => logging && console.log('Successfully woke all dynos'))
      .catch(() => logging && console.log('Error attempting to wake the dynos'))
      .finally(() => wakeDynos(urls, options));
  }, milliseconds);
};

module.exports = { wakeDyno, wakeDynos };
