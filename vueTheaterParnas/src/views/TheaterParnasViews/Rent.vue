<script setup>
import { ref, onMounted } from 'vue'
import { vMaska } from "maska/vue"

const animated = ref(false)
const submitError = ref(false)
const showModal = ref(false)
const formSubmitted = ref(false)
const isSubmitting = ref(false)
const lastSubmissionTime = ref(0);
const statusMessage = ref('');

const formErrors = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const formData = ref({
  name: '',
  phone: '',
  email: '',
  space: '',
  date: '',
  message: ''
})

const validateField = (field) => {
  switch(field) {
    case 'name':
      if (!formData.value.name.trim()) {
        formErrors.value.name = 'Имя обязательно для заполнения'
      } else if (formData.value.name.trim().length < 2) {
        formErrors.value.name = 'Имя должно содержать минимум 2 символа'
      } else if (formData.value.name.trim().length > 25) {
        formErrors.value.name = 'Имя должно быть не длиннее 25 символов'
      } else {
        formErrors.value.name = ''
      }
      break
      
    case 'phone':
      if (!formData.value.phone) {
        formErrors.value.phone = 'Телефон обязателен для заполнения'
      } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.value.phone)) {
        formErrors.value.phone = 'Введите телефон в формате +7 (XXX) XXX-XX-XX'
      } else {
        formErrors.value.phone = ''
      }
      break
      
    case 'email':
      if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        formErrors.value.email = 'Введите корректный email'
      } else {
        formErrors.value.email = ''
      }
      break
      
    case 'message':
      if (formData.value.message && formData.value.message.length > 150) {
        formErrors.value.message = 'Сообщение должно быть не длиннее 150 символов'
      } else {
        formErrors.value.message = ''
      }
      break
  }
}

const validateForm = async () => {
  formErrors.value = { name: '', phone: '', email: '', message: '' }
  await new Promise(resolve => setTimeout(resolve, 10))
  
  let isValid = true

  // Validate name
  if (!formData.value.name.trim()) {
    formErrors.value.name = 'Имя обязательно для заполнения'
    isValid = false
  } else if (formData.value.name.trim().length < 2) {
    formErrors.value.name = 'Имя должно содержать минимум 2 символа'
    isValid = false
  } else if (formData.value.name.trim().length > 25) {
    formErrors.value.name = 'Имя должно быть не длиннее 25 символов'
    isValid = false
  }

  // Validate phone
  if (!formData.value.phone) {
    formErrors.value.phone = 'Телефон обязателен для заполнения'
    isValid = false
  } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.value.phone)) {
    formErrors.value.phone = 'Введите телефон в формате +7 (XXX) XXX-XX-XX'
    isValid = false
  }

  // Validate email if filled
  if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    formErrors.value.email = 'Введите корректный email'
    isValid = false
  }

  // Validate message if filled
  if (formData.value.message && formData.value.message.length > 150) {
    formErrors.value.message = 'Сообщение должно быть не длиннее 150 символов'
    isValid = false
  }

  return isValid
}

const handleBlur = (field) => {
  validateField(field)
  
  if (field === 'phone' && formData.value.phone && !formData.value.phone.includes('(')) {
    const digits = formData.value.phone.replace(/\D/g, '')
    if (digits.length >= 11) {
      const match = digits.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)
      if (match) {
        formData.value.phone = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
      }
    }
  }
}

const getErrorMessage = (error) => {
  if (error.message.includes('Failed to fetch')) {
    return 'Проблемы с интернет-соединением';
  } else if (error.message.includes('chat not found')) {
    return 'Ошибка сервера: чат не найден';
  }
  return 'Произошла ошибка при отправке';
};
const submitForm = async () => {
  document.activeElement.blur();
  await new Promise(resolve => setTimeout(resolve, 50));
  
  if (!(await validateForm())) return;

  // Проверка частоты отправки
  const now = Date.now();
  if (now - lastSubmissionTime.value < 5000) {
    submitError.value = 'Пожалуйста, не отправляйте слишком часто';
    return;
  }
  lastSubmissionTime.value = now;

  isSubmitting.value = true;
  submitError.value = false;
  statusMessage.value = '';

  try {
    // Проверка конфигурации
    if (!import.meta.env.VITE_TELEGRAM_BOT_TOKEN || !import.meta.env.VITE_TELEGRAM_CHAT_ID) {
      throw new Error('Конфигурация Telegram не настроена');
    }

    // Форматирование сообщения
    const messageText = formatTelegramMessage(formData.value);
    
    console.log('Отправка сообщения:', messageText); // Логирование
    
    // Отправка в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Ошибка отправки в Telegram');
    }

    formSubmitted.value = true;
    isSubmitting.value = false;
    setTimeout(closeModal, 3000);
  } catch (error) {
    console.error('Ошибка отправки:', error);
    submitError.value = true;
    isSubmitting.value = false;
    statusMessage.value = getErrorMessage(error);
  }
};

