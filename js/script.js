// Função personalizada para inicializar e controlar o carrossel
function iniciarCarrossel(intervalo = 2800) {
  const carouselElement = document.querySelector('#promoCarousel');

  if (!carouselElement) {
    console.warn("Carrossel não encontrado na página.");
    return;
  }

  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: intervalo,
    ride: 'carousel'
  });

  setTimeout(() => {
    carouselElement.setAttribute('data-bs-interval', '2000');
    console.log("Intervalo alterado para 2s!");
  }, 15000);

  return carousel;
}

// Ativa quando a página terminar de carregar
document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrossel(2800);
});