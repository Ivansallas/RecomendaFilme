let campoIdade;
let campoFantasia;
let campoAventura;
let imagemAtual;
let imagens = {};

async function setup() {
  createCanvas(800, 400);
  createElement("h2", "Recomendador de filmes");
  createSpan("Qual é a sua idade?");
  campoIdade = createInput();
  campoFantasia = createCheckbox("Gosta de fantasia?");
  campoAventura = createCheckbox("Gosta de aventura?");

  //adicionar as imagens conforme abaixo
  //buscar as imagens na web e baixar para o mesmo diretório do sketch
  imagens.chihiro = await loadImage("chihiro.jpeg");
  imagens.pi = await loadImage("pi.jpeg");
}

function draw() {
  background("white");

  // Exibe mensagem de carregamento enquanto as imagens não estão prontas
  if (!imagens || Object.keys(imagens).length === 0) {
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Carregando imagens...", width / 2, height / 2);
    return;
  }

  // Lê e valida a idade
  let idade = int(campoIdade.value());
  if (isNaN(idade) || idade <= 0) {
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Por favor, insira uma idade válida.", width / 2, height / 2);
    return;
  }

  // Lê preferências
  let gostaDeFantasia = campoFantasia.checked();
  let gostaDeAventura = campoAventura.checked();

  // Gera recomendação e exibe imagem correspondente
  let chaveImagem = geraRecomendacao(idade, gostaDeFantasia, gostaDeAventura);
  imagemAtual = imagens[chaveImagem];

  if (imagemAtual) {
    imageMode(CENTER);
    image(imagemAtual, width / 2, height / 2, 400, 300);
    fill("black");
    textAlign(CENTER, TOP);
    textSize(18);
    text(`Filme: ${chaveImagem}`, width / 2, height / 2 + 160);
  } else {
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Imagem não encontrada para a recomendação.", width / 2, height / 2);
  }
}

function geraRecomendacao(idade, gostaDeFantasia, gostaDeAventura) {
  if (idade >= 14) {
    return "vento";
  } else if (idade >= 12) {
    if (gostaDeFantasia || gostaDeAventura) {
      return "aranhaverso";
    } else {
      return "ladroes";
    }
  } else if (idade >= 10) {
    if (gostaDeFantasia) {
      return "pi";
    } else {
      return "chuva";
    }
  } else {
    if (gostaDeFantasia) {
      return "chihiro";
    } else {
      return "tempo";
    }
  }
}
