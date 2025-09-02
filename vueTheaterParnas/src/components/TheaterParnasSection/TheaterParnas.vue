<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ParnasPhotos from '@/components/TheaterParnasSection/ParnasPhotos.vue';



const reviews = [
  {
    author: "Ирина Ж.",
    stars: "★★★★★",
    text: "Невероятная атмосфера в театре! 'Ревизор' поставлен просто гениально - смеялись до слёз. Особенно впечатлила игра актрисы в роли Городничихи, настоящий профессионализм!"
  },
  {
    author: "Андрей А.",
    stars: "★★★★★",
    text: "Впервые посетил ваш театр и был приятно удивлён. 'Гамлет' в современной интерпретации - свежий взгляд на классику. Отдельное спасибо за уютную атмосферу зала."
  },
  {
    author: "Георгий Т.",
    stars: "★★★★★",
    text: "'Вишнёвый сад' Чехова тронул до глубины души. Актерская игра на высшем уровне, особенно запомнился монолог Раневской. Обязательно приду ещё!"
  },
  {
    author: "Александр Т.",
    stars: "★★★★☆",
    text: "Посетили 'Горе от ума' - получили огромное удовольствие! Современная интерпретация классики, но без потери смысла. Отличная работа режиссера и актёров."
  },
  {
    author: "Мария К.",
    stars: "★★★★★",
    text: "'Чайка' Чехова в вашем исполнении - это нечто особенное! Никогда не думала, что классика может быть настолько современной и понятной. Браво!"
  },
  {
    author: "Денис П.",
    stars: "★★★★☆",
    text: "Был на 'Трёх сестрах' - потрясающая игра актёров! Особенно понравилось, как передали атмосферу чеховской тоски. Зал небольшой, что создаёт эффект присутствия."
  },
  {
    author: "Аслан Д.",
    stars: "★★★★★",
    text: "'Ромео и Джульетта' в вашей постановке - это шедевр! Современный подход не испортил, а обогатил шекспировский текст. Рекомендую всем!"
  },
  {
    author: "Ваня В.",
    stars: "★★★★☆",
    text: "Посмотрел 'Дядю Ваню' - сильные эмоции! Особенно впечатлила сцена с пистолетом. Актёры играют так, что забываешь, что это спектакль."
  },
  {
    author: "Евгения С.",
    stars: "★★★★★",
    text: "'Преступление и наказание' поразило глубиной проработки образов. Раскольников в исполнении вашего актера - это что-то невероятное! Спасибо за эмоции."
  },
  {
    author: "Артём В.",
    stars: "★★★★★",
    text: "Впервые в жизни сходил на 'Ревизора' и не пожалел! Современная подача классики, но гоголевский дух сохранён. Особенно понравился Хлестаков - очень харизматичный!"
  },
  {
    author: "Ольга М.",
    stars: "★★★★☆",
    text: "'Три сестры' - это шедевр! Такой глубины и эмоций я давно не видела. Актриса, играющая Машу, просто потрясающая. Обязательно приду на другие постановки."
  },
  {
    author: "Сергей Л.",
    stars: "★★★★★",
    text: "Отличное место для культурного отдыха. Хорошая акустика, удобные места. Особенно понравилось уютное фойе с фотографиями из спектаклей."
  },
  {
    author: "Вероника А.",
    stars: "★★★★★",
    text: "'Пиковая дама' в вашей постановке - это нечто! Особенно впечатлила сцена с призраком графини. Декорации и свет создали неповторимую атмосферу."
  },
  {
    author: "Идрис Н.",
    stars: "★★★★★",
    text: "Посетил 'Гамлета' и был поражён игрой актёров. Особенно запомнился монолог 'Быть или не быть' - мурашки по коже! Отличная работа со светом и звуком."
  },
  {
    author: "Владимир Р.",
    stars: "★★★★☆",
    text: "'Вишнёвый сад' поставлен очень тонко и со вкусом. Особенно понравилась игра актрисы в роли Раневской - столько нюансов в каждом жесте! Рекомендую."
  },
  {
    author: "Радион М.",
    stars: "★★★★☆",
    text: "Смотрел 'Ревизора' - смеялся до слёз! Современные намёки в классическом тексте сделали спектакль ещё актуальнее. Городничий был просто великолепен!"
  },
  {
    author: "Дэниэл В.",
    stars: "★★★★★",
    text: "'Чайка' Чехова в вашей интерпретации - это новый взгляд на классику. Особенно впечатлила сцена с убийством чайки - настолько пронзительно, что забываешь дышать."
  },
  {
    author: "Женя З.",
    stars: "★★★★☆",
    text: "Был на 'Дяде Ване' - сильные эмоции! Особенно запомнилась сцена с объяснением в любви. Актёры играют так искренне, что забываешь, что это спектакль."
  },
  {
    author: "Гурам Ж.",
    stars: "★★★★★",
    text: "'Три сестры' в вашем театре - это не просто спектакль, это жизнь. Особенно понравилось, как передали ощущение безысходности и надежды одновременно."
  },
  {
    author: "Константин В.",
    stars: "★★★★★",
    text: "'Горе от ума' - свежий взгляд на классику! Современные костюмы не испортили, а подчеркнули актуальность текста. Чацкий был просто великолепен!"
  },
  {
    author: "Вадим П.",
    stars: "★★★★★",
    text: "Посмотрел 'Преступление и наказание' - мощно! Особенно впечатлила сцена исповеди Раскольникова. Актёрская игра на высочайшем уровне."
  },
  {
    author: "Альберт Н.",
    stars: "★★★★★",
    text: "'Пиковая дама' поразила атмосферой мистики. Особенно запомнилась сцена с тенью графини - мурашки по коже! Отличная работа светового дизайнера."
  },
  {
    author: "Николай Т.",
    stars: "★★★★★",
    text: "'Ромео и Джульетта' в вашей постановке - это нечто особенное! Современные декорации только подчеркнули вечность шекспировского текста. Браво!"
  },
  {
    author: "Захар Д.",
    stars: "★★★★★",
    text: "Посетил 'Вишнёвый сад' и был тронут до слёз. Особенно запомнился финальный монолог Фирса. Актёр сыграл так, что забываешь, что это спектакль."
  }
];

