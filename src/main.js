

const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    backgroundColor: '#222',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        preload,
        create,
        update,
    },
};

const game = new Phaser.Game(config);

function preload() {
    // Load the sprite sheet (5 gems, 9 frames each, 16x16 per frame)
    this.load.spritesheet('gems', 'src/assets/gems.png', {
        frameWidth: 16,
        frameHeight: 16,
    });
}

function create() {
        this.anims.create({
            key: 'gem1',
            frames: [
                { key: 'gems', frame: 0 },
                { key: 'gems', frame: 5 },
                { key: 'gems', frame: 10 },
                { key: 'gems', frame: 15 },
                { key: 'gems', frame: 20 },
                { key: 'gems', frame: 25 },
                { key: 'gems', frame: 30 },
                { key: 'gems', frame: 35 },
                { key: 'gems', frame: 40 },
            ],
            frameRate: 10,
            repeat: -1, // Loop the animation
        });
        this.anims.create({
            key: 'gem2',
            frames: [
                { key: 'gems', frame: 1 },
                { key: 'gems', frame: 6 },
                { key: 'gems', frame: 11 },
                { key: 'gems', frame: 16 },
                { key: 'gems', frame: 21 },
                { key: 'gems', frame: 26 },
                { key: 'gems', frame: 31 },
                { key: 'gems', frame: 36 },
                { key: 'gems', frame: 41 },
            ],
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'gem3',
            frames: [
                { key: 'gems', frame: 2 },
                { key: 'gems', frame: 7 },
                { key: 'gems', frame: 12 },
                { key: 'gems', frame: 17 },
                { key: 'gems', frame: 22 },
                { key: 'gems', frame: 27 },
                { key: 'gems', frame: 32 },
                { key: 'gems', frame: 37 },
                { key: 'gems', frame: 42 },
            ],
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'gem4',
            frames: [
                { key: 'gems', frame: 3 },
                { key: 'gems', frame: 8 },
                { key: 'gems', frame: 13 },
                { key: 'gems', frame: 18 },
                { key: 'gems', frame: 23 },
                { key: 'gems', frame: 28 },
                { key: 'gems', frame: 33 },
                { key: 'gems', frame: 38 },
                { key: 'gems', frame: 43 },
            ],
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'gem5',
            frames: [
                { key: 'gems', frame: 4 },
                { key: 'gems', frame: 9 },
                { key: 'gems', frame: 14 },
                { key: 'gems', frame: 19 },
                { key: 'gems', frame: 24 },
                { key: 'gems', frame: 29 },
                { key: 'gems', frame: 34 },
                { key: 'gems', frame: 39 },
                { key: 'gems', frame: 44 },
            ],
            frameRate: 10,
            repeat: -1,
        });
    
        this.gems = this.physics.add.group();
    
        // Timer to spawn gems
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const gemType = Phaser.Math.Between(1, 5);
                const baseSpeed = 150;
                const gem = this.gems.create(
                    Phaser.Math.Between(50, config.width - 50),
                    -50,
                    'gems'
                );
    
                gem.play(`gem${gemType}`); // Play the animation
                gem.setData('value', gemType * 10); // Example scoring
                gem.setData('speed', baseSpeed + gemType * 20); // Example speed
                gem.setVelocityY(gem.getData('speed'));
            },
            loop: true,
        });
    
        this.score = 0;
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: '20px',
            fill: '#fff',
        });
    
        this.input.on('pointerdown', (pointer) => {
            const gem = this.physics.overlapRect(
                pointer.x,
                pointer.y,
                1,
                1
            )[0]?.gameObject;
    
            if (gem && this.gems.contains(gem)) {
                this.score += gem.getData('value');
                this.scoreText.setText(`Score: ${this.score}`);
                gem.destroy();
            }
        });
    }

function update() {
    // Remove gems that fall out of bounds
    this.gems.children.iterate((gem) => {
        if (gem && gem.y > config.height) {
            gem.destroy();
        }
    });
}
