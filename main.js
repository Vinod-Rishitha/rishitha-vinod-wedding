(function () {
  "use strict";

  var C = window.INVITE;
  var root = document.documentElement;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Language ---------- */
  var LANG_KEY = "rv-invite-lang";
  var lang = "en";

  function storedLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "te" || fromUrl === "en") return fromUrl;
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  }

  function applyText(next) {
    lang = C.text[next] ? next : "en";
    var t = C.text[lang];
    root.lang = lang;
    document.title = t.pageTitle;

    $$("[data-t]").forEach(function (el) {
      var value = t[el.getAttribute("data-t")];
      if (value == null) return;
      // Hide lines that are empty in this language, without un-hiding
      // elements that are hidden for other reasons (e.g. the countdown's end message).
      if (value === "") { el.hidden = true; el.setAttribute("data-empty", ""); return; }
      if (el.hasAttribute("data-empty")) { el.hidden = false; el.removeAttribute("data-empty"); }
      var isTodo = /^TODO/.test(value);
      el.textContent = isTodo ? value.replace(/^TODO:\s*/, "To add: ") : value;
      el.classList.toggle("todo", isTodo);
    });
    $$("[data-t-alt]").forEach(function (el) { el.alt = t[el.getAttribute("data-t-alt")] || ""; });
    $$("[data-t-aria]").forEach(function (el) { el.setAttribute("aria-label", t[el.getAttribute("data-t-aria")] || ""); });

    $$(".lang-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    // WhatsApp share text follows the language on screen.
    var share = $(".share-whatsapp");
    if (share) share.href = "https://wa.me/?text=" + encodeURIComponent(t.shareMessage + "\n" + C.siteUrl);

    renderGallery();
    updateMusicLabel();
  }

  $$(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = b.getAttribute("data-lang");
      try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* private mode */ }
      applyText(next);
    });
  });

  /* ---------- Links: maps and Google Calendar ---------- */
  function gcalStamp(iso) {
    return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }
  function gcalUrl(key) {
    var ev = C.events[key];
    var en = C.text.en;
    var title = key === "reception"
      ? "Rishitha & Vinod Sai: Reception"
      : "Rishitha & Vinod Sai: Wedding muhurtham";
    var params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: gcalStamp(ev.start) + "/" + gcalStamp(ev.end),
      ctz: "Asia/Kolkata",
      location: en.venueName + ", " + en.venueAddress,
      details: "Invitation: " + C.siteUrl,
    });
    return "https://calendar.google.com/calendar/render?" + params.toString();
  }
  $$(".event").forEach(function (card) {
    var a = $(".cal-google", card);
    if (a) a.href = gcalUrl(card.getAttribute("data-event"));
  });
  $(".directions").href = C.mapsUrl;

  /* ---------- Countdown ---------- */
  var target = new Date(C.events.muhurtham.start).getTime();
  var nums = {};
  $$("[data-unit]").forEach(function (el) { nums[el.getAttribute("data-unit")] = el; });
  var timer = null;

  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var left = target - Date.now();
    if (left <= 0) {
      $(".countdown-clock").hidden = true;
      $(".countdown-done").hidden = false;
      if (timer) clearInterval(timer);
      return;
    }
    var s = Math.floor(left / 1000);
    nums.days.textContent = pad(Math.floor(s / 86400));
    nums.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    nums.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    nums.seconds.textContent = pad(s % 60);
  }
  tick();
  timer = setInterval(tick, 1000);

  /* ---------- Gallery and lightbox ---------- */
  var photos = C.photos || [];
  var lightbox = $(".lightbox");
  var lbImg = $(".lightbox-img");
  var current = 0;

  function renderGallery() {
    var section = $(".gallery");
    if (!photos.length) { section.hidden = true; return; }
    section.hidden = false;
    var grid = $(".gallery-grid");
    grid.textContent = "";
    // A collage on a 4-wide grid of squares: each photo spans w × h squares.
    photos.forEach(function (p, i) {
      var li = document.createElement("li");
      li.style.gridColumn = "span " + (p.w || 2);
      li.style.gridRow = "span " + (p.h || 2);
      if (p.focus) li.style.setProperty("--focus", p.focus);
      var btn = document.createElement("button");
      btn.type = "button";
      var img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
      btn.addEventListener("click", function () { openPhoto(i); });
      li.appendChild(btn);
      grid.appendChild(li);
    });
  }
  function showPhoto(i) {
    current = (i + photos.length) % photos.length;
    lbImg.src = photos[current].src;
    lbImg.alt = photos[current].alt || "";
  }
  function openPhoto(i) {
    showPhoto(i);
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }
  function closePhoto() {
    if (typeof lightbox.close === "function") lightbox.close();
    else lightbox.removeAttribute("open");
  }
  $(".lightbox-close").addEventListener("click", closePhoto);
  $(".lightbox-prev").addEventListener("click", function () { showPhoto(current - 1); });
  $(".lightbox-next").addEventListener("click", function () { showPhoto(current + 1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closePhoto(); });
  lightbox.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") showPhoto(current - 1);
    if (e.key === "ArrowRight") showPhoto(current + 1);
  });
  var touchX = null;
  lightbox.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) showPhoto(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Music ---------- */
  var audio = $(".bgm");
  var musicBtn = $(".music-toggle");
  var wantsMusic = Boolean(C.music);
  if (wantsMusic) audio.src = C.music;

  function updateMusicLabel() {
    if (!musicBtn) return;
    var t = C.text[lang];
    var playing = musicBtn.getAttribute("aria-pressed") === "true";
    var label = playing ? t.musicOff : t.musicOn;
    musicBtn.setAttribute("aria-label", label);
    musicBtn.title = label;
  }
  function setPlaying(on) {
    musicBtn.setAttribute("aria-pressed", String(on));
    updateMusicLabel();
  }
  // Fade in gently so the music never starts loud.
  function fadeIn() {
    var target = 0.5, step = 0.025;
    var t = setInterval(function () {
      if (audio.paused) { clearInterval(t); return; }
      audio.volume = Math.min(target, audio.volume + step);
      if (audio.volume >= target) clearInterval(t);
    }, 120);
  }
  function playMusic() {
    if (!wantsMusic) return;
    audio.volume = 0;
    var p = audio.play();
    if (p && p.then) p.then(function () { setPlaying(true); fadeIn(); }, function () { setPlaying(false); });
    else { setPlaying(true); fadeIn(); }
  }
  musicBtn.addEventListener("click", function () {
    if (audio.paused) playMusic();
    else { audio.pause(); setPlaying(false); }
  });
  // Pause when the guest switches away from the tab or app; resume when they return.
  var pausedByHide = false;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && !audio.paused) {
      audio.pause(); setPlaying(false); pausedByHide = true;
    } else if (!document.hidden && pausedByHide) {
      pausedByHide = false; playMusic();
    }
  });

  /* ---------- Petals: a shower on opening, then a gentle fall that never stops ---------- */
  var PETAL_COLORS = ["#E99A2C", "#F2B33D", "#E07A1F", "#B8323A", "#C9474E", "#FBF5EA", "#F6EEDF"];

  function makePetal(i, opts) {
    var p = document.createElement("span");
    p.className = opts.loop ? "petal is-loop" : "petal";
    var d = opts.minDur + Math.random() * opts.spread;
    p.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
    p.style.setProperty("--w", (opts.minSize + Math.random() * 6).toFixed(1) + "px");
    p.style.setProperty("--c", PETAL_COLORS[i % PETAL_COLORS.length]);
    p.style.setProperty("--d", d.toFixed(2) + "s");
    p.style.setProperty("--delay", (opts.startAfter + Math.random() * (opts.loop ? d : 2.2)).toFixed(2) + "s");
    return p;
  }

  function showerPetals() {
    if (reduceMotion) return;

    // 1. The opening shower: a quick, fuller burst that clears itself away.
    var burst = document.createElement("div");
    burst.className = "petals";
    burst.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 28; i++) {
      burst.appendChild(makePetal(i, { loop: false, minDur: 5.5, spread: 3.5, minSize: 8, startAfter: 0 }));
    }
    document.body.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 12500);

    // 2. A lighter fall that keeps going for as long as the invitation is open.
    //    Fewer petals on phones so the text stays easy to read.
    var count = window.innerWidth < 640 ? 14 : 24;
    var drift = document.createElement("div");
    drift.className = "petals";
    drift.setAttribute("aria-hidden", "true");
    for (var j = 0; j < count; j++) {
      drift.appendChild(makePetal(j, { loop: true, minDur: 9, spread: 6, minSize: 7, startAfter: 2 }));
    }
    document.body.appendChild(drift);
  }

  /* ---------- Panels settle in as they scroll into view ---------- */
  function setUpReveals() {
    var items = $$(".invite, .blessings, .event, .countdown, .gallery, .venue, .share, .closing");
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }
  setUpReveals();

  /* ---------- Opening the invitation ---------- */
  var opened = false;
  function openInvitation() {
    if (opened) return;
    opened = true;
    root.classList.add("is-lit");
    showerPetals();
    playMusic();
    if (wantsMusic) musicBtn.hidden = false;

    var delay = reduceMotion ? 0 : 1100;
    setTimeout(function () {
      root.classList.remove("is-locked");
      root.classList.add("is-open");
      var main = $("#invitation");
      main.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      main.focus({ preventScroll: true });
    }, delay);
  }
  $(".open-btn").addEventListener("click", openInvitation);

  // Desktop side art appears once the cover has scrolled away.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      root.classList.toggle("is-past-cover", !entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe($(".cover"));
  }

  applyText(storedLang() || "en");
})();
