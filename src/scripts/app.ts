// @ts-ignore
import Twig, { Template } from 'twig';
import GridSlides from './modules/grid-slides';
import { initSlides } from './modules/slides';

const parseData = (tpl: Template): Node[] => {
  const parser = new DOMParser();

  const { body } = parser.parseFromString(
    tpl.render(),
    'text/html'
  );

  return Array.from(body.children);
}

const fetchTemplate = async (): Promise<Template | undefined> => {
  try {
    const res = await fetch('src/assets/templates/tpl.twig');
    const data = await res.text();

    return Twig.twig({ data });
  } catch(err) {
    console.error(err);
  }
}

const initApp = () => {
  initSlides('.js-slides');

  new GridSlides({
    parentSel: '.js-grid-slides',
    wrapperSel: '.js-grid-wrapper',
    itemSel: '.js-grid-item',
    slideClass: 'hardware-grid swiper-slide',
  });
};

const renderData = async () => {
  const wrapper = document.querySelector<HTMLDivElement>('#app');

  try {
    const tpl = await fetchTemplate();
    const arr = parseData(tpl as Template);

    arr.forEach(item => wrapper?.append(item));
    initApp();
  } catch(err) {
    console.error(err);
  }
};

const init = () => {
  import.meta.env.VITE_APP_ENV === 'development' ? renderData() : initApp();
};

export {
  init
};
