import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }, // Sem gravidade para um jogo de RPG
            debug: false // Mude para true se precisar de debug para colisões
        }
    },
    pixelArt: true, // Se estiver usando pixel art
    antialias: false, // Para manter a nitidez dos gráficos de pixel art
    fps: {
        target: 60, // Taxa de quadros por segundo
        forceSetTimeOut: true
    },
    // Adicione a configuração para desabilitar a pausa automática
    // autoFocus: false,
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
    plugins: {
        global: [
            // Adicione plugins globais aqui, se necessário
        ],
        scene: [
            // Adicione plugins específicos de cena aqui, se necessário
        ]
    }
};

export default new Game(config);