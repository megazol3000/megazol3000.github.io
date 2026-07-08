(function() {
  'use strict';

  // ===== DOM-элементы =====
  const plateInput = document.getElementById('plateInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const searchForm = document.getElementById('searchForm');
  const statusMessage = document.getElementById('statusMessage');
  const statusText = document.getElementById('statusText');
  const paySection = document.getElementById('paySection');
  const payBtn = document.getElementById('payBtn');

  const modal = document.getElementById('feedbackModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const feedbackForm = document.getElementById('feedbackForm');

  const nameInput = document.getElementById('feedbackName');
  const phoneInput = document.getElementById('feedbackPhone');
  const nameField = document.getElementById('nameField');
  const phoneField = document.getElementById('phoneField');

  const tgBtn = document.getElementById('tgBtn');
  const wappBtn = document.getElementById('wappBtn');
  const maxBtn = document.getElementById('maxBtn');

  // ===== ВАЛИДАЦИЯ НОМЕРА =====
  // Формат: 1 буква + 3 цифры + 2 буквы + 2-3 цифры (регион)
  // Пример: A123BC123 или A123BC12

  function formatRussianPlate(value) {
    let raw = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (raw.length > 12) raw = raw.substring(0, 12);
    return raw;
  }

  function validateRussianPlate(value) {
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (!/^[A-Z0-9]+$/.test(trimmed)) return false;
    if (trimmed.length < 8 || trimmed.length > 9) return false;
    const match = trimmed.match(/^([A-Z])([0-9]{3})([A-Z]{2})([0-9]{2,3})$/);
    return !!match;
  }

  // ===== СОБЫТИЯ ПОЛЯ ВВОДА =====
  plateInput.addEventListener('input', function(e) {
    const start = this.selectionStart;
    const oldValue = this.value;
    let newValue = formatRussianPlate(oldValue);

    if (newValue !== oldValue) {
      this.value = newValue;
      let cursorPos = start;
      if (newValue.length < oldValue.length) {
        cursorPos = start - 1;
      }
      this.setSelectionRange(cursorPos, cursorPos);
    }

    this.classList.remove('error');
    if (!validateRussianPlate(this.value)) {
      paySection.classList.remove('visible');
    }
  });

  plateInput.addEventListener('blur', function() {
    const val = this.value.trim();
    if (val.length > 0) {
      if (!validateRussianPlate(val)) {
        this.classList.add('error');
        paySection.classList.remove('visible');
      } else {
        this.classList.remove('error');
      }
    } else {
      this.classList.remove('error');
      paySection.classList.remove('visible');
    }
  });

  // ===== ОЧИСТКА =====
  function clearInput() {
    plateInput.value = '';
    plateInput.classList.remove('error');
    plateInput.focus();
    statusMessage.classList.remove('visible');
    paySection.classList.remove('visible');
  }

  clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clearInput();
  });

  // ===== ПОИСК (ДЕМО) =====
  function handleSearch(e) {
    e.preventDefault();

    const plate = plateInput.value.trim();

    if (!validateRussianPlate(plate)) {
      plateInput.classList.add('error');
      statusText.innerText = '⚠️ Введите корректный номер (формат: A123BC123 или A123BC12)';
      statusMessage.classList.add('visible');
      statusMessage.style.borderLeftColor = '#e74c3c';
      paySection.classList.remove('visible');
      return;
    }

    plateInput.classList.remove('error');

    statusText.innerText = `🔍 Проверяем номер «${plate}» ... (демо)`;
    statusMessage.classList.add('visible');
    statusMessage.style.borderLeftColor = '#1d7cf0';
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Загрузка';
    paySection.classList.remove('visible');

    setTimeout(() => {
      const hasFine = Math.random() > 0.45;
      if (hasFine) {
        statusText.innerText = `🚨 Найдено нарушение для ${plate}. Штраф: 100-300₾ (тестовый ответ)`;
        statusMessage.style.borderLeftColor = '#e74c3c';
        paySection.classList.add('visible');
      } else {
        statusText.innerText = `✅ Штрафов для ${plate} не найдено.`;
        statusMessage.style.borderLeftColor = '#2ecc71';
        paySection.classList.remove('visible');
      }
      searchBtn.disabled = false;
      searchBtn.innerHTML = '<i class="fas fa-search"></i> Поиск';
    }, 1200);
  }

  searchForm.addEventListener('submit', handleSearch);
  searchBtn.addEventListener('click', handleSearch);

  // ===== МОДАЛЬНОЕ ОКНО =====
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    nameInput.focus();
    nameField.classList.remove('error');
    phoneField.classList.remove('error');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    feedbackForm.reset();
    nameField.classList.remove('error');
    phoneField.classList.remove('error');
  }

  payBtn.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ===== ОТПРАВКА ФОРМЫ =====
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();

    if (!nameVal) {
      nameField.classList.add('error');
      isValid = false;
    } else {
      nameField.classList.remove('error');
    }

    if (!phoneVal) {
      phoneField.classList.add('error');
      isValid = false;
    } else {
      phoneField.classList.remove('error');
    }

    if (!isValid) {
      if (!nameVal) nameInput.focus();
      else if (!phoneVal) phoneInput.focus();
      return;
    }

    const submitBtn = document.getElementById('modalSubmitBtn');
    const originalHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка...';

    setTimeout(() => {
      alert('✅ Спасибо! Мы свяжемся с вами для оплаты штрафа.');
      closeModal();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }, 1000);
  });

  nameInput.addEventListener('input', function() {
    if (this.value.trim()) nameField.classList.remove('error');
  });
  phoneInput.addEventListener('input', function() {
    if (this.value.trim()) phoneField.classList.remove('error');
  });

  // ===== МЕССЕНДЖЕРЫ =====
  tgBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('📱 Переход в Telegram\n(здесь будет ссылка на ваш канал/бот)');
  });

  wappBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('💬 Переход в WhatsApp\n(здесь будет ссылка на ваш номер)');
  });

  maxBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('📲 Переход в MAX\n(здесь будет ссылка на ваш профиль)');
  });

  // ===== ИНИЦИАЛИЗАЦИЯ =====
  statusMessage.classList.remove('visible');
  paySection.classList.remove('visible');

  plateInput.addEventListener('focus', function() {
    statusMessage.classList.remove('visible');
  });

})();
