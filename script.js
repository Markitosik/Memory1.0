var canvas
var context
var start = false
var cards = []
var cardWidth = 75
var cardHeight = 75
var timer = -0.01
var game = 0
var time = -2


window.onload = function() {
  var img=document.getElementById("image1");
  canvas=document.getElementById("draw")
  context=canvas.getContext("2d");
  context.rect(0,0, 1080, 720);
  context.fillStyle = "#FFCCBB";
  context.fill();
  var start = false;
  var start_key = 32;
  var keyState = [];
  keyState.length = 256;
  context.font = "25pt Arial";
  context.fillStyle = "black";
  context.fillText("Игра MEMORY", 425, 250);
  context.font = "12pt Arial";
  context.fillText("Суть игры такова - карточки с цифрами выкладываются на стол «рубашкой» вверх.",225, 350);
  context.fillText("Далее игрок открывает две любые карточки.", 225, 375);
  context.fillText("Если на них изображены одинаковые цифры, карточки пропадают.", 225, 400);
  context.fillText("Если вскрытые карточки разные - они переворачиваются обратно - «рубашкой» вверх.", 225, 425);
  context.fillText("Необходимо как можно быстрее найти все пары.", 225, 450);
  context.font = "10pt Arial";
  context.fillText("Чтобы начать нажми пробел!", 450, 650);
  window.onmousedown = mouse;
  window.onkeydown = processKey;


  var count = 0;
  var card1;
  var card2;


  canvas.addEventListener("click", e =>
  {

        if (timer - time > 0.5 )
        {
          for (var i = 0; i < 20; i++)
          {
            if((count == 1 && card1 != i || count == 0) && timer > 0 && e.offsetX < (cards[i].x + cardWidth) && e.offsetX > cards[i].x
             && e.offsetY > cards[i].y && e.offsetY < (cards[i].y + cardHeight) && cards[i].status != 0) {
               count++;
              if (count == 1)
                card1 = i;
              else if (count == 2)
              {
                card2 = i;
                time = timer;
              }
              context.fillStyle = "black";
              context.font = "25pt Arial";
              context.fillText(cards[i].number, cards[i].x + 15, cards[i].y + 50);
              break;
            }
          }

          if (count > 1)
          {
            setTimeout(update, 500, card1, card2);
            count = 0;

          }
        }
  });
}

function update(card1, card2)
{
    if (cards[card1].number == cards[card2].number)
    {
      game++;
      console.log(cards[card1].number + "  ==  " + cards[card2].number)
      context.fillStyle = "#FFCCBB";
      cards[card1].status = 0;
      cards[card2].status = 0;
    }
    else
    {
      context.fillStyle = "#6EB5C0";
    }

  context.clearRect(cards[card1].x, cards[card1].y, cardWidth, cardHeight);
  context.clearRect(cards[card2].x, cards[card2].y, cardWidth, cardHeight);

  context.rect(cards[card1].x, cards[card1].y, cardWidth, cardHeight);
  context.fillRect(cards[card1].x, cards[card1].y, cardWidth, cardHeight);

  context.rect(cards[card2].x, cards[card2].y, cardWidth, cardHeight);
  context.fillRect(cards[card2].x, cards[card2].y, cardWidth, cardHeight);
  if (game == 10)
    start = false;
}

function mouse ()
{
  if (!start){
  start = true;
  timer = -0.01;
  time = -2;
  game = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  loadEasy();
}
}

function processKey(e) {
  if (e.keyCode == 32)
  {
    start = true;
    timer = -0.01;
    time = -2;
    game = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    loadEasy();
  }
}


function draw() {
  if (start) {
    timer += 0.01;
    context.clearRect(950, 640, 150, 50);
    context.rect(100, 640, 50, 50);
    context.fillStyle = "#FFCCBB";
    context.fillRect(950, 640, 150, 50);
    context.font = "25pt Arial";
    context.fillStyle = "black";
    context.fillText(timer.toFixed(2), 960, 670);
  }
  else if (!start && game == 10)
  {
    context.rect(0, 0, 1080, 720);
    context.fillStyle = "#FFCCBB";
    context.fill();
    context.font = "25pt Arial";
    context.fillStyle = "black";
    context.fillText("Ваш результат: " + timer.toFixed(2), 400, 250);
    context.font = "10pt Arial";
    context.fillText("Чтобы начать нажми пробел!", 450, 650);
  }
}


setInterval(draw, 10);


function loadEasy() {
  var start_x;
  var start_y;
  var arr = [];
  var g;
  var j;

  context.rect(0,0, 1080, 720);
  context.fillStyle = "#FFCCBB";
  context.fill();

  for (var q = 0; q < 20; q++)
  cards[q] = {x: 0, y: 0, number: Math.floor((q+2)/2), status: 1};

  for (var f = 0; f < 20; f++)
  {
  g = cards[f].number;
  j = Math.floor(Math.random() * 20);

  cards[f].number = cards[j].number;
  cards[j].number = g;
  }

  for (var i = 0; i < 20; i++)
  {
    if (i < 10)
    {
      cards[i].y = 200;
      cards[i].x = i * 100 + 50;
    }
    else
    {
      cards[i].y = 325;
      cards[i].x = (i - 10) * 100 + 50;
    }

    context.beginPath();
    context.rect(cards[i].x, cards[i].y, cardWidth, cardHeight);
    context.fillStyle = "#6EB5C0";
    context.fill();
    context.closePath();
  }
}
