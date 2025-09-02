
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const showContactPopup = ref(false);
const popupContent = ref(null);
const isMobileMenuOpen = ref(false);
const mobileMenuRef = ref(null);

const handleClickOutside = (event) => {
  // Закрытие попапа контактов
  if (showContactPopup.value && popupContent.value && !popupContent.value.contains(event.target)) {
    showContactPopup.value = false;
  }
  
  // Закрытие мобильного меню
  if (isMobileMenuOpen.value && 
  !event.target.closest('.burger-button') && 
  !event.target.closest('.mobile-menu')) {
    isMobileMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <header>
    <div class="container container-flex">
      <div class="header__logo">
        <a href="/">
          <img 
          src="@/assets/icons/logoTheatreParnas.png" 
          alt="Logo"
          class="logo-image"
          >
        </a>
      </div>
      
      <nav class="header__nav">
        <ul class="header__nav-list">
          <RouterLink to="/rent" class="nav-link">
            <li>Аренда</li>
          </RouterLink>
          <RouterLink to="/services" class="nav-link">
            <li>Услуги</li>
          </RouterLink>
          <RouterLink to="/about" class="nav-link">
            <li>О театре</li>
          </RouterLink>
          <RouterLink to="/contacts" class="nav-link">
            <li>Контакты</li>
          </RouterLink>
        </ul>
      </nav>
      
      <div class="header__contacts">
        <button class="contact-button" @click="showContactPopup = true">
          <span class="button-text">Забронировать</span>
          <span class="button-icon">→</span>
        </button>
      </div>
      
      <button 
      class="burger-button" 
      @click="toggleMobileMenu"
      :class="{ 'open': isMobileMenuOpen }"
      aria-label="Меню"
      >
      <span class="burger-line line1"></span>
      <span class="burger-line line2"></span>
      <span class="burger-line line3"></span>
    </button>
  </div>
  
  <!-- Мобильное меню -->
  <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }" ref="mobileMenuRef" @click="isMobileMenuOpen = false">
    <nav class="mobile-nav" @click.stop>
      <ul>
        <RouterLink to="/rent" class="nav-link" @click="toggleMobileMenu">
          <li>Аренда</li>
        </RouterLink>
        <RouterLink to="/services" class="nav-link" @click="toggleMobileMenu">
          <li>Услуги</li>
        </RouterLink>
        <RouterLink to="/about" class="nav-link" @click="toggleMobileMenu">
          <li>О театре</li>
        </RouterLink>
        <RouterLink to="/contacts" class="nav-link" @click="toggleMobileMenu">
          <li>Контакты</li>
        </RouterLink>
      </ul>
      
      <button class="mobile-contact-button" @click="showContactPopup = true; toggleMobileMenu()">
        <span class="button-text">Забронировать</span>
        <span class="button-icon">→</span>
      </button>
    </nav>
  </div>
  
  <!-- Попап для связи -->
  <div v-if="showContactPopup" class="contact-popup">
    <div class="popup-content" ref="popupContent">
      <button class="close-btn" @click="showContactPopup = false">×</button>
      <h3>Свяжитесь с нами</h3>
      <p>Телефон: <a href="tel:+79697975959"> +7 (969) 797-59-59</a></p>
      <p>Email: <a href="mailto:teatr_parnas@bk.ru"> teatr_parnas@bk.ru</a></p>
      <div class="social-links">
        <a href="https://vk.com/teatr_parnas" class="social-link">VK</a>
        <a href="https://t.me/teatrparnas" class="social-link">Telegram</a>
        <a href="https://wa.me/79697975959" class="social-link">WhatsApp</a>
      </div>
    </div>
  </div>
</header>
</template>

<style lang="scss" scoped>
/* Общие стили */
.header__logo {
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.logo-image {
  transition: all 0.3s ease;
  max-width: 112px;
  max-height: 62px;
  
  &:hover {
    filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.7));
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.header__logo:active .logo-image {
  animation: pulse 0.3s ease;
}

/* Навигация */
.header__nav-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 70px;
}

.nav-link {
  text-decoration: none;
  
  li {
    color: #e0e0e0;
    font-size: 16px;
    font-weight: 300;
    position: relative;
    padding: 8px 0;
    transition: all 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      visibility: hidden;
      transform-origin: center;
    }
    
    &:hover {
      color: white;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
      
      &::before {
        width: 100%;
        visibility: visible;
        height: 1px;
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  &.router-link-active {
    li {
      color: white;
      font-weight: 300;
      
      &::before {
        width: 100%;
        visibility: visible;
        height: 2px;
        transition: height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    }
  }
}

/* Кнопка контактов */
.contact-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.5s ease;
  }
  
  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
    
    .button-icon {
      transform: translateX(3px);
      opacity: 0.9;
    }
  }
  
  &:active {
    transform: scale(0.95);
    
    .button-icon {
      transform: translateX(5px);
    }
  }
  
  .button-icon {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: inline-block;
    opacity: 0.7;
  }
}

/* Бургер-меню */
.burger-button {
  display: none;
  position: relative;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;
  margin-left: auto;
  
  .burger-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    
    &.line1 {
      top: 0;
    }
    
    &.line2 {
      top: 50%;
      transform: translateY(-50%);
    }
    
    &.line3 {
      bottom: 0;
    }
  }
  
  &.open {
    .line1 {
      transform: translateY(11px) rotate(45deg);
    }
    
    .line2 {
      opacity: 0;
      transform: scale(0);
    }
    
    .line3 {
      transform: translateY(-11px) rotate(-45deg);
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 90;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.open {
    transform: translateX(0);
  }
  
  .mobile-nav {
    width: 100%;
    max-width: 300px;
    text-align: center;
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0 0 30px;
      
      .nav-link {
        display: block;
        padding: 15px;
        color: white;
        text-decoration: none;
        font-size: 18px;
        transition: all 0.3s ease;
        
      }
    }
  }
  
  .mobile-contact-button {
    background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 30px;
    padding: 12px 25px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: all 0.5s ease;
    }
    
    
    
    &::before {
      left: 100%;
    }
    
    .button-icon {
      transform: translateX(3px);
      opacity: 0.9;
    }
    
    &:active {
      transform: scale(0.95);
      
      .button-icon {
        transform: translateX(5px);
      }
    }
    
    .button-icon {
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      display: inline-block;
      opacity: 0.7;
    }
  }
}

/* Попап */
.contact-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  backdrop-filter: blur(5px);
}

.popup-content {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  animation: scaleIn 0.3s ease;
  
  h3 {
    color: white;
    margin-bottom: 20px;
    font-size: 22px;
    text-align: center;
  }
  
  p {
    color: #e0e0e0;
    margin: 15px 0;
    font-size: 16px;
    
    a
    {
      color: #e0e0e0;
      margin: 15px 0;
      font-size: 16px;
    }
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.social-link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Медиа-запросы */
@media (max-width: 880px) {
  .header__nav-list, .header__contacts {
    display: none;
  }
  
  .burger-button {
    display: block;
  }
  
  .header__logo {
    z-index: 100;
  }
}

@media (max-width: 480px) {
  .logo-image {
    max-width: 90px;
    max-height: 50px;
  }
  
  .mobile-nav {
    .nav-link {
      font-size: 16px !important;
      padding: 12px !important;
    }
    
    .mobile-contact-button {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
  
  .popup-content {
    padding: 20px;
    max-width: 90%;
    
    h3 {
      font-size: 20px;
    }
    
    p {
      font-size: 14px;
    }
  }
  
  .social-links {
    flex-direction: column;
    gap: 10px;
  }
  
  .social-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>