// ÁguaAlerta | menu de navegação (abrir/fechar no celular e seção ativa)

const botaoMenu = document.getElementById("menu-botao");
const menu = document.getElementById("menu");
const linksMenu = document.querySelectorAll(".menu-lista a");
const secoes = document.querySelectorAll("main section[id]");

// Abre e fecha o menu no celular
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});

// Fecha o menu ao clicar em um link
linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

// Destaca no menu a seção que o usuário está lendo
function marcarSecaoAtiva() {
  const posicao = window.scrollY + 120;
  let atual = "";

  secoes.forEach((secao) => {
    if (posicao >= secao.offsetTop) {
      atual = secao.id;
    }
  });

  linksMenu.forEach((link) => {
    const ativo = link.getAttribute("href") === "#" + atual;
    link.classList.toggle("ativo", ativo);
    if (ativo) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", marcarSecaoAtiva);
window.addEventListener("load", marcarSecaoAtiva);
