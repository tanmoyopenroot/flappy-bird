var img_sheet,
  frames,
  score,
  best = localStorage.getItem("best") || 0,
  bird,
  pipes = [],
  states = {
    start: 0,
    game: 1,
    end: 2
  },
  currentState,
  s_fg_x_temp = 0;

function setup() {
  createCanvas(350, 480);

  img_sheet = loadImage("res/sheet.png");
  initSprites(img_sheet);
  currentState = states.start;
  bird = new Bird();
  frames = 0;
  score = 0;
}

function updatePipes() {
  if (frames % 100 == 0)
    pipes.push(new defPipe());

  var minSafe, maxSafe;

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;

    if (!i) {

      // console.log(bird.x + bird.width / 2);

      if (bird.x + 26 >= pipes[i].x && bird.x <= pipes[i].x + pipes[i].width) {
        minSafe = pipes[i].y + pipes[i].height;
        maxSafe = minSafe + 90;

        if (bird.y < minSafe || bird.y > maxSafe) {
          currentState = states.end;
          bird.velocity = bird.jump;
        }
      }

      if (bird.x == (pipes[i].x + pipes[i].width / 2))
        score++;
      // console.log(score);
    }

    if (pipes[i].x < -pipes[i].width) {
      pipes.splice(i, 1);
      i--;
      // console.log("Pipe Removed");
    }
  }
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y >= height - s_fg.height - 10) {
    bird.y = height - s_fg.height - 10;
    currentState = states.end;
    bird.rotation = 0;
    bird.velocity = bird.jump;
  }
}

function endUpdate() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y >= height - s_fg.height - 10)
    bird.y = height - s_fg.height - 10;
}

function update() {
  frames++;
  if (currentState == states.game)
    updatePipes();

  if (currentState == states.start) {
    bird.y = height - 280 + 5 * Math.cos(frames / 10);
    bird.rotation = 0;
  } else if (currentState == states.game)
    updateBird();
  else
    endUpdate();

  if (currentState != states.end) {
    s_fg_x_temp -= 2;
    s_fg_x_temp = s_fg_x_temp % 14;
  }
}

function drawPipes() {
  if (!pipes.length)
    return;

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].draw();
  }
}

function render() {
  // console.log(s_bg.height);
  s_bg.draw(0, height - s_bg.height);
  s_bg.draw(s_bg.width, height - s_bg.height);

  drawPipes();
  // console.log(bird.currentBirdFrame);
  bird.draw();

  if (frames % 4 == 0 && currentState != states.end) {
    bird.currentBirdFrame++;
    bird.currentBirdFrame = bird.currentBirdFrame % 4;
    // console.log("Hello");
  }

  s_fg.draw(s_fg_x_temp, height - s_fg.height);
  s_fg.draw(s_fg.width + s_fg_x_temp, height - s_fg.height);

  if (currentState == states.start) {
    s_splash.draw(width / 2 - s_splash.width / 2, height - 300);
    s_text.GetReady.draw(width / 2 - s_text.GetReady.width / 2, height - 380);
    s_numberB.draw(null, 20, score);
  } else if (currentState == states.end) {
    s_text.GameOver.draw(width / 2 - s_text.GameOver.width / 2, height - 400);
    s_score.draw(width / 2 - s_score.width / 2, height - 400 + s_text.GameOver.height + 10);
    s_buttons.Ok.draw(width / 2 - s_buttons.Ok.width / 2, height - 400 + s_text.GameOver.height + s_score.height + 20);

    s_numberS.draw(width / 2 + 70, height - 315, score, true);
    s_numberS.draw(width / 2 + 70, height - 273, best, true);
    console.log(best);

    if (score >= best && score)
      s_medal[1].draw(width / 2 - 90, height - 309);
    else if (score >= best - 3 && score)
      s_medal[0].draw(width / 2 - 90, height - 309);


  } else {
    s_numberB.draw(null, 20, score);
  }



}

function draw() {
  background(s_bg.color);
  update();
  render();

  best = Math.max(best, score);
  localStorage.setItem("best", best);
}

function mouseClicked() {
  if (currentState != states.end) {
    currentState = states.game;
    bird.makeJump();
  } else {
    var m_x = width / 2 - s_buttons.Ok.width / 2,
      m_y = height - 400 + s_text.GameOver.height + s_score.height + 20;

    if (mouseX > m_x && mouseX < m_x + 80 && mouseY > m_y && mouseY < m_y + 30) {
      pipes = [];
      currentState = states.start;
      score = 0;
    }
  }
}
