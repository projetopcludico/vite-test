export const defaultAplication = {
  themes: {
    forms: {
      required: 5,
      objects: [
          { id: 1, name: 'circle', icon: 'mdi mdi-circle-outline' },
          { id: 2, name: 'rectangle', icon: 'mdi mdi-rectangle-outline' },
          { id: 3, name: 'pentagon', icon: 'mdi mdi-pentagon-outline' },
          { id: 4, name: 'triangle', icon: 'mdi mdi-triangle-outline' },
          { id: 5, name: 'square', icon: 'mdi mdi-square-outline' },
      ],
      difficulties: {
        easy: {
            id: 1,
            title: 'Fácil',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberForms: 2, 
                size: 8, 
                discover: 1, 
                timeLimit: 90, 
            }
        },
        medium: {
            id: 2,
            title: 'Médio',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberForms: 3, 
                size: 12, 
                discover: 2, 
                timeLimit: 90, 
            }
        },
        hard: {
            id: 3,
            title: 'Difícil',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberForms: 4, 
                size: 16, 
                discover: 3, 
                timeLimit: 90, 
            }
        },
      },
    },
    sounds: {
      required: 5,
      objects: [
        {id: 1, path: '/sounds/grass.mp3', name: 'som de grama', color: 'blue'},
        {id: 2, path: '/sounds/metal.mp3', name: 'som de metal', color: 'green'},
        {id: 3, path: '/sounds/plastic.mp3', name: 'som de plástico', color: 'red'},
        {id: 4, path: '/sounds/water.mp3', name: 'som de água', color: 'gray'},
        {id: 5, path: '/sounds/wind.mp3', name: 'som de vento', color: 'brown'},
        {id: 6, path: '/sounds/wood.mp3', name: 'som de madeira', color: 'yellow'},
      ],
      difficulties: {
        easy: {
            id: 1,
            title: 'Fácil',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberSounds: 3, 
                size: 9, 
                discover: 1, 
                timeLimit: 90, 
            }
        },
        medium: {
            id: 2,
            title: 'Médio',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberSounds: 4, 
                size: 12, 
                discover: 2, 
                timeLimit: 90, 
            }
        },
        hard: {
            id: 3,
            title: 'Difícil',
            gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            params: {
                numberSounds: 5, 
                size: 15, 
                discover: 3, 
                timeLimit: 150, 
            }
        }
      }
    },
    numbers: {
      required: 5,
      difficulties: {
        easy: {
          id: 1,
          title: 'Fácil',
          gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
          params: {
            numberOperations: 2, 
            size: 7, 
            discover: 1, 
            timeLimit: 90,
          }
        },
        medium: {
          id: 2,
          title: 'Médio',
          gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
          params: {
            numberOperations: 3, 
            size: 10, 
            discover: 2, 
            timeLimit: 180, 
          }
        },
        hard: {
          id: 3,
          title: 'Difícil',
          gameText: 'Texto do jogo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
          params: {
            numberOperations: 4, 
            size: 17, 
            discover: 3, 
            timeLimit: 180,
          }
        },
      }
    }
  },
};
