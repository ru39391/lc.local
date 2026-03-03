type TTabsOptions = Record<'tabsWrapperSel' | 'tabLinkSel' | 'tabPaneSel', string> & { handleCaption?: (value: string) => void };

class Tabs {
  activeClass: string = "is-active";
  disabledClass: string = "is-disabled";
  tabsWrapper: HTMLElement | null = null;
  tabsHolder: HTMLElement | null = null;
  togglers: HTMLElement[] = [];
  panes: HTMLElement[] = [];
  tabData: { tab: HTMLElement; id: string; } | null = null;
  handleCaption?: (value: string) => void = undefined;

  constructor(options: TTabsOptions) {
    this.init(options);
  }

  init(options: TTabsOptions) {
    const { tabsWrapperSel, tabLinkSel, tabPaneSel, handleCaption } = options;

    this.tabsWrapper = document.querySelector(tabsWrapperSel);

    if (!this.tabsWrapper) {
      return;
    }

    this.togglers = Array.from(this.tabsWrapper.querySelectorAll(tabLinkSel));
    this.tabsHolder = this.tabsWrapper.dataset.content ? this.tabsWrapper.querySelector(`.${this.tabsWrapper.dataset.content}`) : this.tabsWrapper;
    this.panes = Array.from((this.tabsHolder || this.tabsWrapper).querySelectorAll(tabPaneSel));
    this.handleCaption = handleCaption;

    this.bindEvents();
  }

  setCaption(activeTab: HTMLElement) {
    if(!this.handleCaption) return;

    const idx = this.togglers.indexOf(activeTab);

    this.handleCaption(idx === this.togglers.length - 1 ? this.togglers[0].textContent : this.togglers[idx + 1].textContent);
  }

  bindEvents() {
    this.togglers.forEach((item, index) => {
      item.addEventListener("click", this.toggleTab.bind(this));

      if(index === 0) item.classList.add(this.activeClass);
    });

    this.panes.forEach((item, index) => {
      if(index === 0) item.classList.add(this.activeClass);
    });

    this.setCaption(this.togglers[0]);
  }

  toggleTab(event: Event) {
    event.preventDefault();

    const tab = event.currentTarget as HTMLElement;

    if (tab.classList.contains(this.disabledClass)) {
      return;
    }

    this.setData(tab);
    this.handleTabs();
  }

  setData(activeTab: HTMLElement) {
    this.tabData = {
      tab: activeTab,
      id: String(activeTab.dataset.pane)
    };
  }

  isDisabledTab() {
    return this.tabData?.tab.classList.contains(this.disabledClass);
  }

  handleTabs() {
    if (this.isDisabledTab()) {
      return;
    }

    this.togglers.forEach((item) => {
      item.classList.toggle(
        this.activeClass,
        item.dataset.pane === this.tabData?.id
      );
    });

    this.panes.forEach((item) => {
      item.classList.toggle(
        this.activeClass,
        item.dataset.id === this.tabData?.id
      );
    });

    this.setCaption(this.tabData?.tab as HTMLElement);
  }
}

export default Tabs;
