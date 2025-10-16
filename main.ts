namespace SpriteKind {
    export const Goomba = SpriteKind.create()
    export const Mushroom = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const GrowingMushrooom = SpriteKind.create()
    export const ExtraLifeMushroom = SpriteKind.create()
    export const GameEnd = SpriteKind.create()
    export const WinerFlag = SpriteKind.create()
    export const Carnivore = SpriteKind.create()
    export const Flower = SpriteKind.create()
}
/**
 * ——————————————————
 * 
 * These green blocks changes the color pallatte  in the simulator only, not in the drawing box
 * 
 * ——————————————————
 * 
 * <———————
 * 
 * <———————
 */
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile45`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GrowingMushrooom, function (sprite, otherSprite) {
    tiles.placeOnTile(Super_Mario, tiles.getTileLocation(PlayerCollumm, PlayerRow - 1))
    BigMario = 1
    otherSprite.destroy()
    info.setLife(3)
    if (BigMario == 0) {
        Super_Mario.setImage(assets.image`Mario`)
    } else if (BigMario == 1) {
        Super_Mario.setImage(assets.image`MegaMario`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.WinerFlag, function (sprite, otherSprite) {
    controller.moveSprite(sprite, 0, 0)
    otherSprite.setVelocity(0, 50)
    for (let index = 0; index < 50; index++) {
        sprite.y = otherSprite.y
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile60`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
function Mushroom2Movement (_1UPMushroom: Sprite) {
    MegaMarioMushroom.ay = 100
    MegaMarioMushroom.vx = 50
    if (randint(0, 1) == 0) {
        MegaMarioMushroom.vx = -50
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goomba, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
        characterAnimations.setCharacterState(otherSprite, characterAnimations.rule(Predicate.NotMoving))
        otherSprite.setImage(assets.image`myImage`)
        otherSprite.vx = 0
        otherSprite.lifespan = 3000
        otherSprite.setFlag(SpriteFlag.Ghost, true)
    } else {
        MarioDead = 1
        info.changeLifeBy(-1)
        if (MarioDead == 1) {
            Super_Mario.setImage(assets.image`myImages.image2`)
            Super_Mario.setFlag(SpriteFlag.GhostThroughSprites, true)
            Super_Mario.setFlag(SpriteFlag.GhostThroughWalls, true)
            Super_Mario.vy = -200
            controller.moveSprite(Super_Mario, 0, 0)
            animation.stopAnimation(animation.AnimationTypes.All, Super_Mario)
            pause(2000)
            for (let value of sprites.allOfKind(SpriteKind.Carnivore)) {
                value.destroy()
            }
            for (let value of sprites.allOfKind(SpriteKind.Goomba)) {
                value.destroy()
            }
            for (let MegaMarioMushroom of tiles.getTilesByType(assets.tile`GoombaSpawner`)) {
                myEnemy = sprites.create(assets.image`myImages.image3`, SpriteKind.Goomba)
                tiles.placeOnTile(myEnemy, MegaMarioMushroom)
                myEnemy.vx = 30
                myEnemy.vy = 100
                characterAnimations.loopFrames(
                myEnemy,
                assets.animation`GoombaWalking`,
                220,
                characterAnimations.rule(Predicate.Moving)
                )
            }
            for (let value of tiles.getTilesByType(assets.tile`PlantSpawner`)) {
                PiranhaPlant = sprites.create(assets.image`PiranhaPlant`, SpriteKind.Carnivore)
                tiles.placeOnTile(PiranhaPlant, value)
                PiranhaPlant.y += -7
                PiranhaPlant.x += -8
                characterAnimations.loopFrames(
                PiranhaPlant,
                assets.animation`PiranhaPlantBiting`,
                50,
                characterAnimations.rule(Predicate.NotMoving)
                )
            }
        }
        pause(1500)
        MarioDead = 0
        tiles.placeOnRandomTile(Super_Mario, assets.tile`StartTile`)
        Super_Mario.setFlag(SpriteFlag.GhostThroughSprites, false)
        Super_Mario.setFlag(SpriteFlag.GhostThroughWalls, false)
        Super_Mario.setImage(assets.image`Mario`)
        controller.moveSprite(Super_Mario, 100, 0)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Super_Mario.vy == 0) {
        if (BigMario == 1) {
            spriteutils.jumpImpulse(Super_Mario, 85)
        } else {
            spriteutils.jumpImpulse(Super_Mario, 70)
        }
    }
})
function startNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentLevel += 1
    if (currentLevel == 1) {
        scene.setBackgroundColor(9)
        tiles.setTilemap(tilemap`Super Mario Bros Level1`)
    } else if (currentLevel == 2) {
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`Money room`)
    } else {
    	
    }
    tiles.placeOnRandomTile(Super_Mario, assets.tile`StartTile`)
    tiles.placeOnRandomTile(Flag, assets.tile`myTile44`)
    Flag.x += -9
    Flag.y += 1
    for (let MegaMarioMushroom of tiles.getTilesByType(assets.tile`GoombaSpawner`)) {
        myEnemy = sprites.create(assets.image`myImages.image3`, SpriteKind.Goomba)
        tiles.placeOnTile(myEnemy, MegaMarioMushroom)
        myEnemy.vx = 30
        myEnemy.vy = 100
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`GoombaWalking`,
        220,
        characterAnimations.rule(Predicate.Moving)
        )
    }
    for (let value of tiles.getTilesByType(assets.tile`PlantSpawner`)) {
        PiranhaPlant = sprites.create(assets.image`PiranhaPlant`, SpriteKind.Carnivore)
        tiles.placeOnTile(PiranhaPlant, value)
        PiranhaPlant.y += -7
        PiranhaPlant.x += -8
        characterAnimations.loopFrames(
        PiranhaPlant,
        assets.animation`PiranhaPlantBiting`,
        50,
        characterAnimations.rule(Predicate.NotMoving)
        )
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if ((Super_Mario.tileKindAt(TileDirection.Right, assets.tile`myTile51`) || Super_Mario.tileKindAt(TileDirection.Right, assets.tile`myTile52`)) && Super_Mario.vy == 0) {
        if (currentLevel == 2) {
            if (BigMario == 1) {
                currentLevel = 0
                controller.moveSprite(Super_Mario, 0, 0)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`BigMarioGoingInAPipe`,
                50,
                false
                )
                pause(1100)
                startNextLevel()
                ScreenUnderGroundMode = 0
                tiles.placeOnRandomTile(Super_Mario, assets.tile`myTile64`)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`BigMarioComingUpPipe`,
                AnimationSpeed,
                false
                )
                pause(800)
                controller.moveSprite(Super_Mario, 100, 0)
                Super_Mario.setImage(assets.image`MegaMario`)
            } else if (FireMario == 1) {
                currentLevel = 0
                controller.moveSprite(Super_Mario, 0, 0)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`MarioGoingInAPipe`,
                50,
                false
                )
                pause(1100)
                startNextLevel()
                ScreenUnderGroundMode = 0
                tiles.placeOnRandomTile(Super_Mario, assets.tile`myTile64`)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`MarioComingUpPipe`,
                50,
                false
                )
                pause(800)
                controller.moveSprite(Super_Mario, 100, 0)
                Super_Mario.setImage(assets.image`FireMario`)
            } else {
                currentLevel = 0
                controller.moveSprite(Super_Mario, 0, 0)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`MarioGoingInAPipe`,
                50,
                false
                )
                pause(1100)
                startNextLevel()
                ScreenUnderGroundMode = 0
                tiles.placeOnRandomTile(Super_Mario, assets.tile`myTile64`)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`MarioComingUpPipe`,
                50,
                false
                )
                pause(800)
                controller.moveSprite(Super_Mario, 100, 0)
                Super_Mario.setImage(assets.image`Mario`)
            }
        }
    } else {
        characterAnimations.setCharacterState(Super_Mario, characterAnimations.rule(Predicate.MovingRight))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Carnivore, function (sprite, otherSprite) {
    MarioDead = 1
    info.changeLifeBy(-1)
    if (MarioDead == 1) {
        for (let value of sprites.allOfKind(SpriteKind.Goomba)) {
            value.destroy()
        }
        for (let value of sprites.allOfKind(SpriteKind.Carnivore)) {
            value.destroy()
        }
        Super_Mario.setImage(assets.image`myImages.image2`)
        Super_Mario.setFlag(SpriteFlag.GhostThroughSprites, true)
        Super_Mario.setFlag(SpriteFlag.GhostThroughWalls, true)
        Super_Mario.vy = -200
        controller.moveSprite(Super_Mario, 0, 0)
        animation.stopAnimation(animation.AnimationTypes.All, Super_Mario)
        for (let value of tiles.getTilesByType(assets.tile`PlantSpawner`)) {
            PiranhaPlant = sprites.create(assets.image`PiranhaPlant`, SpriteKind.Carnivore)
            tiles.placeOnTile(PiranhaPlant, value)
            PiranhaPlant.y += -7
            PiranhaPlant.x += -8
            characterAnimations.loopFrames(
            PiranhaPlant,
            assets.animation`PiranhaPlantBiting`,
            50,
            characterAnimations.rule(Predicate.NotMoving)
            )
        }
        for (let MegaMarioMushroom of tiles.getTilesByType(assets.tile`GoombaSpawner`)) {
            myEnemy = sprites.create(assets.image`myImages.image3`, SpriteKind.Goomba)
            tiles.placeOnTile(myEnemy, MegaMarioMushroom)
            myEnemy.vx = 25
            myEnemy.vy = 100
            characterAnimations.loopFrames(
            myEnemy,
            assets.animation`GoombaWalking`,
            220,
            characterAnimations.rule(Predicate.Moving)
            )
        }
        pause(2000)
    }
    pause(1500)
    MarioDead = 0
    tiles.placeOnRandomTile(Super_Mario, assets.tile`StartTile`)
    Super_Mario.setFlag(SpriteFlag.GhostThroughSprites, false)
    Super_Mario.setFlag(SpriteFlag.GhostThroughWalls, false)
    Super_Mario.setImage(assets.image`Mario`)
    controller.moveSprite(Super_Mario, 100, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExtraLifeMushroom, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
tileUtil.onMapLoaded(function (tilemap2) {
    tileUtil.coverAllTiles(assets.tile`StartTile`, assets.tile`myTile6`)
    tileUtil.coverAllTiles(assets.tile`GoombaSpawner`, assets.tile`myTile33`)
    tileUtil.coverAllTiles(assets.tile`myTile64`, assets.tile`myTile33`)
    tileUtil.coverAllTiles(assets.tile`PlantSpawner`, assets.tile`myTile33`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Super_Mario.tileKindAt(TileDirection.Bottom, assets.tile`myTile61`) || Super_Mario.tileKindAt(TileDirection.Bottom, assets.tile`myTile62`)) {
        if (currentLevel == 1) {
            if (BigMario == 1) {
                controller.moveSprite(Super_Mario, 0, 0)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`BigMarioGoingDownAPipe`,
                AnimationSpeed,
                false
                )
                pause(1100)
                startNextLevel()
                for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
                    value.destroy()
                }
                currentLevel = 2
                tiles.placeOnRandomTile(Super_Mario, assets.tile`myTile37`)
                controller.moveSprite(Super_Mario, 100, 0)
                Super_Mario.setImage(assets.image`MegaMario`)
                ScreenUnderGroundMode = 1
            } else {
                controller.moveSprite(Super_Mario, 0, 0)
                animation.runImageAnimation(
                Super_Mario,
                assets.animation`MarioGoingDownAPipe`,
                50,
                false
                )
                pause(1100)
                startNextLevel()
                for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
                    value.destroy()
                }
                currentLevel = 2
                tiles.placeOnRandomTile(Super_Mario, assets.tile`myTile37`)
                controller.moveSprite(Super_Mario, 100, 0)
                Super_Mario.setImage(assets.image`Mario`)
                ScreenUnderGroundMode = 1
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    Super_Mario.setImage(assets.image`myImages.image2`)
    Super_Mario.setFlag(SpriteFlag.GhostThroughSprites, true)
    Super_Mario.setFlag(SpriteFlag.GhostThroughTiles, true)
    Super_Mario.setFlag(SpriteFlag.GhostThroughWalls, true)
    Super_Mario.vy = -199
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    FireMario = 1
    otherSprite.destroy()
    info.setLife(3)
})
info.onLifeZero(function () {
    pause(2000)
    GAME_OVER = 1
})
spriteutils.createRenderable(100, function (screen2) {
    if (GAME_OVER == 1) {
        screen2.fill(15)
        spriteutils.drawTransparentImage(assets.image`Game over`, screen2, 42, 52)
        pause(3000)
        info.setLife(3)
        info.setScore(0)
        GAME_OVER = 0
    } else if (ScreenUnderGroundMode == 1) {
        screen2.replace(14, 6)
    }
})
function Mushroom1Movement (_1UPMushroom: Sprite) {
    _1UPMushroom.ay = 100
    _1UPMushroom.vx = 50
    if (randint(0, 1) == 0) {
        _1UPMushroom.vx = -50
    }
}
events.spriteEvent(SpriteKind.Goomba, SpriteKind.Goomba, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    sprite.vx = 0 - sprite.vx
    otherSprite.vx = 0 - otherSprite.vx
})
let FireFlower: Sprite = null
let _1UPMushroom: Sprite = null
let GAME_OVER = 0
let ScreenUnderGroundMode = 0
let FireMario = 0
let PiranhaPlant: Sprite = null
let myEnemy: Sprite = null
let MarioDead = 0
let MegaMarioMushroom: Sprite = null
let BigMario = 0
let PlayerRow = 0
let PlayerCollumm = 0
let Super_Mario: Sprite = null
let Flag: Sprite = null
let AnimationSpeed = 0
let currentLevel = 0
color.setColor(2, color.rgb(0, 39, 0))
color.setColor(10, color.rgb(0, 162, 0))
color.setColor(8, color.rgb(0, 199, 0))
color.setColor(14, color.rgb(195, 82, 27))
color.setColor(2, color.rgb(202, 0, 0))
color.setColor(5, color.rgb(255, 185, 68))
color.setColor(3, color.rgb(183, 130, 66))
color.setColor(4, color.rgb(255, 167, 66))
color.setColor(9, color.rgb(60, 156, 255))
currentLevel = 0
AnimationSpeed = 25
Flag = sprites.create(assets.image`Flag`, SpriteKind.WinerFlag)
Super_Mario = sprites.create(assets.image`Mario`, SpriteKind.Player)
Super_Mario.ay = 500
controller.moveSprite(Super_Mario, 100, 0)
scene.cameraFollowSprite(Super_Mario)
info.setLife(3)
info.setScore(0)
startNextLevel()
game.onUpdate(function () {
    if (Super_Mario.vy > 0) {
        if (BigMario == 1) {
            Super_Mario.setImage(assets.image`MegaMario`)
        } else if (FireMario == 1) {
            Super_Mario.setImage(assets.image`FireMario`)
        } else if (FireMario == 1 && BigMario == 1) {
            Super_Mario.setImage(assets.image`MegaFireMario`)
        } else {
            Super_Mario.setImage(assets.image`Mario`)
        }
    } else if (Super_Mario.vy < 0) {
        if (BigMario == 1) {
            Super_Mario.setImage(assets.image`BigMarioJumping`)
        } else if (FireMario == 1) {
            Super_Mario.setImage(assets.image`FireMarioJumping`)
        } else if (BigMario == 1 && FireMario == 1) {
            Super_Mario.setImage(assets.image`BigFireMarioJumping`)
        } else {
            Super_Mario.setImage(assets.image`MarioJumping`)
        }
    } else if (Super_Mario.vx != 0) {
        if (BigMario == 1) {
            Super_Mario.setImage(assets.image`MegaMario`)
        } else if (FireMario == 1) {
            Super_Mario.setImage(assets.image`FireMario`)
        } else if (BigMario == 1 && FireMario == 1) {
            Super_Mario.setImage(assets.image`MegaFireMario`)
        } else {
            Super_Mario.setImage(assets.image`Mario`)
        }
    }
    if (Super_Mario.vx < 0) {
        Super_Mario.image.flipX()
    }
})
forever(function () {
    if (Super_Mario.tileKindAt(TileDirection.Top, assets.tile`myTile33`) && Super_Mario.vy < 0) {
        tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), assets.tile`myTile46`)
        tiles.setWallAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), true)
    }
})
forever(function () {
    PlayerRow = Super_Mario.y / 16
    PlayerCollumm = Super_Mario.x / 16
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        if (Super_Mario.tileKindAt(TileDirection.Top, assets.tile`myTile1`) && Super_Mario.vy < 0) {
            if (Math.percentChance(30)) {
                tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), assets.tile`myTile46`)
                MegaMarioMushroom = sprites.create(assets.image`GrowingMushroom`, SpriteKind.GrowingMushrooom)
                tiles.placeOnTile(MegaMarioMushroom, tiles.getTileLocation(PlayerCollumm, PlayerRow - 2))
                animation.runImageAnimation(
                MegaMarioMushroom,
                assets.animation`MagicMushroomSpawning`,
                50,
                false
                )
                pause(1100)
                MegaMarioMushroom.lifespan = 10000
                Mushroom1Movement(MegaMarioMushroom)
            } else if (Math.percentChance(10)) {
                tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), assets.tile`myTile46`)
                _1UPMushroom = sprites.create(assets.image`1UpMushroom`, SpriteKind.ExtraLifeMushroom)
                tiles.placeOnTile(_1UPMushroom, tiles.getTileLocation(PlayerCollumm, PlayerRow - 2))
                animation.runImageAnimation(
                _1UPMushroom,
                assets.animation`1UPSpawning`,
                50,
                false
                )
                pause(1100)
                _1UPMushroom.lifespan = 10000
                Mushroom1Movement(_1UPMushroom)
            } else if (Math.percentChance(20)) {
                tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), assets.tile`myTile46`)
                FireFlower = sprites.create(assets.image`FireFlower`, SpriteKind.Flower)
                tiles.placeOnTile(FireFlower, tiles.getTileLocation(PlayerCollumm, PlayerRow - 2))
                animation.runImageAnimation(
                FireFlower,
                assets.animation`FlowerSpawning`,
                50,
                false
                )
                pause(1100)
                FireFlower.lifespan = 10000
            } else {
                tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 2), assets.tile`myTile45`)
            }
            tiles.setTileAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), assets.tile`myTile46`)
            tiles.setWallAt(tiles.getTileLocation(PlayerCollumm, PlayerRow - 1), true)
            pause(0)
            Super_Mario.vy = 0
        }
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.GrowingMushrooom)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 50
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -50
        }
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Goomba)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.ExtraLifeMushroom)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 50
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -50
        }
    }
})
forever(function () {
    if (MarioDead == 0) {
        music.playMelody(music.convertRTTTLToMelody("smb:d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p,8g,8p,8c6,16p,8g,16p,8e,16p,8a,8b,16a#,8a,16g.,16e6,16g6,8a6,16f6,8g6,8e6,16c6,16d6,8b,16p,8c6,16p,8g,16p,8e,16p,8a,8b,16a#,8a,16g.,16e6,16g6,8a6,16f6,8g6,8e6,16c6,16d6,8b,8p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16g#,16a,16c6,16p,16a,16c6,16d6,8p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16c7,16p,16c7,16c7,p,16g6,16f#6,16f6,16d#6,16p,16e6,16p,16g#,16a,16c6,16p,16a,16c6,16d6,8p,16d#6,8p,16d6,8p,16c6"), 151)
    } else if (MarioDead == 1) {
        music.stopAllSounds()
        music.playMelody(music.convertRTTTLToMelody("smbdeath:d=4,o=5,b=90:32c6,32c6,32c6,8p,16b,16f6,16p,16f6,16f.6,16e.6,16d6,16c6,16p,16e,16p,16c"), 240)
    } else if (ScreenUnderGroundMode == 1) {
    	
    }
})
