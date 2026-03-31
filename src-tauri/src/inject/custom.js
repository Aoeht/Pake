(function () {
  console.log("[Pake Adblock] injected");
  console.log("[Pake Adblock] url:", location.href);

  const SELECTOR = ".vui_icon.bili-video-card__stats"; //主页小火箭视频
  const PROMOTION = ".desc"; //视频右方带小火箭广告
  const AD1 = ".gg-pic"; //视频下方横幅广告
  const AD2 = ".close-btn"; //视频右方矩形带关闭按钮广告
  const AD3 = ".vcd"; //视频右边带感兴趣字样的广告
  const AD4 = ".enter-button"; //下载游戏的广告
  function removeAds() {
    document.querySelectorAll('[title*="感兴趣"]').forEach((el_startpage) => {
      let node_startpage = el_startpage;
      for (let i = 0; i < 5 && node_startpage; i++) {
        node_startpage = node_startpage.parentElement;
      }
      if (node_startpage) node_startpage.remove();
    });
    document.querySelectorAll(AD1).forEach((el_bannerad) => {
      let node_bannerad = el_bannerad;
      for (let i = 0; i < 3 && node_bannerad; i++) {
        node_bannerad = node_bannerad.parentElement;
      }
      if (node_bannerad) node_bannerad.remove();
    });
    document.querySelectorAll(PROMOTION).forEach((el) => {
      let node = el;
      for (let i = 0; i < 6 && node; i++) {
        node = node.parentElement;
      }
      if (node) node.remove();
    });
    document.querySelectorAll(AD2).forEach((el) => {
      let node = el;
      for (let i = 0; i < 1 && node; i++) {
        node = node.parentElement;
      }
      if (node) node.remove();
    });
    document.querySelectorAll(AD3).forEach((el) => {
      let node = el;
      for (let i = 0; i < 4 && node; i++) {
        node = node.parentElement;
      }

      if (node) {
        node.remove();
      }
    });
    document.querySelectorAll(AD4).forEach((el) => {
      let node = el;
      for (let i = 0; i < 3 && node; i++) {
        node = node.parentElement;
      }

      if (node) {
        node.remove();
      }
    });
    document.querySelectorAll(SELECTOR).forEach((el) => {
      let node = el;
      for (let i = 0; i < 5 && node; i++) {
        node = node.parentElement;
      }

      if (node) {
        node.remove();
      }
    });
  }

  function start() {
    console.log("[Pake Adblock] start");
    removeAds();

    const observer = new MutationObserver(() => {
      console.log("[Pake Adblock] mutation observed");
      removeAds();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
