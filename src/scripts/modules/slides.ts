// @ts-ignore
import Swiper from "swiper"; //, { Autoplay, Navigation }

const initSlides = (sel: string) => {
  const items = Array.from(document.querySelectorAll(sel));

  if (!items.length) {
    return;
  }

  const slides: Swiper[] = items.map(
    () =>
      new Swiper(sel, {
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 16,
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
        grabCursor: true,
      }),
  );

  return slides;
};

const initGridSlides = (sel: string) => {
  const items = Array.from(document.querySelectorAll(sel));

  if (!items.length) {
    return;
  }

  const slides: Swiper[] = items.map(
    () =>
      new Swiper(sel, {
        slidesPerView: 4,
        grid: {
          rows: 2,
        },
        spaceBetween: 16,
        breakpoints: {
          1200: {
            spaceBetween: 20,
          },
        },
        grabCursor: true,
        pagination: {
          el: `${sel} .swiper-pagination`,
          clickable: true,
          renderBullet: (index, className) =>
            `<div class="${className} is-active"><span class="swiper-pagination-counter">${index + 1}</span></div>`,
        },
      }),
  );

  return slides;
};

export { initGridSlides, initSlides };
