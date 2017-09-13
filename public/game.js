BasicGame.Game = function(game) {
};

BasicGame.Game.prototype = {

  create: function() {
    this.setupBackground();
    this.setupPlayer();
    this.setupEnemies();
    this.setupExplosions();
    this.setupText();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.nextEnemyAt = 0;
    this.enemyDelay = 10;
  },

  checkCollisions: function() {
    this.physics.arcade.collide(this.player, this.enemyPool, this.enemyHit, null, this);
  },

  spawnEnemies: function() {
    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(this.rnd.integerInRange(20, this.game.width - 20), 0);
      enemy.body.velocity.y = this.rnd.integerInRange(50, 90);
      enemy.play('walk');
    }
  },

  processPlayerInput: function() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.animations.play('right');
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('down');
    }

    if (this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      }
    }
  },

  processDelayedEffects: function() {
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
    }
    if (this.dropShadow.exists && this.time.now > this.instExpire) {
      this.dropShadow.destroy();
    }
    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 30,
        'Click to go to Title Screen',
        { font: '16px sans-serif', fill: '#fff' }
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }
  },

  setupBackground: function() {
    this.grass = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'grass');
  },

  setupPlayer: function() {
    this.player = this.add.sprite(this.game.width / 2, this.game.height - 50, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3], 10, true);
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 20, 0, 10);
  },

  setupEnemies: function() {
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(50, 'enemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', BasicGame.ENEMY_REWARD, false, false, 0, true);
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('walk', [17, 18, 19, 20, 19, 18, 17], 10, true);
    });
  },

  setupExplosions: function() {
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom', [0, 1, 2, 3, 4], 10, true);
    });
  },

  setupText: function() {
    this.dropShadow = this.add.text(this.game.width / 2, this.game.height - 98, 'Use Arrow Keys to move. Eat ALL THE TRAINERS.', {
      font: '23px monospace',
      fill: '#000',
      align: 'center'
    });

    this.instructions = this.add.text(this.game.width / 2, this.game.height - 100, 'Use Arrow Keys to move. Eat ALL THE TRAINERS.', {
      font: '23px monospace',
      fill: '#fff',
      align: 'center'
    });

    this.instructions.anchor.setTo(0.5, 0.5);
    this.dropShadow.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 5000;

    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 30, '' + this.score,
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
  },

  enemyHit: function(player, enemy) {
    // console.log('grow');
    this.explode(enemy);
    // this.grow(player);
    enemy.kill();
    this.addToScore(enemy.reward);
  },

  // playerHit: function (player, enemy) {
  //   this.explode(player);
  //   player.kill();
  //   this.displayEnd(false);
  // },

  addToScore: function(score) {
    this.score += score;
    this.scoreText.text = this.score;
      if (this.score >= 3000) {
        this.enemyPool.destroy();
        this.displayEnd(true);
      }
  },

  update: function() {
    this.checkCollisions();
    this.spawnEnemies();
    this.processPlayerInput();
    this.processDelayedEffects();
  },

  explode: function(sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  },

  // grow: function(player, growthpoints) {
  //         console.log('grow');
  //   this.player.scale = this.player.scale + (this.player.scale * growthpoints);
  //   this.player.size.x = this.player.size.x + (this.player.scale * growthpoints);
  //   this.player.size.y = this.player.size.y + (this.player.scale * growthpoints);
  // },

  displayEnd: function(win) {
    if (this.endText && this.endText.exists) {
      return;
    }
    var msg = win ? 'DELICIOUS VICTORY!!!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.width / 2, this.game.height / 2 - 60, msg,
      { font: '72px impact', fill: '#fff' }
    );
    this.endText.anchor.setTo(0.5, 0);

    this.showReturn = this.time.now + BasicGame.RETURN_MESSAGE_DELAY;
  },

  quitGame: function(pointer) {
    this.grass.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.explosionPool.destroy();
    this.instructions.destroy();
    this.dropShadow.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();

    this.state.start('MainMenu');
  }
};
