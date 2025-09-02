<script setup>
const services = [
  {
    title: 'Творческие проекты',
    icon: 'theater',
    items: [
      'Спектакли и мюзиклы',
      'Рекламные ролики',
      'Короткометражные фильмы',
      'Музыкальные клипы'
    ]
  },
  {
    title: 'Организация мероприятий',
    icon: 'events',
    items: [
      'Театральные постановки',
      'Стендапы и перформансы',
      'Концерты и лекции',
      'Городские праздники'
    ]
  },
  {
    title: 'Мастер-классы',
    icon: 'workshop',
    items: [
      'Керамическая мастерская',
      'Актёрское мастерство',
      'Творческие воркшопы'
    ]
  },
  {
    title: 'Производство',
    icon: 'production',
    items: [
      'Театральный реквизит',
      'Декорации и куклы',
      'Керамические изделия',
      'Фирменный мерч'
    ]
  }
];

const advantages = [
  { text: 'Гибкость в реализации идей', icon: 'flexibility' },
  { text: 'Профессиональное оборудование', icon: 'equipment' },
  { text: 'Доступные цены', icon: 'prices' },
  { text: '10 минут от метро Парнас', icon: 'location' },
  { text: 'Бесплатная парковка', icon: 'parking' },
  { text: 'Доступная среда', icon: 'accessibility' }
];

// SVG иконки
const icons = {
  theater: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/><path d="m17 8-5-4-5 4"/><path d="m17 16-5 4-5-4"/></svg>`,
  events: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  workshop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  production: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/></svg>`,
  flexibility: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
  equipment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  prices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m18.4 4.6-2.8 2.8"/><path d="M20 12h-4"/><path d="m18.4 19.4-2.8-2.8"/><path d="M12 22v-4"/><path d="m5.6 19.4 2.8-2.8"/><path d="M4 12h4"/><path d="m5.6 4.6 2.8 2.8"/><circle cx="12" cy="12" r="4"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`,
  parking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`,
  accessibility: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>`
};
</script>

