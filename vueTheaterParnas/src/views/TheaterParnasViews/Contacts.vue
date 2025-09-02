<script setup>
import { reactive } from 'vue';

const contacts = reactive ({
  phone: '+7 969 797 5959',
  email: 'teatr_parnas@bk.ru',
  address: 'Николая Рубцова, 5, Санкт-Петербург',
  workHours: 'Пн-Вс: 10:00 - 22:00',
  howToFind: 'https://vk.cc/cGdUzj'
})
</script>

<template>
    <section class="contacts">
        <div class="container">
            <div class="contacts__block">
                <h2 class="contacts__title">Наши контакты</h2>
                
                <div class="contacts__content">
                    <div class="contacts__info">
                        <div class="contacts__item">
                            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a :href="`tel:${contacts.phone.replace(/[^0-9+]/g, '')}`">{{ contacts.phone }}</a>
                        </div>
                        
                        <div class="contacts__item">
                            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
                        </div>
                        
                        <div class="contacts__item">
                            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ contacts.address }}</span>
                        </div>

                        <div class="contacts__item contacts__how-to-find">
                            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                            </svg>
                            <span>Как нас найти: <a :href="contacts.howToFind" target="_blank">Подробная инструкция</a></span>
                        </div>
                        
                        <div class="contacts__item">
                            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ contacts.workHours }}</span>
                        </div>
                    </div>
                    
                    <div class="contacts__map">
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa591ccba19bf08e411d144716dd86b5fb9c5247cc5c02ad9f70693c096629b40&amp;source=constructor" width="600" height="400" frameborder="0" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.contacts {
    margin-top: 60px;
    margin-bottom: 60px;
    
    &__block {
        background: #3a3a3a;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        padding: 40px;
        color: #e0e0e0;
    }
    
    &__title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 30px;
        color: #ffffff;
        text-align: center;
    }
    
    &__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }
    
    &__info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    &__item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        color: #e0e0e0;
        
        a {
            color: #e0e0e0;
            text-decoration: none;
            transition: color 0.2s;
            
            &:hover {
                color: #4d8eff;
            }
        }

        &.contacts__how-to-find {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #4d4d4d;
            
            a {
                color: #4d8eff;
                text-decoration: underline;
                
                &:hover {
                    color: #7babff;
                }
            }
        }
    }
    
    &__icon {
        width: 24px;
        height: 24px;
        color: #4d8eff;
        flex-shrink: 0;
    }
    
    &__map {
        height: 400px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
}
</style>