import Swiper from "swiper";

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

export { initSlides };
