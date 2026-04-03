if (localStorage.getItem("pake_disable_js_injection") !== "true") {
(function () {
  console.log("[Pake Adblock] injected");
  console.log("[Pake Adblock] url:", location.href);

  const SELECTOR = ".vui_icon.bili-video-card__stats--icon"; //主页小火箭视频

  const RECOMMEND = ".recommended-swipe"; //首页推荐大图

  const PROMOTION = ".video-card-ad-small"; //视频右方带小火箭广告

  const AD1 = ".gg-pic"; //视频下方横幅广告
  const AD2 = ".close-btn"; //视频右方矩形带关闭按钮广告
  const AD3 = ".vcd"; //视频右边带感兴趣字样的广告
  const AD4 = ".enter-button"; //下载游戏的广告
  const AD5 = ".video-page-special-card-small"; //右侧活动推广
  function getPageType() {
    const { hostname, pathname } = location;

    const isMainDomain =
      hostname === "www.bilibili.com" || hostname === "bilibili.com";

    if (isMainDomain && pathname === "/") {
      return "home";
    }

    if (isMainDomain && pathname.startsWith("/video/")) {
      return "video";
    }

    if (hostname === "live.bilibili.com") {
      return "live";
    }

    return "other";
  }

  function removeAds() {
    const pageType = getPageType();
    if (pageType === "home") {
      console.log("首页");

      const els = document.querySelectorAll(SELECTOR);
      console.log("首页小火箭命中数:", els.length);

      els.forEach((el_startpage) => {
        let node_startpage = el_startpage;
        for (let i = 0; i < 5 && node_startpage; i++) {
          node_startpage = node_startpage.parentElement;
        }
        if (node_startpage) {
          node_startpage.remove();
          console.log("首页小火箭广告发现");
        }
      });
      const els2 = document.querySelectorAll('[title*="感兴趣"]');
      console.log("首页感兴趣命中数:", els2.length);

      els2.forEach((el_startpage) => {
        let node_startpage = el_startpage;
        for (let i = 0; i < 5 && node_startpage; i++) {
          node_startpage = node_startpage.parentElement;
        }
        if (node_startpage) {
          node_startpage.remove();
          console.log("首页感兴趣广告发现");
        }
      });
      const els3 = [
        ...document.querySelectorAll(".bili-video-card__stats--text"),
      ].filter((el) => el.textContent.trim() === "广告");
      console.log("首页带广告标签命中数:", els3.length);

      els3.forEach((el_startpage) => {
        let node_startpage = el_startpage;
        for (let i = 0; i < 7 && node_startpage; i++) {
          node_startpage = node_startpage.parentElement;
        }
        if (node_startpage) {
          node_startpage.remove();
          console.log("首页带广告标签发现");
        }
      });
      document.querySelectorAll(RECOMMEND).forEach((el_bannerad) => {
        let node_bannerad = el_bannerad;
        if (node_bannerad) node_bannerad.style.display = "none";
        console.log("首页推荐");
      });
      return;
    }
    if (pageType === "video") {
      console.log("视频页");
      document.querySelectorAll(AD1).forEach((el_bannerad) => {
        let node_bannerad = el_bannerad;
        for (let i = 0; i < 2 && node_bannerad; i++) {
          node_bannerad = node_bannerad.parentElement;
        }
        if (node_bannerad) node_bannerad.style.display = "none";
        console.log("下方横幅广告");
      });
      document.querySelectorAll(PROMOTION).forEach((el) => {
        let node = el;
        if (node) node.style.display = "none";

        console.log("右边小火箭");
      });
      document.querySelectorAll(AD2).forEach((el) => {
        let node = el;
        for (let i = 0; i < 1 && node; i++) {
          node = node.parentElement;
        }
        if (node) node.style.display = "none";
        console.log("右方带关闭广告");
      });
      document.querySelectorAll(AD3).forEach((el) => {
        let node = el;
        for (let i = 0; i < 4 && node; i++) {
          node = node.parentElement;
        }

        if (node) {
          node.style.display = "none";
        }
        console.log("右边感兴趣");
      });
      document.querySelectorAll(AD4).forEach((el) => {
        let node = el;
        for (let i = 0; i < 3 && node; i++) {
          node = node.parentElement;
        }

        if (node) {
          node.style.display = "none";
        }
        console.log("下载游戏广告");
      });
      document.querySelectorAll(AD5).forEach((el) => {
        let node = el;
        if (node) {
          node.remove();
        }
        console.log("活动推广");
      });
      return;
    }
  }

  function start() {
    console.log("[Pake Adblock] start");

    const boot = () => {
      removeAds();

      setTimeout(() => {
        adObserver = new MutationObserver(() => {
          console.log("[Pake Adblock] mutation observed");
          removeAds();
        });

        adObserver.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });
      }, 3000);
    };

    if (document.readyState === "complete") {
      boot();
    } else {
      window.addEventListener("load", boot, { once: true });
    }
  }

  window.addEventListener("pake:toggle-adblock", () => {
    enabled = !enabled;
    console.log(
      `[Pake Adblock] ${enabled ? "enabled" : "disabled"} by shortcut`,
    );
    if (enabled) {
      removeAds();
    } else if (adObserver) {
      adObserver.disconnect();
      adObserver = null;
    }
  });

  start();
})();
}
