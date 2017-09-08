# Q1 Project Proposal

* Fork this repo and update this README file with your proposal.
* Make sure to preview your proposal in a markdown preview and [use valid markdown syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
  * Unformatted/unreadable proposals will be rejected

## Project Description
Katamari Damaci Clone - Pokemari Cannabalasi

## What problem does your project solve?
It solves the problem of what happens when you consume too many miniature versions of yourself.

## Who has this problem?
All the bored people!

## How will your project solve this problem?
It will be either mildly or wildly entertaining.

## What inputs does it need?
Clicks and arrow keys. Click to begin then use arrow keys to move PC toward smaller NPCs. When PC touches smaller NPC the NPC is consumed. Each consumed NPC increases the size of the PC until the meter at the top is full at which point the level (game) is over. If the PC touches an NPC that's larger than the PC the PC loses 1 hitpoint. Loss of all three hit points results in game over.

## What outputs does it produce?
Active hit point pool, consumation counter, general entertainment.

## What web API(s) will it use?
Pokemon for sprites.

## What technologies do you plan to use?
HTML, CSS, Javascript, Materialize

## Feature list
- Move PC in 8 directions
- NPC semi-random movement
- Grow PC when contacting smaller NPC
- Shrink PC and HP pool when contacting larger NPC
- Active hit point pool
- Victory for growing a certain amount
- Defeat for taking too much damage
- Character select


## Alternate Project Description
Duck Hunt - PokePEW

## What problem does your project solve?
It solves the problem of how best to destroy tasty, flying Pokemon

## Who has this problem?
All the bored people!

## How will your project solve this problem?
It will be either mildly or wildly entertaining.

## What inputs does it need?
Clicks. Player clicks on screen sending projectile. If projectile contacts NPC it is damaged or destroyed (depending on NPC hit point pool). Many NPCs could occupy the screen simultaneously. NPCs will move at varying speeds across the screen (from left to right). Destroyed NPCs add +1 to kill counter. If kill counter reaches level maximum PC advances to next stage. If PC runs out of ammo the game is over. After succeeding at several levels (replace sprites and increase HP pools each wave) the Boss will come out. Destroying Boss results in victory.

## What outputs does it produce?
Score counter, ammo counter, general entertainment.

## What web API(s) will it use?
Pokemon for sprites.

## What technologies do you plan to use?
HTML, CSS, Javascript, Materialize

## Feature list
- Projectile shooter that follows cursor
- Projectiles that damage/destroy moving NPC sprites
- Semi-random flight patterns for NPC
- Hitboxes for critical damage and glancing blows
- Score counter
- Ammo counter
- Streak powerup
- Multiple levels featuring more difficult enemies
- Boss NPC
