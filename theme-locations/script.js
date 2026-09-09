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

window.parkskazkaTrackGoal = (goal, payload = {}) => {
  const event = { event: "parkskazka_goal", goal, page: document.body.dataset.page, ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  const ymId = window.PARK_TRACKING?.yandexMetrikaId;
  if (ymId && typeof window.ym === "function") window.ym(ymId, "reachGoal", goal, event);

  const vkPixelId = window.PARK_TRACKING?.vkPixelId;
  const purchaseGoal = window.PARK_TRACKING?.purchaseGoal;
  if (vkPixelId && purchaseGoal) {
    window._tmr = window._tmr || [];
    window._tmr.push({ type: "reachGoal", id: vkPixelId, goal: purchaseGoal });
  }

  if (window.VK?.Retargeting?.Event) window.VK.Retargeting.Event(goal);
  window.dispatchEvent(new CustomEvent("parkskazka:goal", { detail: event }));
};

document.querySelectorAll("[data-goal]").forEach((element) => {
  element.addEventListener("click", () => {
    window.parkskazkaTrackGoal(element.dataset.goal, { destination: element.href });
  });
});

const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const trailBoard = document.querySelector(".trail-board");

if (trailBoard) {
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const routeObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      trailBoard.classList.add("is-route-active");
      routeObserver.disconnect();
    }, { threshold: 0.18 });
    routeObserver.observe(trailBoard);
  } else {
    trailBoard.classList.add("is-route-active");
  }
}