// Добавьте эту функцию в ваш <script setup>
const formatTelegramMessage = (formData) => {
  const spaceName = formatSpace(formData.space);
  const dateStr = formData.date ? new Date(formData.date).toLocaleDateString('ru-RU') : 'не указана';
  
  return `
<b>Новая заявка на аренду</b>
  
<b>Имя:</b> ${escapeHtml(formData.name)}
<b>Телефон:</b> ${escapeHtml(formData.phone)}
${formData.email ? `<b>Email:</b> ${escapeHtml(formData.email)}\n` : ''}
<b>Пространство:</b> ${spaceName}
<b>Дата:</b> ${dateStr}
${formData.message ? `<b>Сообщение:</b>\n${escapeHtml(formData.message)}` : ''}
  `.trim();
};

// Форматирование названия пространства
const formatSpace = (space) => {
  const spaces = {
    theater: 'Театральный зал-трансформер',
    ceramic: 'Керамическая мастерская',
    rehearsal: 'Репетиционный зал',
    other: 'Другое'
  };
  return space ? (spaces[space] || space) : 'не выбрано';
};

// Экранирование HTML для безопасности
const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animated.value = true
            }
        })
    }, { threshold: 0.1 })
    
    observer.observe(document.querySelector('.rent'))
})

const openModal = () => {
    showModal.value = true
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    formSubmitted.value = false
    isSubmitting.value = false
    submitError.value = false
    formData.value = {
      name: '',
      phone: '',
      email: '',
      space: '',
      date: '',
      message: ''
    }
    formErrors.value = {
      name: '',
      phone: '',
      email: '',
      message: ''
    }
  }, 300)
}

const handleMessageInput = (e) => {
  if (e.target.value.length > 150) {
    formData.value.message = e.target.value.slice(0, 150)
  } else {
    formData.value.message = e.target.value
  }
}
</script>

