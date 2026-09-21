(() => {
  const config = {
    vkPixelId: 3794718,
    yandexMetrikaId: 107188789,
    purchaseGoal: "Клик 'Купить билет'",
    yandexPurchaseGoal: "ticket_click"
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

  const metrikaSource = `https://mc.yandex.ru/metrika/tag.js?id=${config.yandexMetrikaId}`;
  if (!isLocalPreview && !Array.from(document.scripts).some((script) => script.src === metrikaSource)) {
    const metrikaScript = document.createElement("script");
    metrikaScript.async = true;
    metrikaScript.src = metrikaSource;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(metrikaScript, firstScript);
  }

  window.ym(config.yandexMetrikaId, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });
})();
