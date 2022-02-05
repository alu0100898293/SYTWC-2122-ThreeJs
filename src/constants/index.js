import * as THREE from 'three'

//Identifiers
export const CUBE_ID = 1
export const SPHERE_ID = 2
export const TETRAHEDRON_ID = 3
export const OCTAHEDRON_ID = 4
export const ICOSAHEDRON_ID = 5
export const TORUS_ID = 6

//Parameters per difficulty
export const EASYSEQUENCELENGTH = 4
export const EASYSEQUENCELIGHT = 3
export const EASYSEQUENCERESOLVE = 3
export const MEDIUMSEQUENCELENGTH = 5
export const MEDIUMSEQUENCELIGHT = 2
export const MEDIUMSEQUENCERESOLVE = 2
export const HARDSEQUENCELENGTH= 6
export const HARDSEQUENCELIGHT = 1
export const HARDSEQUENCERESOLVE = 1.5



//Coordinates
export const EASYCOORDINATES = [
  [0, 2.5 , 0],
  [0, -2.5 , 0],
  [2.5, 0 , 0],
  [-2.5, 0 , 0]
]
export const MEDIUMCOORDINATES = [
  [0, 2.5 , 0],
  [2.5, 0 , 0],
  [-2.5, 0 , 0],
  [1.5, -2.5 , 0],
  [-1.5, -2.5 , 0]
]
export const HARDCOORDINATES = [
  [1.5, 2.5 , 0],
  [-1.5, 2.5 , 0],
  [3.5, 0 , 0],
  [-3.5, 0 , 0],
  [1.5, -2.5 , 0],
  [-1.5, -2.5 , 0]
]

export const COLORS = [
  {
    name: 'highlight',
    hex: '#ff0000',
    three: new THREE.Color(0xff0000)
  },
  {
    name: 'succes',
    hex: '#00ff00',
    three: new THREE.Color(0x00ff00)
  },
  {
    name: 'pink',
    hex: '#ff69b4',
    three: new THREE.Color(0xff2190)
  },
  {
    name: 'red',
    hex: '#ff2919',
    three: new THREE.Color(0xff2919) //  0xff3021 #ff1e0d
  }
]
