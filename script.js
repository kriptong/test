(() => {
  const cities = {
    spb: {
      label: 'Санкт-Петербург',
      shortLabel: 'САНКТ-ПЕТЕРБУРГ',
      address: 'ул. Подрезова, 26ББ',
      phone: '+7 911 003-05-88',
      tel: '+79110030588',
      email: 'petro13@litca.ru'
    },
    omsk: {
      label: 'Омск',
      shortLabel: 'ОМСК',
      address: 'ул. Пушкина, 76',
      phone: '+7 995 914-05-14',
      tel: '+79959140514',
      email: 'omsk@litca.ru'
    }
  };

  const citySelect = document.querySelector('#city-select');
  const dialogCity = document.querySelector('#dialog-city');
  const bookingDialog = document.querySelector('#booking-dialog');
  const footerLabel = document.querySelector('#footer-city-label');
  const footerAddress = document.querySelector('#footer-address');
  const footerPhone = document.querySelector('#footer-phone');
  const dialogAddress = document.querySelector('#dialog-address');
  const dialogCall = document.querySelector('#dialog-call');
  const emailLink = document.querySelector('.footer-email');

  function setCity(cityId) {
    const city = cities[cityId] || cities.spb;
    citySelect.value = cityId in cities ? cityId : 'spb';
    dialogCity.value = cityId in cities ? cityId : 'spb';
    footerLabel.textContent = city.shortLabel;
    footerAddress.textContent = city.address;
    footerPhone.textContent = city.phone;
    footerPhone.href = `tel:${city.tel}`;
    dialogAddress.textContent = city.address;
    dialogCall.href = `tel:${city.tel}`;
    dialogCall.innerHTML = `Позвонить ${city.phone} <span aria-hidden="true">↗</span>`;
    emailLink.href = `mailto:${city.email}`;
    emailLink.textContent = city.email;
    try { localStorage.setItem('litca-city', cityId); } catch (_) { /* storage may be disabled */ }
  }

  let savedCity = 'spb';
  try { savedCity = localStorage.getItem('litca-city') || 'spb'; } catch (_) { /* storage may be disabled */ }
  setCity(savedCity);
  citySelect.addEventListener('change', (event) => setCity(event.target.value));
  dialogCity.addEventListener('change', (event) => setCity(event.target.value));

  document.querySelectorAll('.open-booking').forEach((button) => {
    button.addEventListener('click', () => {
      if (bookingDialog.showModal) bookingDialog.showModal();
      else document.querySelector('#contacts').scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => bookingDialog.close());
  bookingDialog.addEventListener('click', (event) => {
    if (event.target === bookingDialog) bookingDialog.close();
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const header = document.querySelector('.header');
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
  document.querySelectorAll('.desktop-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    });
  });

  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const serviceCards = [...document.querySelectorAll('.service-card')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      serviceCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        card.hidden = filter !== 'all' && !categories.includes(filter);
      });
    });
  });
})();