<template>
    <section class="rent">
        <div class="container">
            <div class="rent__wrapper">
                <h2 class="rent__title" :class="{ 'animate__animated animate__fadeInDown': animated }">Аренда пространства</h2>
                
                <div class="rent__content">
                    <div class="rent__info">
                        <p class="rent__subtitle" :class="{ 'animate__animated animate__fadeIn': animated }">Наши уникальные площадки для ваших идей</p>
                        
                        <div class="rent__features">
                            <div class="rent__feature" :class="{ 'animate__animated animate__fadeInLeft': animated }">
                                <div class="feature__icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="#45b7d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#45b7d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <h3 class="feature__title">Театральный зал-трансформер</h3>
                                <p class="feature__text">65-85 мест, профессиональное оборудование, гибкая планировка</p>
                            </div>
                            
                            <div class="rent__feature" :class="{ 'animate__animated animate__fadeInUp': animated }">
                                <div class="feature__icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4ecdc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#4ecdc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9 9H9.01" stroke="#4ecdc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15 9H15.01" stroke="#4ecdc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <h3 class="feature__title">Керамическая мастерская</h3>
                                <p class="feature__text">Уютное пространство для творческих мастер-классов и мероприятий</p>
                            </div>
                            
                            <div class="rent__feature" :class="{ 'animate__animated animate__fadeInRight': animated }">
                                <div class="feature__icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <h3 class="feature__title">Репетиционный зал</h3>
                                <p class="feature__text">С зеркалами и хореографическими станками - идеален для репетиций</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="rent__cta" :class="{ 'animate__animated animate__fadeIn': animated }">
                        <div class="cta__card">
                            <div class="cta__header">
                                <h3 class="cta__title">Хотите арендовать наше пространство?</h3>
                                <div class="cta__sparkle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#45b7d1"/>
                                    </svg>
                                </div>
                            </div>
                            <p class="cta__text">Оставьте заявку и мы подберём для вас идеальный вариант аренды</p>
                            <button class="cta__button" @click="openModal">
                                <span>Оставить заявку</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <p class="cta__note">Или звоните: +7 900 634 93 39, +7 969 797 59 59</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Window -->
        <transition name="modal">
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal-container">
                    <button class="modal-close" @click="closeModal" v-if="!isSubmitting">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    
                    <transition name="fade" mode="out-in">
                        <!-- Loading State -->
                        <div v-if="isSubmitting" key="loading" class="submission-status">
                            <div class="loading-spinner">
                                <svg width="60" height="60" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                                            <stop stop-color="#45b7d1" stop-opacity="0" offset="0%"/>
                                            <stop stop-color="#45b7d1" stop-opacity=".631" offset="63.146%"/>
                                            <stop stop-color="#45b7d1" offset="100%"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                        <g transform="translate(1 1)">
                                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                                <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 18 18"
                                                    to="360 18 18"
                                                    dur="0.9s"
                                                    repeatCount="indefinite" />
                                            </path>
                                            <circle fill="#45b7d1" cx="36" cy="18" r="1">
                                                <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 18 18"
                                                    to="360 18 18"
                                                    dur="0.9s"
                                                    repeatCount="indefinite" />
                                            </circle>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <h3 class="status-title">Отправка заявки...</h3>
                        </div>
                        
                        <!-- Form State -->
                        <div v-else-if="!formSubmitted" key="form">
                            <form class="modal-form" @submit.prevent="submitForm">
                                <div class="form-group">
                                    <label for="name">Ваше имя <span class="required">*</span></label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        v-model="formData.name"
                                        @blur="handleBlur('name')"
                                        placeholder="Иван Иванов"
                                        :class="{ 'error': formErrors.name }"
                                    >
                                    <span class="error-message" v-if="formErrors.name">{{ formErrors.name }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label for="phone">Телефон <span class="required">*</span></label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        v-model="formData.phone"
                                        v-maska="'+7 (###) ###-##-##'"
                                        @blur="handleBlur('phone')"
                                        placeholder="+7 (900) 123-45-67"
                                        :class="{ 'error': formErrors.phone }"
                                    >
                                    <span class="error-message" v-if="formErrors.phone">{{ formErrors.phone }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        v-model="formData.email"
                                        @blur="handleBlur('email')"
                                        placeholder="example@mail.com"
                                        :class="{ 'error': formErrors.email }"
                                    >
                                    <span class="error-message" v-if="formErrors.email">{{ formErrors.email }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label for="space">Интересующее пространство</label>
                                    <select id="space" v-model="formData.space">
                                        <option value="">Выберите вариант</option>
                                        <option value="theater">Театральный зал-трансформер</option>
                                        <option value="ceramic">Керамическая мастерская</option>
                                        <option value="rehearsal">Репетиционный зал</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="date">Желаемая дата</label>
                                    <input type="date" id="date" v-model="formData.date">
                                </div>
                                
                                <div class="form-group">
                                    <label for="message">Дополнительная информация</label>
                                    <textarea 
                                        id="message" 
                                        rows="3" 
                                        v-model="formData.message"
                                        @input="handleMessageInput"
                                        placeholder="Опишите ваше мероприятие (макс. 150 символов)"
                                        :class="{ 'error': formErrors.message }"
                                    ></textarea>
                                    <div class="message-counter" :class="{ 'error': formData.message.length >= 150 }">
                                        {{ formData.message.length }}/150
                                    </div>
                                    <span class="error-message" v-if="formErrors.message">{{ formErrors.message }}</span>
                                </div>
                                
                                <button type="submit" class="submit-button">
                                    <span>Отправить заявку</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </form>
                        </div>

                        <!-- Error State -->
                        <div v-else-if="submitError" key="error" class="submission-status error-status">
                            <div class="error-animation">
                                <svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="crossmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#ff6b6b" stroke-width="2"/>
                                    <path class="crossmark__cross" fill="none" stroke="#ff6b6b" stroke-width="4" stroke-linecap="round" d="M16 16l20 20 M36 16L16 36"/>
                                </svg>
                            </div>
                            <h3 class="status-title">Ошибка отправки</h3>
                            <p class="status-subtitle">Попробуйте отправить заявку еще раз</p>
                            <button class="retry-button" @click="submitForm">
                                <span>Попробовать снова</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 4V10H17M1 20V14H7M17 10L13.5 13.5C12.2909 14.7091 10.2909 14.7091 9.08088 13.5C7.87086 12.2909 7.87086 10.2909 9.08088 9.08088M7 14L10.5 10.5C11.7091 9.29086 13.7091 9.29086 14.9191 10.5C16.1291 11.7091 16.1291 13.7091 14.9191 14.9191" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Success State -->
                        <div v-else key="success" class="submission-status">
                            <div class="success-animation">
                                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#45b7d1" stroke-width="2"/>
                                    <path class="checkmark__check" fill="none" stroke="#45b7d1" stroke-width="4" stroke-linecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                            </div>
                            <h3 class="status-title">Заявка отправлена!</h3>
                            <p class="status-subtitle">Мы свяжемся с вами в ближайшее время</p>
                            <div class="progress-container">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </section>
</template>

<style scoped lang="scss">
@import 'animate.css';

.rent {
    margin: 80px 100px;
    border-radius: 12px;
    padding: 60px 0;
    background-color: #121212;
    position: relative;
    overflow: hidden;
    border: 1px solid #252525;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    
    &__wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
    }
    
    &__title {
        font-size: 2.4rem;
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        display: inline-block;
        font-weight: 600;
        letter-spacing: 0.5px;
        opacity: 0;
        
        &::after {
            content: "";
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: #45b7d1;
            border-radius: 3px;
        }
        
        &.animate__animated {
            opacity: 1;
        }
    }
    
    &__subtitle {
        font-size: 1.1rem;
        color: #aaa;
        text-align: left;
        margin-bottom: 50px;
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 1.6;
        opacity: 0;
        
        &.animate__animated {
            opacity: 1;
        }
    }
    
    &__content {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        align-items: flex-start;
    }
    
    &__info {
        flex: 1;
        min-width: 300px;
    }
    
    &__cta {
        flex: 0 0 380px;
        position: relative;
        top: 78px;
        opacity: 0;
        
        &.animate__animated {
            opacity: 1;
        }
    }
    
    &__features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 25px;
    }
    
    &__feature {
        background: #1a1a1a;
        padding: 30px;
        border-radius: 8px;
        border: 1px solid #252525;
        transition: all 0.4s ease;
        opacity: 0;
        transform: translateY(20px);
        
        &:hover {
            border-color: #45b7d1;
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        &.animate__animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        &:nth-child(1) {
            transition-delay: 0.1s;
        }
        &:nth-child(2) {
            transition-delay: 0.2s;
        }
        &:nth-child(3) {
            transition-delay: 0.3s;
        }
    }
    
    .feature__icon {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(30, 30, 30, 0.7);
        border-radius: 50%;
        margin-bottom: 20px;
        border: 1px solid #252525;
        transition: transform 0.3s ease;
        
        svg {
            width: 32px;
            height: 32px;
            transition: all 0.3s ease;
        }
    }
    
    .feature__title {
        font-size: 1.3rem;
        color: #fff;
        margin-bottom: 15px;
        font-weight: 600;
        transition: color 0.3s ease;
    }
    
    .feature__text {
        color: #aaa;
        line-height: 1.6;
        font-size: 1rem;
        transition: color 0.3s ease;
    }
    
    .cta__card {
        background: #1a1a1a;
        color: #fff;
        padding: 40px;
        border-radius: 8px;
        border: 1px solid #252525;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
    }
    
    .cta__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }
    
    .cta__sparkle {
        animation: sparkle 2s infinite;
    }
    
    .cta__title {
        font-size: 1.4rem;
        margin-bottom: 20px;
        color: #fff;
        font-weight: 600;
        line-height: 1.4;
        flex: 1;
    }
    
    .cta__text {
        margin-bottom: 30px;
        line-height: 1.6;
        flex-grow: 1;
        color: #aaa;
        font-size: 1rem;
    }
    
    .cta__button {
        background: #45b7d1;
        color: #fff;
        border: none;
        padding: 14px 30px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 20px;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
        &:hover {
            background: #3aa5be;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(69, 183, 209, 0.3);
            
            svg {
                transform: translateX(3px);
            }
        }
        
        svg {
            transition: transform 0.3s ease;
        }
    }
    
    .cta__note {
        font-size: 0.9rem;
        color: #777;
        line-height: 1.5;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }

    .modal-container {
        background-color: #1a1a1a;
        border-radius: 12px;
        border: 1px solid #252525;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        padding: 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        transition: transform 0.3s ease;
        
        &:hover {
            transform: rotate(90deg);
            
            svg path {
                stroke: #fff;
            }
        }
    }

    /* Form Styles */
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 15px;
        
        label {
            color: #ddd;
            font-size: 0.9rem;
        }
        
        input, select, textarea {
            background: #252525;
            border: 1px solid #333;
            border-radius: 6px;
            padding: 12px 15px;
            color: #fff;
            font-size: 1rem;
            transition: all 0.3s ease;
            
            &:focus {
                outline: none;
                border-color: #45b7d1;
                box-shadow: 0 0 0 2px rgba(69, 183, 209, 0.2);
            }
            
            &::placeholder {
                color: #666;
            }
            
            &.error {
                border-color: #ff6b6b !important;
                box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
            }
        }
        
        textarea {
            resize: none;
            min-height: 100px;
        }
    }

    .required {
        color: #ff6b6b;
    }

    .error-message {
        color: #ff6b6b;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    }

    .message-counter {
        text-align: right;
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
        transition: color 0.2s ease;
        
        &.error {
            color: #ff6b6b;
            font-weight: 600;
        }
    }

    .submit-button {
        background: #45b7d1;
        color: #fff;
        border: none;
        padding: 14px 30px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        
        &:hover {
            background: #3aa5be;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(69, 183, 209, 0.3);
            
            svg {
                transform: translateX(3px);
            }
        }
        
        svg {
            transition: transform 0.3s ease;
        }
    }

    /* Submission Status Styles */
    .submission-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px 20px;
    }

    .status-title {
        font-size: 1.5rem;
        color: #fff;
        margin: 25px 0 10px;
        font-weight: 600;
    }

    .status-subtitle {
        color: #aaa;
        font-size: 1rem;
        margin-bottom: 30px;
        line-height: 1.5;
    }

    .loading-spinner {
        margin: 20px 0;
        svg {
            width: 60px;
            height: 60px;
        }
    }

    .success-animation, .error-animation {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    .checkmark, .crossmark {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: block;
        stroke-width: 4;
        stroke-miterlimit: 10;
        animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
        
        &__circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 4;
            stroke-miterlimit: 10;
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        &__check, &__cross {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
    }

    .progress-container {
        width: 100%;
        height: 4px;
        background: #252525;
        border-radius: 2px;
        margin-top: 20px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        width: 100%;
        background: #45b7d1;
        animation: progress 3s linear forwards;
    }

    .error-status {
        .status-title {
            color: #ff6b6b;
        }
    }

    .retry-button {
        background: #ff6b6b;
        color: #fff;
        border: none;
        padding: 12px 25px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
        &:hover {
            background: #e05a5a;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
            
            svg {
                animation: rotate 1s ease infinite;
            }
        }
        
        svg {
            transition: all 0.3s ease;
        }
    }

    /* Animations */
    @keyframes sparkle {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes scale {
        0%, 100% {
            transform: none;
        }
        50% {
            transform: scale3d(1.1, 1.1, 1);
        }
    }

    @keyframes fill {
        100% {
            box-shadow: inset 0 0 0 100px rgba(69, 183, 209, 0);
        }
    }

    @keyframes progress {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Transitions */
    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.3s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}
/* Медиа-запросы */
    @media (max-width: 1024px) {
        .rent {
            margin: 60px 40px;
        }
        
        .rent__cta {
            position: relative;
            top: 105px;
        }
    }

    @media (max-width: 913px) {
        .rent__cta {
            top: 105px;
            flex: 1;
            width: 100%;
        }
    }

    @media (max-width: 820px) {
        .rent__cta {
            top: 0;
            flex: 1;
            width: 100%;
        }
    }

    @media (max-width: 768px) {
        .rent {
            margin: 40px 20px;
            padding: 40px 0;
        }
        
        .rent__wrapper {
            padding: 0 20px;
        }
        
        .rent__content {
            flex-direction: column;
            gap: 30px;
        }
        
        .rent__cta {
            top: 0;
            flex: 1;
            width: 100%;
        }
        
        .rent__title {
            font-size: 2rem;
        }
        
        .cta__card {
            padding: 30px;
        }

        .modal-container {
            padding: 30px 20px;
        }
    }

    @media (max-width: 600px) {
        .rent {
            margin: 30px 15px;
            padding: 30px 0;
        }

        .rent__title {
            font-size: 1.8rem;
        }

        .rent__features {
            grid-template-columns: 1fr;
        }

        .rent__feature {
            padding: 25px;
        }

        .cta__card {
            padding: 25px;
        }

        .feature__title {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 480px) {
        .rent {
            margin: 25px 10px;
            padding: 25px 0;
        }

        .rent__wrapper {
            padding: 0 15px;
        }

        .rent__title {
            font-size: 1.6rem;
        }

        .rent__subtitle {
            font-size: 1rem;
            margin-bottom: 30px;
        }

        .cta__title {
            font-size: 1.2rem;
        }

        .cta__text {
            font-size: 0.95rem;
        }

        .cta__button {
            padding: 12px 20px;
            font-size: 0.95rem;
        }

        .cta__note {
            font-size: 0.85rem;
        }

        .modal-container {
            padding: 25px 15px;
            width: 95%;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
            padding: 10px 12px;
            font-size: 0.95rem;
        }

        .submit-button, 
        .retry-button {
            padding: 12px 20px;
            font-size: 0.95rem;
        }
    }

    @media (max-width: 375px) {
        .rent {
            margin: 20px 8px;
            padding: 20px 0;
        }

        .rent__title {
            font-size: 1.5rem;
        }

        .rent__subtitle {
            font-size: 0.95rem;
        }

        .rent__feature {
            padding: 20px;
        }

        .feature__title {
            font-size: 1.1rem;
        }

        .feature__text {
            font-size: 0.95rem;
        }

        .cta__card {
            padding: 20px;
        }

        .cta__title {
            font-size: 1.1rem;
        }

        .cta__text {
            font-size: 0.9rem;
        }

        .modal-container {
            padding: 20px 12px;
        }

        .status-title {
            font-size: 1.3rem;
        }

        .status-subtitle {
            font-size: 0.95rem;
        }
    }

    /* Особые стили для очень маленьких экранов */
    @media (max-width: 320px) {
        .rent {
            margin: 15px 5px;
            padding: 15px 0;
        }

        .rent__title {
            font-size: 1.4rem;
        }

        .rent__feature {
            padding: 15px;
        }

        .cta__card {
            padding: 15px;
        }

        .cta__button {
            font-size: 0.9rem;
            padding: 10px 15px;
        }

        .modal-container {
            padding: 15px 10px;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
            padding: 8px 10px;
            font-size: 0.9rem;
        }
    }

    /* Стили для landscape ориентации на мобильных устройствах */
    @media (max-height: 480px) and (orientation: landscape) {
        .modal-container {
            max-height: 80vh;
            overflow-y: auto;
        }

        .rent__features {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Улучшение для полей ввода на мобильных устройствах */
    input[type="date"] {
        min-height: 44px; /* Минимальная высота для лучшего тапа */
    }

    select {
        min-height: 44px;
    }

    /* Улучшение для модального окна на маленьких экранах */
    @media (max-width: 480px) {
        .modal-container {
            width: 100%;
            border-radius: 0;
            max-height: 100vh;
            height: 100vh;
            overflow-y: auto;
        }

        .modal-overlay {
            align-items: flex-start;
            padding-top: 20px;
        }
    }
</style>