
// Variáveis globais
let currentProfileIndex = 0;
let currentPhotoIndex = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let moveX = 0;
let moveY = 0;

// Elementos do DOM
const cardsContainer = document.getElementById('cards-container');
const emptyState = document.getElementById('empty-state');
const matchPopup = document.getElementById('match-popup');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const superLikeBtn = document.getElementById('super-like-btn');

// Inicialização
function init() {
    if (profiles.length > 0) {
        renderProfileCard(profiles[currentProfileIndex]);
        
        // Adicionar event listeners
        likeBtn.addEventListener('click', swipeRight);
        dislikeBtn.addEventListener('click', swipeLeft);
        superLikeBtn.addEventListener('click', superLike);
        
        // Event listeners para swipe
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    } else {
        showEmptyState();
    }
}

// Iniciar o app quando a página carregar
document.addEventListener('DOMContentLoaded', init);
  