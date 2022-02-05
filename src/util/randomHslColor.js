import randomInRange from './randomInRange'

const randomHslColor = () => `hsl(${randomInRange(15, 335) | 0}, 100%, 50%)`;

export default randomHslColor