// ÁguaAlerta | SlideShow com 3 imagens
// Recursos: botões anterior/próximo, pontos de navegação, troca automática,
// pausa ao passar o mouse e controle pelo teclado (setas).

const INTERVALO_MS = 5000;

const slideshow = document.getElementById("slideshow");
const slides = slideshow.querySelectorAll(".slide");
const botaoAnterior = document.getElementById("slide-anterior");
const botaoProximo = document.getElementById("slide-proximo");
const areaPontos = document.getElementById("slide-pontos");

let indiceAtual = 0;
let temporizador = null;

// Cria um ponto de navegação para cada slide (manipulação do DOM)
const pontos = Array.from(slides).map((slide, i) => {
  const ponto = document.createElement("button");
  ponto.type = "button";
  ponto.className = "slide-ponto";
  ponto.setAttribute("aria-label", "Ir para o slide " + (i + 1));
  ponto.addEventListener("click", () => {
    mostrarSlide(i);
    reiniciarAutoplay();
  });
  areaPontos.appendChild(ponto);
  return ponto;
});

// Mostra o slide pedido e atualiza classes e atributos
function mostrarSlide(novoIndice) {
  // Volta ao início depois do último e vai ao último antes do primeiro
  indiceAtual = (novoIndice + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    const ativo = i === indiceAtual;
    slide.classList.toggle("ativo", ativo);
    slide.setAttribute("aria-hidden", ativo ? "false" : "true");
  });

  pontos.forEach((ponto, i) => {
    const ativo = i === indiceAtual;
    ponto.classList.toggle("ativo", ativo);
    if (ativo) {
      ponto.setAttribute("aria-current", "true");
    } else {
      ponto.removeAttribute("aria-current");
    }
  });
}

function proximoSlide() {
  mostrarSlide(indiceAtual + 1);
}

function slideAnterior() {
  mostrarSlide(indiceAtual - 1);
}

// Troca automática (desligada para quem prefere menos movimento)
function iniciarAutoplay() {
  const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (menosMovimento || temporizador !== null) {
    return;
  }
  temporizador = setInterval(proximoSlide, INTERVALO_MS);
}

function pararAutoplay() {
  clearInterval(temporizador);
  temporizador = null;
}

function reiniciarAutoplay() {
  pararAutoplay();
  iniciarAutoplay();
}

// Eventos
botaoProximo.addEventListener("click", () => {
  proximoSlide();
  reiniciarAutoplay();
});

botaoAnterior.addEventListener("click", () => {
  slideAnterior();
  reiniciarAutoplay();
});

slideshow.addEventListener("mouseenter", pararAutoplay);
slideshow.addEventListener("mouseleave", iniciarAutoplay);
slideshow.addEventListener("focusin", pararAutoplay);
slideshow.addEventListener("focusout", iniciarAutoplay);

slideshow.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowRight") {
    proximoSlide();
  } else if (evento.key === "ArrowLeft") {
    slideAnterior();
  }
});

// Início
mostrarSlide(0);
iniciarAutoplay();
