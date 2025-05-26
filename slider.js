const images = [
  'https://picsum.photos/id/1015/600/350',
  'https://picsum.photos/id/1025/600/350',
  'https://picsum.photos/id/1035/600/350',
  'https://picsum.photos/id/1045/600/350',
  'https://picsum.photos/id/1055/600/350'
];

const mainImage = document.getElementById('mainImage');
const thumbnails = document.getElementById('thumbnails');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let autoSlideInterval;

function setMainImage(index) {
  currentIndex = index;
  mainImage.src = images[index];
  updateActiveThumbnail();
}

function updateActiveThumbnail() {
  const thumbImgs = thumbnails.querySelectorAll('img');
  thumbImgs.forEach((img, idx) => {
    img.classList.toggle('active', idx === currentIndex);
  });
}

function createThumbnails() {
  images.forEach((imgSrc, index) => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    thumb.alt = `Thumbnail ${index + 1}`;
    thumb.addEventListener('click', () => {
      setMainImage(index);
      resetAutoSlide();
    });
    thumbnails.appendChild(thumb);
  });
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  setMainImage(currentIndex);
  resetAutoSlide();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  setMainImage(currentIndex);
  resetAutoSlide();
}

function autoSlide() {
  autoSlideInterval = setInterval(() => {
    nextImage();
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlide();
}

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

createThumbnails();
setMainImage(0);
autoSlide();
