(() => {
  const config = {
    vkPixelId: 3782185,
    yandexMetrikaId: 37767130,
    purchaseGoal: "choose_ticket_click"
  };

  window.PARK_TRACKING = Object.freeze(config);
  const isLocalPreview = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

  window._tmr = window._tmr || [];
  window._tmr.push({ id: config.vkPixelId, type: "pageView", start: Date.now() });

  if (!isLocalPreview && !document.getElementById("tmr-code")) {
    const topMailScript = document.createElement("script");
    topMailScript.type = "text/javascript";
    topMailScript.async = true;
    topMailScript.id = "tmr-code";
    topMailScript.src = "https://top-fwz1.mail.ru/js/code.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(topMailScript, firstScript);
  }

  window.ym = window.ym || function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = window.ym.l || Date.now();

  if (!isLocalPreview && !Array.from(document.scripts).some((script) => script.src === "https://mc.yandex.ru/metrika/tag.js")) {
    const metrikaScript = document.createElement("script");
    metrikaScript.async = true;
    metrikaScript.src = "https://mc.yandex.ru/metrika/tag.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(metrikaScript, firstScript);
  }

  window.ym(config.yandexMetrikaId, "init", {
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });
})();
