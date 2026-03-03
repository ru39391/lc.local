import Swiper from "swiper";
import { Pagination } from 'swiper/modules';

type TGridSlides = Record<'parentSel' | 'wrapperSel' | 'itemSel' | 'slideClass', string>;

class GridSlides {
  parentSel: string | null = null;
  parentItem: HTMLElement | null = null;
  wrapperItem: HTMLElement | null = null;
  slidesList: HTMLElement[] = [];
  itemsList: HTMLElement[] = [];
  slideClass: string | null = null;

  constructor(options: TGridSlides) {
    this.init(options);
  }

  init(options: TGridSlides) {
    const { parentSel, wrapperSel, itemSel, slideClass } = options;

    this.parentItem = document.querySelector(parentSel);

    if (!this.parentItem) {
      return;
    }

    this.parentSel = parentSel;
    this.slideClass = slideClass;
    this.wrapperItem = this.parentItem.querySelector(wrapperSel);
    this.itemsList = Array.from(this.parentItem.querySelectorAll(itemSel));

    this.setSlides();
  }

  createItem(className: string): HTMLElement {
    const classArr = className ? className.split(' ') : [];
    const el = document.createElement('div');

    classArr.forEach(value => el.classList.add(value));

    return el;
  }

  initSlides() {
    if(!this.wrapperItem || !this.parentSel) return;

    this.slidesList.forEach(item => {
      this.wrapperItem!.append(item);
    });

    new Swiper(this.parentSel, {
      modules: [Pagination],
      loop: false,
      slidesPerView: "auto",
      spaceBetween: 0,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => `<div class="${className}"><span class="swiper-pagination-counter">${index + 1}</span></div>`
      },
    });
  }

  setSlides() {
    const slidesMinLenght = Math.ceil(this.itemsList.length / 8);

    this.slidesList = [...Array(slidesMinLenght)].map((_, index) => {
      const slide = this.createItem(this.slideClass as string);

      this.itemsList.forEach((item, idx) => {
        if(idx < 8 * (index + 1) && idx >= 8 * index) {
          slide.append(item);
        }
      });

      return slide;
    });

    this.initSlides();
  }
}

export default GridSlides;
