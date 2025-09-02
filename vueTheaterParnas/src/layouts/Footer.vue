<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Основные разделы футера -->
        <div class="footer-section">
          <h3 class="footer-title">Театр Парнас</h3>
          <p class="footer-text">Камерный театр в Санкт-Петербурге,<br>где классика встречается с современностью</p>
          <div class="footer-social">
            <a href="https://vk.com/teatr_parnas" class="social-icon" aria-label="ВКонтакте">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8C14.2091 8 16 9.79086 16 12V13H13.5C12.6716 13 12 12.3284 12 11.5C12 10.6716 12.6716 10 13.5 10H16V8H13.5C11.8431 8 10.5 9.34315 10.5 11C10.5 12.6569 11.8431 14 13.5 14H16V16H13.5C10.7386 16 8.5 13.7614 8.5 11C8.5 8.23858 10.7386 6 13.5 6H16V8H13.5Z" fill="#7A9CC6"/>
              </svg>
            </a>
            <a href="https://t.me/teatrparnas" class="social-icon" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7A9CC6" stroke-width="2"/>
                <path d="M8 12L10.5 10.5L16 7L8 12Z" fill="#7A9CC6"/>
                <path d="M8 12L10.5 14.5L16 17" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M16 7L10.5 14.5" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>
            <a href="https://wa.me/79697975959" class="social-icon" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7A9CC6" stroke-width="2"/>
                <path d="M8 12C8 14.2091 9.79086 16 12 16C13.0386 16 13.9818 15.5663 14.6569 14.8748L16 16L16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" fill="#7A9CC6"/>
                <path d="M12 11V13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 13V15" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Навигация</h3>
          <ul class="footer-links">
            <li><RouterLink to="/" class="footer-link">Главная</RouterLink></li>
            <li><RouterLink to="/rent" class="footer-link">Аренда</RouterLink></li>
            <li><RouterLink to="/services" class="footer-link">Услуги</RouterLink></li>
            <li><RouterLink to="/about" class="footer-link">О театре</RouterLink></li>
            <li><RouterLink to="/contacts" class="footer-link">Контакты</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Контакты</h3>
          <ul class="footer-contacts">
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C18.45 20.92 18 20.47 18 19.92V16.92C18 16.37 18.45 15.92 19 15.92H21C21.55 15.92 22 16.37 22 16.92Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M16 3H8C5.79 3 4 4.79 4 7V17C4 19.21 5.79 21 8 21H16C18.21 21 20 19.21 20 17V7C20 4.79 18.21 3 16 3Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 18H12.01" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <a href="tel:+79697975959" class="contact-link">+7 (969) 797-59-59</a>
            </li>
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M22 6L12 13L2 6" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <a href="mailto:teatr_parnas@bk.ru" class="contact-link">teatr_parnas@bk.ru</a>
            </li>
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 8V12L15 15" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Ежедневно с 10:00 до 22:00</span>
            </li>
            <li class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Санкт-Петербург, м. Парнас</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Копирайт и дополнительная информация -->
      <div class="footer-bottom">
        <div class="copyright">
          © {{ new Date().getFullYear() }} Театр Парнас. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  background: #121212;
  color: #e0e0e0;
  padding: 60px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(122, 156, 198, 0.3), transparent);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  h3 {
    color: #7A9CC6;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 1px;
      background: rgba(122, 156, 198, 0.5);
    }
  }
}

.footer-text {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #b0b0b0;
}

.footer-social {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  .social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(35, 35, 35, 0.7);
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(122, 156, 198, 0.2);
      transform: translateY(-3px);
      
      svg path {
        stroke: #7A9CC6;
        fill: #7A9CC6;
      }
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 12px;
  }
}

.footer-link {
  color: #d0d0d0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 2px;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #7A9CC6;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: white;
    
    &::before {
      width: 20px;
    }
  }
  
  &.router-link-active {
    color: #7A9CC6;
    font-weight: 500;
  }
}

.footer-contacts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #d0d0d0;
  
  svg {
    flex-shrink: 0;
  }
  
  .contact-link {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #7A9CC6;
    }
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.copyright {
  font-size: 12px;
  color: #777;
  margin-bottom: 15px;
}


/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-section {
    text-align: center;
    
    h3::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  .footer-social {
    justify-content: center;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 8px;
  }
}

/* Анимации */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-section {
  animation: fadeInUp 0.6s ease forwards;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
}
</style>