<template>
    <section class="services">
        <div class="container">
            <h2 class="section-title">Услуги</h2>
            
            <!-- Пространство и оборудование -->
            <div class="space-card">
                <div class="stage-icon" v-html="icons.theater"></div>
                <h3>Пространство для творчества</h3>
                <div class="space-grid">
                    <ul>
                        <li>Театральный зал-трансформер на 65–85 мест</li>
                        <li>Репетиционный зал с зеркалами</li>
                        <li>Гримерные и костюмерные помещения</li>
                    </ul>
                    <ul>
                        <li>Уютное фойе с арт-галереей</li>
                        <li>Керамическая мастерская</li>
                        <li>Профессиональное оборудование</li>
                    </ul>
                </div>
            </div>
            
            <!-- Основные услуги -->
            <div class="services-grid">
                <div class="service-card" v-for="service in services" :key="service.title">
                    <div class="service-icon" v-html="icons[service.icon]"></div>
                    <h4>{{ service.title }}</h4>
                    <ul>
                        <li v-for="(item, index) in service.items" :key="index">{{ item }}</li>
                    </ul>
                </div>
            </div>
            
            <!-- Преимущества -->
            <div class="advantages">
                <h3>Почему выбирают нас?</h3>
                <div class="advantages-grid">
                    <div class="advantage-item" v-for="(advantage, index) in advantages" :key="index">
                        <div class="advantage-icon" v-html="icons[advantage.icon]"></div>
                        <p>{{ advantage.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.services {
    margin: 0;
    padding: 60px 0;
    background-color: #2a2a2a;
    color: #e0e0e0;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23333333' fill-opacity='0.1'/%3E%3C/svg%3E");
        opacity: 0.15;
        z-index: 0;
    }
    
    .container {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0 40px;
        position: relative;
        z-index: 1;
    }
    
    .section-title {
        text-align: center;
        font-size: 2.2rem;
        margin-bottom: 2.5rem;
        color: #ffffff;
        font-weight: 500;
        letter-spacing: 0.5px;
        position: relative;
        
        &::after {
            content: '';
            display: block;
            width: 60px;
            height: 2px;
            background: #e0e0e0;
            margin: 15px auto 0;
            transition: width 0.3s ease;
        }
        
        &:hover::after {
            width: 100px;
        }
    }
    
    .space-card {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0;
        padding: 40px 30px;
        margin-bottom: 50px;
        border-left: 4px solid #e0e0e0;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            border-left-color: #ff5722;
        }
        
        .stage-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            opacity: 0.1;
            stroke: #e0e0e0;
            transition: all 0.3s ease;
        }
        
        &:hover .stage-icon {
            opacity: 0.2;
            transform: scale(1.1);
        }
        
        h3 {
            font-size: 1.6rem;
            margin-bottom: 1.5rem;
            color: #ffffff;
            font-weight: 500;
            position: relative;
            display: inline-block;
            
            &::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: #ff5722;
                transition: width 0.3s ease;
            }
        }
        
        &:hover h3::after {
            width: 100%;
        }
        
        .space-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                
                li {
                    padding: 10px 0;
                    position: relative;
                    padding-left: 25px;
                    font-size: 1.05rem;
                    line-height: 1.5;
                    transition: all 0.2s ease;
                    
                    &:hover {
                        color: #ffffff;
                    }
                    
                    &::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 18px;
                        width: 8px;
                        height: 2px;
                        background: #e0e0e0;
                        transition: all 0.3s ease;
                    }
                }
            }
        }
        
        &:hover .space-grid ul li::before {
            background: #ff5722;
            width: 12px;
        }
    }
    
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-bottom: 60px;
        
        .service-card {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 30px;
            border-radius: 0;
            border-bottom: 2px solid rgba(224, 224, 224, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            
            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
                border-bottom-color: #ff5722;
                transform: translateY(-5px);
            }
            
            .service-icon {
                width: 40px;
                height: 40px;
                margin-bottom: 20px;
                stroke: #e0e0e0;
                opacity: 0.8;
                transition: all 0.3s ease;
            }
            
            &:hover .service-icon {
                stroke: #ff5722;
                transform: scale(1.1);
            }
            
            h4 {
                font-size: 1.3rem;
                margin-bottom: 20px;
                color: #ffffff;
                font-weight: 500;
                letter-spacing: 0.3px;
                position: relative;
                display: inline-block;
                
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #ff5722;
                    transition: width 0.3s ease;
                }
            }
            
            &:hover h4::after {
                width: 100%;
            }
            
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                
                li {
                    padding: 8px 0;
                    position: relative;
                    padding-left: 20px;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                    
                    &:hover {
                        color: #ffffff;
                    }
                    
                    &::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 16px;
                        width: 6px;
                        height: 1px;
                        background: #e0e0e0;
                        transition: all 0.3s ease;
                    }
                }
            }
            
            &:hover ul li::before {
                background: #ff5722;
                width: 10px;
            }
        }
    }
    
    .advantages {
        h3 {
            text-align: center;
            font-size: 1.6rem;
            margin-bottom: 2.5rem;
            color: #ffffff;
            font-weight: 500;
        }
        
        .advantages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            
            .advantage-item {
                background-color: rgba(0, 0, 0, 0.2);
                padding: 30px 20px;
                text-align: center;
                border: 1px solid rgba(224, 224, 224, 0.1);
                transition: all 0.3s ease;
                position: relative;
                
                &:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                    border-color: #ff5722;
                    transform: translateY(-3px);
                }
                
                .advantage-icon {
                    width: 30px;
                    height: 30px;
                    margin: 0 auto 15px;
                    stroke: #e0e0e0;
                    opacity: 0.8;
                    transition: all 0.3s ease;
                }
                
                &:hover .advantage-icon {
                    stroke: #ff5722;
                    transform: rotate(5deg) scale(1.1);
                }
                
                p {
                    margin: 0;
                    font-size: 1.05rem;
                    line-height: 1.5;
                    transition: color 0.2s ease;
                }
                
                &:hover p {
                    color: #ffffff;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        padding: 40px 0;
        
        .container {
            padding: 0 20px;
        }
        
        .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .advantages-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .space-card .stage-icon {
            width: 40px;
            height: 40px;
            top: 15px;
            right: 15px;
        }
    }
}
</style>