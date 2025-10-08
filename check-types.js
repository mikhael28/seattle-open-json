import { scsData } from './dist/index.js';

const entities = scsData.getAllEntities();
const types = {};
const withCoords = {};

entities.forEach(e => {
  types[e.type] = (types[e.type] || 0) + 1;

  if (e.location && typeof e.location !== 'string' && e.location.coordinates) {
    withCoords[e.type] = (withCoords[e.type] || 0) + 1;
  }
});

console.log('All entity types:', JSON.stringify(types, null, 2));
console.log('\nTypes with coordinates:', JSON.stringify(withCoords, null, 2));
console.log('\nTotal entities:', entities.length);
console.log('Total with coordinates:', Object.values(withCoords).reduce((a, b) => a + b, 0));
