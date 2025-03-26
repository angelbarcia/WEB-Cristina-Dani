document.addEventListener("DOMContentLoaded", function () {
  // Navegación móvil
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("show");
    });
  }

  // Navegación activa
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);

  // Tabs de precios
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover active de todos los botones y paneles
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Añadir active al botón clickeado
      this.classList.add("active");

      // Mostrar el panel correspondiente
      const target = this.dataset.target;
      document.getElementById(target).classList.add("active");
    });
  });

  // Formulario de contacto
  const contactForm = document.getElementById("cita-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const servicio = document.getElementById("servicio").value;
      const mensaje = document.getElementById("mensaje").value;

      // Aquí normalmente enviarías los datos a un servidor
      // Para este ejemplo, solo mostraremos un mensaje de confirmación

      alert(
        `¡Gracias ${nombre}! Hemos recibido tu solicitud de cita para ${
          servicio || "nuestros servicios"
        }. Te contactaremos pronto al ${telefono}.`
      );

      // Limpiar formulario
      contactForm.reset();
    });
  }

  // Animación de scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Cerrar menú móvil si está abierto
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("show");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animación de entrada para las tarjetas de servicio
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".servicio-card, .price-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // Añadir clase de animación cuando los elementos son visibles
  document.addEventListener("scroll", function () {
    document.querySelectorAll(".animate").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });
});
