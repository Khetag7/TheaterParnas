<script setup>
import { ref, onMounted } from 'vue';

const features = ref([
  { text: "Театральный зал-трансформер на 65-85 мест", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" },
  { text: "Профессиональное световое и звуковое оборудование", icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" },
  { text: "Репетиционный зал с зеркалами", icon: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM8 12.5h3V16H8v-3.5zm0-5h3v3.5H8V7.5zm5 5h3V16h-3v-3.5zm0-5h3v3.5h-3V7.5z" },
  { text: "Гримерные и костюмерные помещения", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
  { text: "Керамическая мастерская", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
  { text: "Уютное фойе с арт-галереей", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" }
]);

const stats = ref([
  { value: "100", label: "кв.м площадь сцены", icon: "M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4h-2v2h2v2h-2v2h2v2H9V9h6v2h-2v2h2z" },
  { value: "85", label: "максимальная вместимость", icon: "M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
  { value: "10", label: "минут от метро Парнас", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" }
]);

const team = ref([
  { name: "Юлия", role: "Руководитель проекта", bio: "Основатель и вдохновитель театра, режиссёр с 15-летним опытом" },
  { name: "Алексей", role: "Технический директор", bio: "Обеспечивает безупречную работу оборудования и сцены" },
  { name: "Мария", role: "Художественный руководитель", bio: "Создаёт уникальные сценографии и костюмы" }
]);

const animatedValue = ref(0);

onMounted(() => {
  const interval = setInterval(() => {
    animatedValue.value = (animatedValue.value + 1) % 100;
  }, 100);
  
  return () => clearInterval(interval);
});
</script>

<template>
    <section class="about-theater">
        <div class="container">
            <h2 class="section-title">
                <svg class="title-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                О ТЕАТРЕ
            </h2>
            
            <div class="about-content">
                <div class="about-text">
                    <p class="description">
                        <svg class="decor-icon" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        Мы - творческая лаборатория полного цикла, где рождаются удивительные проекты. Наша команда создаёт магию на сцене: от захватывающих театральных постановок до ярких музыкальных клипов.
                    </p>
                    
                    <p class="description">
                        <svg class="decor-icon" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        Наше пространство - это активно развивающийся культурный кластер в самом сердце Парнаса. Мы объединяем профессионалов своего дела для реализации самых смелых творческих идей.
                    </p>
                    
                    <div class="animated-stats">
                        <div class="animated-stat">
                            <svg class="stat-icon" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                                <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
                            </svg>
                            <div class="stat-value">{{ animatedValue }}+</div>
                            <div class="stat-label">реализованных проектов</div>
                        </div>
                    </div>
                    
                    <h3 class="subsection-title">
                        <svg class="subsection-icon" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        НАШИ ВОЗМОЖНОСТИ
                    </h3>
                    
                    <ul class="features-list">
                        <li v-for="(feature, index) in features" :key="index">
                            <svg class="feature-icon" viewBox="0 0 24 24">
                                <path :d="feature.icon"/>
                            </svg>
                            {{ feature.text }}
                        </li>
                    </ul>
                    
                    <div class="team-section">
                        <h3 class="subsection-title">НАША КОМАНДА</h3>
                        <div class="team-members">
                            <div v-for="(member, index) in team" :key="index" class="team-member">
                                <svg class="member-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                </svg>
                                <div class="member-info">
                                    <h4>{{ member.name }}</h4>
                                    <div class="member-role">{{ member.role }}</div>
                                    <p>{{ member.bio }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="about-numbers">
                    <div v-for="(stat, index) in stats" :key="index" class="number-item">
                        <svg class="number-icon" viewBox="0 0 24 24">
                            <path :d="stat.icon"/>
                        </svg>
                        <span class="number">{{ stat.value }}</span>
                        <span class="number-description">{{ stat.label }}</span>
                    </div>
                    
                    <div class="location-info">
                        <h3>Как нас найти</h3>
                        <svg class="location-icon" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <p>г. Санкт-Петербург, ул. Николая Рубцова, 5</p>
                        <p>10 минут от метро Парнас</p>
                        <p>Бесплатная парковка</p>
                    </div>
                    
                    <div class="working-hours">
                        <h3>Часы работы</h3>
                        <svg class="time-icon" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <p>Ежедневно: 10:00 - 22:00</p>
                        <p>Технические перерывы: 14:00-15:00</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="stage-svg">
            <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
                <path d="M0,100 C150,200 350,0 500,100 C650,200 750,0 900,100 C1050,200 1150,0 1200,100 L1200,200 L0,200 Z" fill="#ffffff" opacity="0.1"></path>
            </svg>
        </div>
    </section>
</template>

<style scoped lang="scss">
.about-theater {
    background-color: #2a2a2a;
    color: #e0e0e0;
    padding-top: 60px;
    padding-bottom: 90px;
    position: relative;
    overflow: hidden;

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 2;
    }

    .section-title {
        color: #ffffff;
        font-size: 2.5rem;
        text-transform: uppercase;
        margin-bottom: 40px;
        text-align: center;
        letter-spacing: 2px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        
        .title-icon {
            width: 36px;
            height: 36px;
            fill: #ffffff;
            animation: pulse 2s infinite;
        }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .about-content {
        display: flex;
        justify-content: space-between;
        gap: 40px;

        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    .about-text {
        flex: 2;

        .description {
            margin-bottom: 20px;
            line-height: 1.6;
            position: relative;
            padding-left: 40px;
            
            .decor-icon {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                fill: #ffffff;
            }
        }
    }

    .animated-stats {
        display: flex;
        justify-content: center;
        margin: 30px 0;
        
        .animated-stat {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            min-width: 220px;
            transition: all 0.3s ease;
            
            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                background: rgba(255, 255, 255, 0.1);
            }
            
            .stat-icon {
                width: 40px;
                height: 40px;
                fill: #ffffff;
                margin-bottom: 15px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                color: #ffffff;
                margin: 10px 0;
            }
            
            .stat-label {
                font-size: 0.9rem;
                opacity: 0.8;
            }
        }
    }

    .subsection-title {
        color: #ffffff;
        font-size: 1.5rem;
        margin: 40px 0 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        
        .subsection-icon {
            width: 24px;
            height: 24px;
            fill: #ffffff;
        }
    }

    .features-list {
        list-style-type: none;
        padding-left: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;

        li {
            position: relative;
            padding: 18px 20px 18px 60px;
            margin-bottom: 10px;
            line-height: 1.6;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 6px;
            transition: all 0.3s ease;
            border-left: 3px solid rgba(255, 255, 255, 0.1);
            
            &:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(3px);
                border-left-color: #ffffff;
            }
            
            .feature-icon {
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                fill: #ffffff;
            }
        }

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }

    .team-section {
        margin-top: 50px;
        
        .team-members {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 25px;
        }
        
        .team-member {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 25px;
            display: flex;
            gap: 20px;
            transition: all 0.3s ease;
            align-items: center;
            
            &:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-3px);
            }
            
            .member-icon {
                width: 50px;
                height: 50px;
                fill: #ffffff;
                flex-shrink: 0;
            }
            
            .member-info {
                h4 {
                    margin: 0 0 8px;
                    color: #fff;
                    font-size: 1.2rem;
                }
                
                .member-role {
                    color: #ffffff;
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                    font-weight: 500;
                    opacity: 0.8;
                }
                
                p {
                    margin: 0;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    opacity: 0.7;
                }
            }
        }
    }

    .about-numbers {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 30px;
        min-width: 280px;

        .number-item {
            text-align: center;
            padding: 30px 25px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            
            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                background: rgba(255, 255, 255, 0.1);
                
                .number {
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
                }
            }
            
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
            }
            
            .number-icon {
                width: 32px;
                height: 32px;
                fill: #ffffff;
                margin-bottom: 15px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }

            .number {
                display: block;
                font-size: 2.8rem;
                color: #ffffff;
                font-weight: bold;
                line-height: 1;
                margin: 10px 0;
                transition: all 0.3s ease;
            }

            .number-description {
                font-size: 1rem;
                color: #e0e0e0;
                display: block;
                opacity: 0.8;
            }
        }
        
        .location-info, .working-hours {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 25px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            
            &:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }
            
            h3 {
                margin-top: 0;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 1.2rem;
                
                svg {
                    width: 20px;
                    height: 20px;
                    fill: #ffffff;
                }
            }
            
            p {
                margin: 12px 0 0 30px;
                font-size: 0.95rem;
                line-height: 1.6;
                position: relative;
                
                &::before {
                    content: "•";
                    position: absolute;
                    left: -18px;
                    color: #ffffff;
                    font-size: 1.2rem;
                }
            }
            
            .location-icon, .time-icon {
                position: relative;
                top: 10px;
                left: 5px;
                width: 20px;
                height: 20px;
                fill: #ffffff;
            }
        }
    }

    .stage-svg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: 1;
        
        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>