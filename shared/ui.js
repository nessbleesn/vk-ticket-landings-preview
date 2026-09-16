(() => {
  const weather = document.querySelector("[data-weather-widget]");
  if (weather) {
    const status = weather.querySelector(".weather-status");
    const mount = weather.querySelector("[data-weather-mount]");
    const attribution = weather.querySelector(".weather-attribution");
    const weatherMeta = (code) => {
      if (code === 0) return { icon: "clear", text: "Ясно" };
      if (code <= 2) return { icon: "partly", text: "Облачно с прояснениями" };
      if (code === 3) return { icon: "cloud", text: "Пасмурно" };
      if (code === 45 || code === 48) return { icon: "fog", text: "Туман" };
      if (code >= 51 && code <= 67 || code >= 80 && code <= 82) return { icon: "rain", text: "Дождь" };
      if (code >= 71 && code <= 77 || code >= 85 && code <= 86) return { icon: "snow", text: "Снег" };
      if (code >= 95) return { icon: "thunder", text: "Гроза" };
      return { icon: "partly", text: "Переменная облачность" };
    };
    const weatherIcon = (type) => {
      const icons = {
        clear: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="wx-sun" cx="24" cy="24" r="9"/><path d="M24 5v6m0 26v6M5 24h6m26 0h6M10.6 10.6l4.3 4.3m18.2 18.2 4.3 4.3m0-26.8-4.3 4.3M14.9 33.1l-4.3 4.3"/></svg>',
        partly: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="wx-sun" cx="17" cy="17" r="8"/><path class="wx-cloud" d="M36 38H17a9 9 0 0 1-.5-18 12 12 0 0 1 22 5A6.5 6.5 0 0 1 36 38Z"/></svg>',
        cloud: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="wx-cloud" d="M38 37H14a10 10 0 0 1-.7-20A14 14 0 0 1 40 23.5 7 7 0 0 1 38 37Z"/></svg>',
        fog: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="wx-cloud" d="M37 29H15a9 9 0 0 1-.5-18A13 13 0 0 1 39 18a6 6 0 0 1-2 11Z"/><path d="M10 35h28M15 41h20"/></svg>',
        rain: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="wx-cloud" d="M38 29H14a9 9 0 0 1-.5-18A13 13 0 0 1 40 18a6.5 6.5 0 0 1-2 11Z"/><path class="wx-rain" d="m16 35-2 6m10-6-2 6m10-6-2 6"/></svg>',
        snow: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="wx-cloud" d="M38 27H14a9 9 0 0 1-.5-18A13 13 0 0 1 40 16a6.5 6.5 0 0 1-2 11Z"/><path d="M17 34v9m-4.5-4.5h9m9.5-4.5v9m-4.5-4.5h9"/></svg>',
        thunder: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="wx-cloud" d="M38 27H14a9 9 0 0 1-.5-18A13 13 0 0 1 40 16a6.5 6.5 0 0 1-2 11Z"/><path class="wx-bolt" d="m25 29-7 10h7l-2 7 9-12h-7Z"/></svg>'
      };
      return icons[type] || icons.partly;
    };
    const dayLabel = (date, index) => {
      if (index === 0) return "Сегодня";
      if (index === 1) return "Завтра";
      return new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(new Date(date + "T12:00:00"));
    };
    const renderWeather = (daily) => {
      mount.replaceChildren();
      daily.time.slice(0, 3).forEach((date, index) => {
        const meta = weatherMeta(Number(daily.weather_code[index]));
        const high = Math.round(Number(daily.temperature_2m_max[index]));
        const low = Math.round(Number(daily.temperature_2m_min[index]));
        const rain = Math.round(Number(daily.precipitation_probability_max[index] || 0));
        const card = document.createElement("article");
        card.className = "forecast-card";
        card.setAttribute("role", "listitem");
        card.innerHTML = '<div class="forecast-day"><strong></strong><span></span></div><span class="forecast-icon"></span><div class="forecast-temp"><strong></strong><span></span></div><p class="forecast-description"></p><p class="forecast-rain"><span aria-hidden="true">●</span> Осадки <strong></strong></p>';
        card.querySelector(".forecast-day strong").textContent = dayLabel(date, index);
        card.querySelector(".forecast-day span").textContent = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(new Date(date + "T12:00:00"));
        card.querySelector(".forecast-icon").innerHTML = weatherIcon(meta.icon);
        card.querySelector(".forecast-temp strong").textContent = (high > 0 ? "+" : "") + high + "°";
        card.querySelector(".forecast-temp span").textContent = (low > 0 ? "+" : "") + low + "°";
        card.querySelector(".forecast-description").textContent = meta.text;
        card.querySelector(".forecast-rain strong").textContent = rain + "%";
        mount.append(card);
      });
      status.hidden = true;
      weather.setAttribute("aria-busy", "false");
    };
    const loadProviderFallback = () => new Promise((resolve, reject) => {
      mount.replaceChildren();
      mount.classList.add("is-provider");
      const widget = document.createElement("div");
      widget.id = "ww_4bf6b2ba577be";
      widget.setAttribute("v", "1.3");
      widget.setAttribute("loc", "id");
      widget.setAttribute("a", JSON.stringify({ t: "responsive", lang: "ru", sl_lpl: 1, ids: ["wl3996"], font: "Arial", sl_ics: "one", sl_sot: "celsius", cl_bkg: "rgba(255,255,255,1)", cl_font: "rgba(18,58,86,1)", cl_cloud: "rgba(122,145,161,1)", cl_persp: "#81D4FA", cl_sun: "#FFC107", cl_moon: "#FFC107", cl_thund: "#FF5722", sl_tof: "3" }));
      const source = document.createElement("a");
      source.id = widget.id + "_u";
      source.href = "https://weatherwidget.org/";
      source.target = "_blank";
      source.rel = "noopener";
      source.textContent = "Free weather widget for website";
      widget.append(source);
      mount.append(widget);
      const finish = () => {
        if (!widget.querySelector(".ww-box")) return;
        observer.disconnect();
        clearTimeout(fallbackTimer);
        status.hidden = true;
        weather.setAttribute("aria-busy", "false");
        attribution.innerHTML = 'Данные: <a href="https://weatherwidget.org/" target="_blank" rel="noopener">WeatherWidget.org</a>';
        resolve();
      };
      const observer = new MutationObserver(finish);
      observer.observe(widget, { childList: true, subtree: true });
      const fallbackTimer = setTimeout(() => {
        observer.disconnect();
        reject(new Error("weather fallback"));
      }, 30000);
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://app3.weatherwidget.org/js/?id=" + widget.id;
      script.addEventListener("error", () => reject(new Error("weather fallback")), { once: true });
      mount.append(script);
      finish();
    });
    const loadWeather = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      const url = "https://api.open-meteo.com/v1/forecast?latitude=55.771475&longitude=37.434666"
        + "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
        + "&timezone=Europe%2FMoscow&forecast_days=3";
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("weather " + response.status);
        const data = await response.json();
        if (!data.daily || data.daily.time?.length < 3) throw new Error("weather data");
        renderWeather(data.daily);
      } catch {
        try {
          await loadProviderFallback();
        } catch {
          status.textContent = "Прогноз сейчас недоступен. Посмотрите погоду по ссылке на Яндекс выше.";
          weather.setAttribute("aria-busy", "false");
        }
      } finally {
        clearTimeout(timer);
      }
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        loadWeather();
      }, { rootMargin: "200px" });
      observer.observe(weather);
    } else loadWeather();
  }
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const microGoal = (goal, payload = {}) => window.parkskazkaTrackGoal?.(goal, payload, { purchase: false });
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll(".gallery-slide")];
    const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];
    const status = gallery.querySelector(".gallery-status");
    const counter = gallery.querySelector(".gallery-counter");
    let active = 0;
    const select = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        slide.hidden = n !== active;
        slide.classList.toggle("fade-in", n === active && !reducedMotion.matches);
      });
      thumbs.forEach((thumb, n) => thumb.setAttribute("aria-pressed", String(n === active)));
      counter.textContent = (active + 1) + " / " + slides.length;
      status.textContent = slides[active].querySelector("img").alt;
      microGoal("gallery_photo_view", { photo: slides[active].dataset.name });
    };
    thumbs.forEach((thumb, index) => thumb.addEventListener("click", () => select(index)));
    gallery.querySelectorAll("[data-gallery-step]").forEach((arrow) => arrow.addEventListener("click", () => select(active + Number(arrow.dataset.galleryStep))));
    // No automatic rotation: visitors keep control of the photos.
    thumbs.forEach((thumb, index) => thumb.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + slides.length) % slides.length;
      thumbs[next].focus();
      select(next);
    }));
  });

  const dialog = document.querySelector("#detail-dialog");
  const content = dialog?.querySelector("[data-dialog-content]");
  let opener;
  document.querySelectorAll("[data-dialog-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const template = document.getElementById(button.dataset.dialogTemplate);
      if (!dialog || !template || !content) return;
      opener = button;
      content.replaceChildren(template.content.cloneNode(true));
      const title = content.querySelector("h2");
      if (title) { title.id = "dialog-title"; dialog.setAttribute("aria-labelledby", title.id); }
      if (typeof dialog.showModal !== "function") { content.scrollIntoView(); dialog.setAttribute("open", ""); }
      else dialog.showModal();
      document.documentElement.classList.add("dialog-open");
      microGoal(button.dataset.dialogGoal || "location_description_open", { item: button.dataset.dialogTemplate });
      const tasks = [...content.querySelectorAll(".mission input")];
      const progress = content.querySelector(".mission-status");
      tasks.forEach((task) => task.addEventListener("change", () => {
        const count = tasks.filter((input) => input.checked).length;
        progress.textContent = count === tasks.length ? "Все задания выполнены — сохраните этот день в семейном альбоме!" : "Ваши открытия: " + count + " из " + tasks.length;
      }));
      content.querySelectorAll("[data-close-dialog]").forEach((link) => link.addEventListener("click", () => dialog.close()));
    });
  });
  if (dialog) {
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("dialog-open");
      opener?.focus({ preventScroll: true });
    });
  }
})();
