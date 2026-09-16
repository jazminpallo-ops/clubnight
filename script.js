// ---------- MOBILE / DESKTOP MENU ----------
    const menuButton = document.getElementById("menuButton");
    const menuPanel = document.getElementById("menuPanel");
    const menuLinks = document.querySelectorAll(".menu-links a");

    function toggleMenu(force) {
      const shouldOpen =
        typeof force === "boolean"
          ? force
          : !menuPanel.classList.contains("open");

      menuPanel.classList.toggle("open", shouldOpen);
      menuButton.classList.toggle("open", shouldOpen);
      menuButton.setAttribute("aria-expanded", shouldOpen);
      menuPanel.setAttribute("aria-hidden", !shouldOpen);
      document.body.style.overflow = shouldOpen ? "hidden" : "";
    }

    menuButton.addEventListener("click", () => toggleMenu());

    menuLinks.forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleMenu(false);
    });

    // ---------- FAQ ACCORDIONS ----------
    document.querySelectorAll(".faq-question").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.classList.contains("open");

        // Close other FAQs so only one is open at a time.
        document.querySelectorAll(".faq-item.open").forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("open", !isOpen);
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    // ---------- STICKY GET YOUR TICKETS ----------
    const stickyTicket = document.getElementById("stickyTicket");
    const hero = document.querySelector(".hero");
    const tickets = document.getElementById("tickets");

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the sticky button after leaving the hero,
        // but hide it again once the actual ticket section is visible.
        stickyTicket.classList.toggle("visible", !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);

    const ticketObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stickyTicket.classList.remove("visible");
        } else if (window.scrollY > window.innerHeight * 0.5) {
          stickyTicket.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );

    ticketObserver.observe(tickets);
