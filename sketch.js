// criação de variaveis globais
var menina, meninaImg

var floresta, florestaImg

var chao , chaoImg

var obstaculo1, obstaculo2, obstaculo3, obstaculogrupo;

var score=0;
var pontos;

var invisibleGround;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

// carregando as imagens 
function preload(){
    meninaImg = loadImage("menina.png")
    florestaImg = loadImage("floresta1.png")
    chaoImg = loadImage("chao.jpg")

    //carregar imagem dos obstaculos 1, 2, 3 ;
    obstaculo1 = loadImage("cacto1.png")
    obstaculo2 = loadImage("1f335.png")
    obstaculo3 = loadImage("cacto2.png")

}

function setup() {
  // codigo para estabelecer o tamanho da tela 
  createCanvas(1000,600)

  // criação do cenario 
  floresta = createSprite(300,300);
  floresta.addImage("floresta",florestaImg);
  floresta.velocityX= -5;
  floresta.scale =0.8

  // criação do personagem 
  menina = createSprite(179,530,20,20)
  menina.addImage("menina",meninaImg)
  menina.scale = 0.4;

  //criação do chão 
  chao = createSprite(500,585)
  chao.addImage("chao", chaoImg)
  chao.velocityX = -5
  chao.scale = 0.5

  // criação do grupo de obstaculos 
  obstaculogrupo = new Group();

  // criação do chão invisivel
  invisibleGround = createSprite(500,600,1000,10);
  invisibleGround.visible = false;

 }

function draw() {
    // cor do fundo 
    background("pink")

    if(gameState === PLAY){
      // chamando a função para gerar obstaculos 
    gerarObstaculo();

    //acumulando pontuação de acordo com a quantidade de quadros   
    score = score + Math.round(getFrameRate()/60);

    // criando fundo infinito da floresta 
    if (floresta.x < 300){
        floresta.x = 800
    }

    // chão infinito 
    if(chao.x <300){
      chao.x = 600
    }
    // se a tecla espaço for precionada a menina vai pular 
    if(keyDown("space")&& menina.y >= 100) {
      menina.velocityY = -12;
    }
    //gravidade para menina 
    menina.velocityY = menina.velocityY +1;
     
    // verificar que obstaculos toca na menina 
    if(obstaculogrupo.isTouching(menina)){
      gameState = END;
     
    }

    }

    if(gameState === END){
      obstaculogrupo.setVelocityXEach(0)
      floresta.velocityX = 0;
      chao.velocityX = 0;
    }

    
    // menina colidir com o chão invisivel 
    menina.collide(invisibleGround)

    
    // desenhando os sprites 
    drawSprites()
    textSize(20)
    fill("red")
    text("desenvolvido por : Anna Dávilla ",50,40)
    text("pontuação: "+score,800,40)
}

function gerarObstaculo(){
    if (frameCount % 90 === 0){
      var obstaculo = createSprite(1000,500,10,40);
      obstaculo.scale = 0.08
      obstaculo.velocityX = -6
      
       //gerar obstáculos aleatórios
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstaculo.addImage(obstaculo1);
                 break;
         case 2: obstaculo.addImage(obstaculo2);
                 break;
         case 3: obstaculo.addImage(obstaculo3);
                 break;
         default: break;
       }
      
       //atribua dimensão e tempo de vida aos obstáculos          
       obstaculo.scale = 0.3;
       obstaculo.lifetime = 300;
      
      //adicione cada obstáculo ao grupo
       obstaculogrupo.add(obstaculo);
    }
   }
   