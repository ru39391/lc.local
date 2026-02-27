import Twig, { Template } from 'twig';

const renderData = (tpl: Template): Node[] => {
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

const init = () => {
  console.log("init");
};

const initApp = async () => {
  const wrapper = document.querySelector<HTMLDivElement>('#app');

  try {
    const tpl = await fetchTemplate();
    const arr = renderData(tpl as Template);

    arr.forEach(item => wrapper?.append(item));
    init();
  } catch(err) {
    console.error(err);
  }
};

export {
  init,
  initApp
};
