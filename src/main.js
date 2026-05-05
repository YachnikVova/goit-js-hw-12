import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

const PER_PAGE = 15;

let query = '';
let page = 1;
let totalHits = 0;
const shownIds = new Set();

const err = m => iziToast.error({ message: m, position: 'topRight' });
const info = m => iziToast.info({ message: m, position: 'topRight' });

hideLoadMoreButton();

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = form.elements.searchQuery.value.trim();
  page = 1;
  totalHits = 0;
  shownIds.clear();

  clearGallery();
  hideLoadMoreButton();

  if (!query) return err('Введи щось...');

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits.length)
      return err('Порожньо. Нічого не знайдено.');

    createGallery(unique(data.hits));

    if (end()) return done();

    showLoadMoreButton();
  } catch {
    err('Щось зламалось...');
  } finally {
    hideLoader();
  }

  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  page++;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(unique(data.hits));
    scroll();

    if (end()) return done();

    showLoadMoreButton();
  } catch {
    err('Щось зламалось...');
  } finally {
    hideLoader();
  }
});

const unique = arr =>
  arr.filter(i => {
    if (shownIds.has(i.id)) return false;
    shownIds.add(i.id);
    return true;
  });

const end = () => page * PER_PAGE >= totalHits;

const done = () => {
  hideLoadMoreButton();
  info('Кінець. Більше нічого нема.');
};

const scroll = () => {
  const el = document.querySelector('.gallery-item');
  if (!el) return;

  const h = el.getBoundingClientRect().height;

  window.scrollBy({ top: h * 2, behavior: 'smooth' });
};