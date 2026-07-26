(() => {
  "use strict";

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const dialog = document.getElementById("checkoutDialog");
  const termsCheck = document.getElementById("termsCheck");
  const copyCode = document.getElementById("copyCode");

  navToggle?.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  let currentStep = 1;

  const setStep = (step) => {
    currentStep = step;
    document.querySelectorAll(".checkout-step").forEach(section => {
      section.classList.toggle("active", Number(section.dataset.step) === step);
    });
  };

  document.querySelectorAll("[data-open-demo]").forEach(button => {
    button.addEventListener("click", () => {
      setStep(1);
      if (termsCheck) termsCheck.checked = false;
      const continueButton = document.querySelector('[data-step="1"] [data-next]');
      if (continueButton) continueButton.disabled = true;
      dialog.showModal();
    });
  });

  termsCheck?.addEventListener("change", () => {
    const continueButton = document.querySelector('[data-step="1"] [data-next]');
    if (continueButton) continueButton.disabled = !termsCheck.checked;
  });

  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => setStep(Math.min(currentStep + 1, 4)));
  });

  document.querySelectorAll("[data-funding]").forEach(button => {
    button.addEventListener("click", () => setStep(3));
  });

  dialog?.addEventListener("close", () => setStep(1));

  copyCode?.addEventListener("click", async () => {
    const code = document.getElementById("merchantCode")?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(code);
      copyCode.textContent = "Copied";
      setTimeout(() => copyCode.textContent = "Copy", 1400);
    } catch {
      copyCode.textContent = "Select manually";
    }
  });

  const canvas = document.getElementById("networkCanvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles = [];

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * scale);
    canvas.height = Math.floor(innerHeight * scale);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    const count = Math.min(70, Math.max(22, Math.floor(innerWidth / 20)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.5 + .4
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((p, i) => {
      if (!reduceMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(121,244,255,.55)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(121,244,255,${(1 - d / 110) * .12})`;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };

  addEventListener("resize", resize);
  resize();
  draw();
})();