const currentSlide = ref(0);
const slidesPerView = ref(3);
const sliderContainer = ref(null);
const startX = ref(0);
const isDragging = ref(false);

// Группируем отзывы по 3 элемента
const groupedReviews = computed(() => {
  const groups = [];
  for (let i = 0; i < reviews.length; i += slidesPerView.value) {
    groups.push(reviews.slice(i, i + slidesPerView.value));
  }
  return groups;
});

const totalSlides = computed(() => groupedReviews.value.length);

const updateSlidesPerView = () => {
  if (window.innerWidth < 768) {
    slidesPerView.value = 1;
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 2;
  } else {
    slidesPerView.value = 3;
  }
  currentSlide.value = 0;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const handleWheel = (e) => {
  e.preventDefault();
  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
};

const handleTouchStart = (e) => {
  isDragging.value = true;
  startX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.touches[0].clientX;
  const diff = startX.value - x;
  
  if (diff > 50) {
    nextSlide();
    isDragging.value = false;
  } else if (diff < -50) {
    prevSlide();
    isDragging.value = false;
  }
};

const handleTouchEnd = () => {
  isDragging.value = false;
};

onMounted(() => {
  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);
  
  if (sliderContainer.value) {
    sliderContainer.value.addEventListener('wheel', handleWheel, { passive: false });
    sliderContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderContainer.value.addEventListener('touchmove', handleTouchMove, { passive: false });
    sliderContainer.value.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView);
  
  if (sliderContainer.value) {
    sliderContainer.value.removeEventListener('wheel', handleWheel);
    sliderContainer.value.removeEventListener('touchstart', handleTouchStart);
    sliderContainer.value.removeEventListener('touchmove', handleTouchMove);
    sliderContainer.value.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<template>
    <section class="theaterParnas">
        <div class="container">
            <div class="parnas__wrap">
                <div class="parnas__block-titles">
                    <div>
                        <h1 class="parnas__title">Театр Парнас</h1>
                        <span class="parnas__paragraph">Театр у дома</span>
                        <p class="parnas__info">
                            Единственный в своем роде! <br>
                            Камерный театр на Парнасе! <br>
                            Теперь не нужно ехать в центр города, чтобы попасть на спектакль. Мы отобрали лучшие постановки!
                        </p>
                    </div>
                    <div class="parnas__buttons">
                        <a href="https://vk.cc/crrV4t" class="parnas__title-button">Выбери свой спектакль уже сегодня!</a>
                        <a href="https://yandex.ru/maps/org/parnas/20431578511/panorama/?ll=30.343806%2C60.075986&panorama%5Bdirection%5D=18.799376%2C0.620914&panorama%5Bfull%5D=true&panorama%5Bpoint%5D=30.343900%2C60.075835&panorama%5Bspan%5D=37.516804%2C60.000000&tab=panorama&z=15" 
                           class="parnas__title-button virtual-tour">
                            Виртуальный тур по театру
                        </a>
                    </div>
                </div>
                <div class="video__parnas">
                    <p class="video-title">Спектакль "Пиковая дама"</p>
                    <div class="video-wrapper">
                        <iframe 
                        src="https://vk.com/video_ext.php?oid=-54286935&id=456240026&hash=1b031492e14c30fe&autoplay=1&mute=1" 
                        frameborder="0" 
                        allowfullscreen
                        allow="autoplay; encrypted-media"
                        muted
                        loading="eager"
                        ></iframe>
                    </div>
                </div>
            </div>
            
             <div class="parnas__reviews" ref="sliderContainer">
        <p class="parnas__reviews-title">Отзывы наших зрителей</p>
        <div class="slider-controls">
            <button class="slider-arrow prev" @click="prevSlide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <div class="parnas__sliders-wrapper">
                <div class="parnas__sliders-container" 
                     :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div class="parnas__sliders-group" 
                         v-for="(group, groupIndex) in groupedReviews" 
                         :key="groupIndex">
                        <div class="parnas__sliders-block" 
                             v-for="(review, index) in group" 
                             :key="index">
                            <div class="review-header">
                                <p class="review-author">{{ review.author }}</p>
                                <div class="stars">{{ review.stars }}</div>
                            </div>
                            <span class="review-text">{{ review.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="slider-arrow next" @click="nextSlide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="slider-dots">
            <span v-for="i in totalSlides" 
                  :key="i" 
                  :class="{ active: currentSlide === i-1 }" 
                  @click="goToSlide(i-1)"></span>
        </div>
        <a href="https://clck.ru/34oTFd" class="more-reviews-link">
            <span>Еще больше отзывов можно посмотреть здесь</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#7A9CC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        </div>
        </div>
    </section>
    <ParnasPhotos />
    
</template>

<style lang="scss" scoped>
.theaterParnas {
    margin: 30px 0;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.parnas__wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
}

.parnas__block-titles {
    order: 1;
    margin-bottom: 30px;
}

.parnas__title {
    font-size: 28px;
    font-weight: 500;
    color: #e0e0e0;
    margin-bottom: 10px;
}

.parnas__paragraph {
    display: block;
    font-size: 18px;
    color: #d6d6d6;
    margin-bottom: 15px;
}

.parnas__info {
    font-size: 16px;
    line-height: 1.6;
    color: #d0d0d0;
    margin-bottom: 20px;
}
.parnas__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
}
.parnas__title-button {
    display: inline-block;
    padding: 12px 30px;
    background: rgba(#E74C3C, 0.2);
    color: #FF6B5B;
    font-size: 16px;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    text-align: center;
    
    &:hover {
        background: rgba(#E74C3C, 0.3);
    }
    
    &.virtual-tour {
        background: rgba(#7A9CC6, 0.2);
        color: #7A9CC6;
        
        &:hover {
            background: rgba(#7A9CC6, 0.3);
        }
    }
}

.video__parnas {
    order: 2;
    width: 100%;
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s 0.3s forwards;
    
    .video-title {
        font-size: 18px;
        margin-bottom: 15px;
        text-align: center;
        color: #e0e0e0;
    }
    
    .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        overflow: hidden;
        border-radius: 8px;
        
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
    }
}

/* Стили слайдера */
.parnas__reviews {
    margin: 40px 0;
    padding: 30px 0;
    background: rgba(25, 25, 25, 0.7);
    border-radius: 12px;
    
    &-title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 25px;
        color: #e0e0e0;
        position: relative;
        
        &::after {
            content: '';
            display: block;
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #7A9CC6, transparent);
            margin: 15px auto 0;
        }
    }
}

.slider-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    position: relative;
}

.slider-arrow {
    background: rgba(40, 40, 40, 0.9);
    border: 1px solid rgba(122, 156, 198, 0.4);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    flex-shrink: 0;
    cursor: pointer;
    z-index: 2;
    
    &.prev {
        margin-right: 10px;
    }
    
    &.next {
        margin-left: 10px;
    }
    
    &:hover {
        background: rgba(122, 156, 198, 0.3);
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
}

.parnas__sliders-wrapper {
    width: 100%;
    overflow: hidden;
    padding: 0 20px;
}

.parnas__sliders-container {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 100%;
}

.parnas__sliders-group {
    display: flex;
    flex: 0 0 100%;
    gap: 20px;
    padding: 10px 0;
    box-sizing: border-box;
}

.parnas__sliders-block {
    flex: 1;
    padding: 20px;
    background: rgba(35, 35, 35, 0.85);
    border-radius: 10px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
}


/* Адаптация для мобильных (до 768px) */
@media (max-width: 767px) {
    .parnas__sliders-block {
        flex: 0 0 100%;
    }
    .parnas__buttons {
        flex-direction: column;
        gap: 10px;
    }
    
    .parnas__title-button {
        width: 100%;
        padding: 10px 15px;
        font-size: 14px;
    }
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.review-author {
    font-size: 16px;
    font-weight: 500;
    color: #7A9CC6;
}

.stars {
    color: #FFD166;
    font-size: 16px;
}

.review-text {
    font-size: 14px;
    line-height: 1.5;
    color: #d0d0d0;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.slider-dots {
    display: flex;
    justify-content: center;
    margin: 25px 0 20px;
    gap: 8px;
    
    span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(160, 160, 160, 0.3);
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
            transform: scale(1.2);
        }
        
        &.active {
            background: #7A9CC6;
            width: 16px;
            border-radius: 5px;
        }
    }
}

.more-reviews-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    color: #7A9CC6;
    font-size: 14px;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    animation: fadeIn 1s 0.5s both;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #7A9CC6;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s;
    }
    
    svg {
        transition: transform 0.3s;
    }
    
    &:hover {
        background: rgba(122, 156, 198, 0.1);
        
        &::after {
            transform: scaleX(1);
            transform-origin: left;
        }
        
        svg {
            transform: translateX(3px);
        }
    }
}

/* Адаптация для планшетов (768px - 1024px) */
@media (min-width: 768px) {
    .parnas__wrap {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
    
    .parnas__block-titles {
        flex: 1;
        max-width: 50%;
        margin-bottom: 0;
        padding-right: 30px;
    }
    
    .video__parnas {
        flex: 1;
        max-width: 50%;
        margin-bottom: 0;
    }
    
    .parnas__sliders-block {
        flex: 0 0 calc(50% - 10px);
        min-height: auto;
    }
    
    .slider-controls {
        max-width: 800px;
    }
}

/* Адаптация для десктопов (1024px и больше) */
@media (min-width: 1024px) {
    .parnas__sliders-block {
        flex: 0 0 calc(33.333% - 14px);
    }
    
    .slider-controls {
        max-width: 1000px;
    }
}

/* Адаптация для мобильных (до 768px) */
@media (max-width: 767px) {
    .parnas__sliders-block
    {
        flex: 0 0 100%;
    }
    .parnas__title {
        font-size: 24px;
    }
    
    .parnas__paragraph {
        font-size: 16px;
    }
    
    .parnas__info {
        font-size: 15px;
    }
    
    .slider-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        
        &.prev {
            left: 5px;
            margin-right: 0;
        }
        
        &.next {
            right: 5px;
            margin-left: 0;
        }
    }
    
    .review-text {
        -webkit-line-clamp: 6;
    }
}

/* Анимации */
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>