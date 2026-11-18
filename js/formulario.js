// ÁguaAlerta | formulário de cadastro com validação
// Impede o envio de campos vazios e mostra as mensagens de erro na tela.

const formulario = document.getElementById("formulario-cadastro");
const mensagemFormulario = document.getElementById("mensagem-formulario");

const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoBairro = document.getElementById("bairro");
const campoPerfil = document.getElementById("perfil");
const campoAceite = document.getElementById("aceite");
const opcoesCanal = document.querySelectorAll('input[name="canal"]');

// ---------- Funções de apoio ----------

// Escreve a mensagem de erro e marca o campo como inválido
function mostrarErro(campo, nomeDoErro, texto) {
  document.getElementById("erro-" + nomeDoErro).textContent = texto;
  if (campo) {
    campo.classList.add("invalido");
    campo.setAttribute("aria-invalid", "true");
  }
}

// Remove a mensagem de erro e a marcação do campo
function limparErro(campo, nomeDoErro) {
  document.getElementById("erro-" + nomeDoErro).textContent = "";
  if (campo) {
    campo.classList.remove("invalido");
    campo.removeAttribute("aria-invalid");
  }
}

function limparTodosOsErros() {
  limparErro(campoNome, "nome");
  limparErro(campoEmail, "email");
  limparErro(campoBairro, "bairro");
  limparErro(campoPerfil, "perfil");
  limparErro(null, "canal");
  limparErro(null, "aceite");
}

function limparMensagem() {
  mensagemFormulario.replaceChildren();
}

// ---------- Validações (cada uma devolve true quando está correta) ----------

function validarNome() {
  const valor = campoNome.value.trim();
  if (valor === "") {
    mostrarErro(campoNome, "nome", "Digite seu nome completo.");
    return false;
  }
  if (valor.length < 3) {
    mostrarErro(campoNome, "nome", "O nome precisa ter pelo menos 3 letras.");
    return false;
  }
  limparErro(campoNome, "nome");
  return true;
}

function validarEmail() {
  const valor = campoEmail.value.trim();
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valor === "") {
    mostrarErro(campoEmail, "email", "Digite seu e-mail.");
    return false;
  }
  if (!formatoEmail.test(valor)) {
    mostrarErro(campoEmail, "email", "Digite um e-mail válido, como nome@email.com.");
    return false;
  }
  limparErro(campoEmail, "email");
  return true;
}

function validarBairro() {
  const valor = campoBairro.value.trim();
  if (valor === "") {
    mostrarErro(campoBairro, "bairro", "Digite o nome do seu bairro.");
    return false;
  }
  limparErro(campoBairro, "bairro");
  return true;
}

function validarPerfil() {
  if (campoPerfil.value === "") {
    mostrarErro(campoPerfil, "perfil", "Escolha uma das opções.");
    return false;
  }
  limparErro(campoPerfil, "perfil");
  return true;
}

function validarCanal() {
  const escolhido = Array.from(opcoesCanal).some((opcao) => opcao.checked);
  if (!escolhido) {
    mostrarErro(null, "canal", "Escolha como quer receber os alertas.");
    return false;
  }
  limparErro(null, "canal");
  return true;
}

function validarAceite() {
  if (!campoAceite.checked) {
    mostrarErro(campoAceite, "aceite", "Marque a caixa para continuar.");
    return false;
  }
  limparErro(campoAceite, "aceite");
  return true;
}

// ---------- Mensagem de sucesso (criada com o DOM) ----------

function mostrarSucesso(nome) {
  const caixa = document.createElement("div");
  caixa.className = "mensagem-sucesso";

  const titulo = document.createElement("strong");
  titulo.textContent = "Cadastro realizado!";

  const texto = document.createElement("span");
  const primeiroNome = nome.trim().split(" ")[0];
  texto.textContent = primeiroNome + ", você vai receber os alertas do ÁguaAlerta.";

  caixa.append(titulo, texto);
  mensagemFormulario.replaceChildren(caixa);
}

function mostrarAviso() {
  const caixa = document.createElement("div");
  caixa.className = "mensagem-aviso";
  caixa.textContent = "Revise os campos destacados para continuar.";
  mensagemFormulario.replaceChildren(caixa);
}

// ---------- Eventos ----------

// Ao enviar: valida tudo e só aceita se não houver nenhum erro
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  limparMensagem();

  const resultados = [
    { ok: validarNome(), campo: campoNome },
    { ok: validarEmail(), campo: campoEmail },
    { ok: validarBairro(), campo: campoBairro },
    { ok: validarPerfil(), campo: campoPerfil },
    { ok: validarCanal(), campo: opcoesCanal[0] },
    { ok: validarAceite(), campo: campoAceite },
  ];

  const primeiroErro = resultados.find((resultado) => !resultado.ok);

  if (primeiroErro) {
    mostrarAviso();
    primeiroErro.campo.focus();
    return;
  }

  // Guarda o nome, limpa o formulário e só então mostra a mensagem
  // (o reset apaga mensagens antigas, por isso vem antes)
  const nomeCadastrado = campoNome.value;
  formulario.reset();
  limparTodosOsErros();
  mostrarSucesso(nomeCadastrado);
});

// Valida cada campo quando o usuário sai dele
campoNome.addEventListener("blur", validarNome);
campoEmail.addEventListener("blur", validarEmail);
campoBairro.addEventListener("blur", validarBairro);
campoPerfil.addEventListener("change", validarPerfil);
campoAceite.addEventListener("change", validarAceite);
opcoesCanal.forEach((opcao) => opcao.addEventListener("change", validarCanal));

// Apaga o erro enquanto o usuário corrige o campo
campoNome.addEventListener("input", () => limparErro(campoNome, "nome"));
campoEmail.addEventListener("input", () => limparErro(campoEmail, "email"));
campoBairro.addEventListener("input", () => limparErro(campoBairro, "bairro"));

// Botão Limpar: tira erros e mensagens
formulario.addEventListener("reset", () => {
  limparTodosOsErros();
  limparMensagem();
});
