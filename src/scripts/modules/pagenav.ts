type TPagenavOptions = Record<'sectionSel' | 'secCaptionSel' | 'navSel' | 'navBtnSel', string>;

class Pagenav {
  nav: HTMLElement | null = null;
  navBtnsList: HTMLElement[] = [];
  captionsList: HTMLElement[] = [];
  sectionsList: HTMLElement[] = [];
  hiddenMod: string = 'is-hidden';
  activeMod: string = 'is-active';

  constructor(options: TPagenavOptions) {
    this.init(options);
  }

  init(options: TPagenavOptions) {
    const { sectionSel, secCaptionSel, navSel, navBtnSel } = options;

    this.nav = document.querySelector(navSel);

    if (!this.nav) {
      return;
    }

    this.navBtnsList = Array.from(this.nav.querySelectorAll(navBtnSel));
    this.captionsList = Array.from(document.querySelectorAll(secCaptionSel));
    this.sectionsList = this.captionsList.map(item => item.closest(sectionSel) as HTMLElement);

    this.handleTargets();
  }

  handleBtn(event: Event) {
    event.preventDefault();

    const currBtn = event.target as HTMLElement
    const idx = Number(currBtn.dataset.target);

    if(!idx && idx !== 0) {
      return;
    }

    let startTime = 0;
    const duration = 1000;
    const section = this.sectionsList[idx];
    const windowPosition = window.scrollY;
    const scrollHeight = section.offsetTop - windowPosition;

    const handleAnimation = (currTime: number) => {
      if(!startTime) {
        startTime = currTime;
      }

      const timeElapsed = currTime - startTime;
      const progress = timeElapsed / duration;
      const easedProgress = progress * (2 - progress);

      window.scrollTo(0, windowPosition + scrollHeight * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(handleAnimation);
      }
    }

    requestAnimationFrame(handleAnimation);

    this.navBtnsList.forEach((btn) => {
      btn.classList.toggle(
        this.activeMod,
        btn === currBtn
      );
    });
  }

  bindEvent(item: HTMLElement) {
    item.addEventListener('click', (this.handleBtn as EventListener).bind(this));
  }

  handleTargets() {
    this.navBtnsList.forEach((item, index) => {
      const { title, hidden } = item.dataset;
      const hiddenValue = Number(hidden);

      this.bindEvent(item);

      this.captionsList[index].textContent = title || '';
      if(hiddenValue) this.captionsList[index].classList.add(this.hiddenMod);
    });

  }
}

export default Pagenav;
