<script setup>
import { ref } from 'vue';

// Импортируем изображения напрямую
import theater1 from '@/assets/images/theater-1.jpg';
import theater2 from '@/assets/images/theater-2.jpg';
import theater3 from '@/assets/images/theater-3.jpg';
import theater4 from '@/assets/images/theater-4.png'; // измените на .png если нужно

// Данные фотографий
const photos = ref([
  { src: theater1, alt: 'Фото Зала', caption: 'Наши залы' },
  { src: theater2, alt: 'Фото Зала и людей', caption: 'Наши залы' },
  { src: theater3, alt: 'Зрительный зал', caption: 'Наши залы' },
  { src: theater4, alt: 'Фото Зала', caption: 'Наши залы' }
]);

// Лайтбокс
const lightboxVisible = ref(false);
const currentPhotoIndex = ref(0);
const currentPhoto = ref({});

const openLightbox = (index) => {
  currentPhotoIndex.value = index;
  currentPhoto.value = photos.value[index];
  lightboxVisible.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxVisible.value = false;
  document.body.style.overflow = '';
};

const prevPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + photos.value.length) % photos.value.length;
  currentPhoto.value = photos.value[currentPhotoIndex.value];
};

const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length;
  currentPhoto.value = photos.value[currentPhotoIndex.value];
};

const showMorePhotos = () => {
  // Здесь может быть переход на страницу с полной галереей
  console.log('Показать больше фото');
};
</script>

<template>
  <!-- Новая секция с фотогалереей -->
  <section class="photo-gallery">
    <div class="gallery-header">
      <h2 class="gallery-title">Закулисье театра</h2>
      <p class="gallery-subtitle">Уникальные моменты из жизни театра</p>
    </div>
    
    <div class="gallery-container">
      <!-- Галерея фотографий - теперь без главного фото, так как у нас всего 4 фото -->
      <div class="gallery-grid">
        <div class="gallery-item" v-for="(photo, index) in photos" :key="index" @click="openLightbox(index)">
          <img :src="photo.src" :alt="photo.alt" loading="lazy">
          <div class="photo-overlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="white" stroke-width="2"/>
              <path d="M21 12C21 13.6569 19.6569 15 18 15C16.3431 15 15 13.6569 15 12C15 10.3431 16.3431 9 18 9C19.6569 9 21 10.3431 21 12Z" stroke="white" stroke-width="2"/>
              <path d="M3 12C3 13.6569 4.34315 15 6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12Z" stroke="white" stroke-width="2"/>
            </svg>
            <span class="photo-caption">{{ photo.caption }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Лайтбокс для просмотра фотографий -->
    <div class="lightbox" v-if="lightboxVisible" @click.self="closeLightbox">
      <div class="lightbox-content">
        <button class="lightbox-close" @click="closeLightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img :src="currentPhoto.src" :alt="currentPhoto.alt">
        <div class="lightbox-nav">
          <button class="nav-btn prev" @click.stop="prevPhoto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="nav-btn next" @click.stop="nextPhoto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="lightbox-caption">{{ currentPhoto.caption }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.photo-gallery {
  padding: 60px 0;
  margin-bottom: 50px;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    pointer-events: none;
  }
}

.gallery-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.gallery-title {
  font-size: 2.2rem;
  color: #e0e0e0;
  margin-bottom: 10px;
  font-weight: 500;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: #7A9CC6;
  }
}

.gallery-subtitle {
  font-size: 1.1rem;
  color: #b0b0b0;
  margin-top: 20px;
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4 / 3;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    
    .photo-overlay {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  text-align: center;
  
  .photo-caption {
    color: white;
    margin-top: 15px;
    font-size: 0.9rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease 0.1s;
  }
  
  &:hover .photo-caption {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Лайтбокс стили */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  
  img {
    max-height: 80vh;
    max-width: 100%;
    display: block;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  }
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    opacity: 0.8;
  }
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
  
  .nav-btn {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(122, 156, 198, 0.5);
    }
  }
}

.lightbox-caption {
  text-align: center;
  color: white;
  margin-top: 15px;
  font-size: 1.1rem;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .gallery-title {
    font-size: 1.8rem;
  }
  
  .lightbox-content img {
    max-height: 60vh;
  }
  
  .lightbox-nav .nav-btn {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .photo-gallery {
    padding: 40px 0;
  }
  
  .gallery-title {
    font-size: 1.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .lightbox-content img {
    max-height: 50vh;
  }
}
</style>