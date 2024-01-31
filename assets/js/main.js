
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  !(function () {
    window;
    const e = document.documentElement;
    console.log("calling")
    if ((e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations"))) {
        (window.sr = ScrollReveal()).reveal(".feature, .pricing-table-inner", { duration: 600, distance: "20px", easing: "cubic-bezier(0.5, -0.01, 0, 1.005)", origin: "bottom", interval: 100 }),
            e.classList.add("anime-ready"),
            console.log("Calling animation"),
            anime
                .timeline({ targets: ".hero-figure-box-05" })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
                .add({ duration: 800, rotateY: "-15deg", rotateX: "8deg", rotateZ: "-1deg" }),
            anime
                .timeline({ targets: ".hero-figure-box-06, .hero-figure-box-07" })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
                .add({ duration: 800, rotateZ: "20deg" }),
            anime({
                targets: ".hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10",
                duration: anime.random(600, 800),
                delay: anime.random(600, 800),
                rotate: [
                    anime.random(-360, 360),
                    function (e) {
                        return e.getAttribute("data-rotation");
                    },
                ],
                scale: [0.7, 1],
                opacity: [0, 1],
                easing: "easeInOutExpo",
            });
    }
  })();

})()

// !(function () {
//   window;
//   const e = document.documentElement;
//   if ((e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations"))) {
//       (window.sr = ScrollReveal()).reveal(".feature, .pricing-table-inner", { duration: 600, distance: "20px", easing: "cubic-bezier(0.5, -0.01, 0, 1.005)", origin: "bottom", interval: 100 }),
//           e.classList.add("anime-ready"),
//           anime
//               .timeline({ targets: ".hero-figure-box-05" })
//               .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
//               .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
//               .add({ duration: 800, rotateY: "-15deg", rotateX: "8deg", rotateZ: "-1deg" }),
//           anime
//               .timeline({ targets: ".hero-figure-box-06, .hero-figure-box-07" })
//               .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
//               .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
//               .add({ duration: 800, rotateZ: "20deg" }),
//           anime({
//               targets: ".hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10",
//               duration: anime.random(600, 800),
//               delay: anime.random(600, 800),
//               rotate: [
//                   anime.random(-360, 360),
//                   function (e) {
//                       return e.getAttribute("data-rotation");
//                   },
//               ],
//               scale: [0.7, 1],
//               opacity: [0, 1],
//               easing: "easeInOutExpo",
//           });
//   }
// })();
