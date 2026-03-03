type TTogglerOptions = Record<'classMod' | 'itemSel' | 'btnSel', string>;

class Toggler {
  btnSel: string | null = null;
  btn: HTMLButtonElement | null = null;
  item: HTMLElement | null = null;
  classMod: string | null = null;

  constructor(options: TTogglerOptions) {
    this.init(options);
  }

  init(options: TTogglerOptions) {
    const { classMod, itemSel, btnSel } = options;
    this.item = document.querySelector(itemSel);

    if (!this.item || !classMod) {
      return;
    }

    this.btnSel = btnSel;
    this.classMod = classMod;
    this.btn = document.querySelector(btnSel);

    this.bindEvents();
  }

  hideNav(event: MouseEvent) {
    const item = event.target as HTMLElement;

    if(this.btnSel && item.closest(this.btnSel)) {
      return;
    } else {
      this.item?.classList.remove(this.classMod as string);
    }
  }

  toggleNav(event: MouseEvent) {
    event.preventDefault();

    if(this.item) {
      this.item.classList.toggle(this.classMod as string);
    }
  }

  bindEvents() {
    this.btn?.addEventListener('click', (this.toggleNav as EventListener).bind(this));
  }
}

export default Toggler;
