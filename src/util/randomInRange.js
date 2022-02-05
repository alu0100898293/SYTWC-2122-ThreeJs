//const randomInRange = (from, to) => Math.floor(Math.random() * (to - from + 1)) - to
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min )) + min

export default randomInRange