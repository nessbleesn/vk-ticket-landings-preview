document.documentElement.classList.add("js");

const TRACKING_KEYS = /^(utm_(source|medium|campaign|term|content)|vk_click_id|yclid|gclid)$/i;
const sourceParams = new URLSearchParams(window.location.search);

document.querySelectorAll("a[href*='pay.parkskazka.com']").forEach((link) => {
  const url = new URL(link.href);
  sourceParams.forEach((value, key) => {
    if (TRACKING_KEYS.test(key)) url.searchParams.set(key, value);
  });
  link.href = url.toString();
});

window.parkskazkaTrackGoal = (goal, payload = {}, { purchase = true } = {}) => {
  const event = { event: "parkskazka_goal", goal, page: document.body.dataset.page, ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  const ymId = window.PARK_TRACKING?.yandexMetrikaId;
  const yandexGoal = purchase ? window.PARK_TRACKING?.yandexPurchaseGoal : goal;
  if (ymId && yandexGoal && typeof window.ym === "function") window.ym(ymId, "reachGoal", yandexGoal, event);

  const vkPixelId = window.PARK_TRACKING?.vkPixelId;
  const purchaseGoal = window.PARK_TRACKING?.purchaseGoal;
  if (purchase && vkPixelId && purchaseGoal) {
    window._tmr = window._tmr || [];
    window._tmr.push({ type: "reachGoal", id: vkPixelId, goal: purchaseGoal });
  }

  if (window.VK?.Retargeting?.Event) window.VK.Retargeting.Event(goal);
  window.dispatchEvent(new CustomEvent("parkskazka:goal", { detail: event }));
};

document.querySelectorAll("[data-goal]").forEach((element) => {
  element.addEventListener("click", () => {
    window.parkskazkaTrackGoal(element.dataset.goal, {
      destination: element.href,
      product_id: element.dataset.productId,
      tariff: element.dataset.tariff,
      value: Number(element.dataset.price),
      currency: "RUB",
    });
  });
});

document.querySelectorAll("[data-micro-goal]").forEach((element) => {
  element.addEventListener("click", () => {
    window.parkskazkaTrackGoal(element.dataset.microGoal, { destination: element.href }, { purchase: false });
  });
});
