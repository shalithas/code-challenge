/**
 * Return new world data set with given rules
 * 
 * @param {Array[]} world 
 * @returns Array[]
 */
export const next = (world) => {

  const newWorld = world.map((row, y) => {
    return [...row.map((col, x) => {

      //finding neighbours
      let numberOfNeighbours = 0;
      for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
          if(i === 0 && j === 0){
            continue;
          }

          let neighbourX = y + j;
          let neighbourY = x + i;
          if(neighbourX > -1 && neighbourY > -1 && neighbourX < world.length && neighbourY < row.length ){
            const neighbour = world[neighbourX][neighbourY];
            numberOfNeighbours += neighbour;
          }
        }
      }

      //rules
      if(col === 1){
        if(numberOfNeighbours < 2){
          col = 0;
        } else if (numberOfNeighbours > 3){
          col = 0;
        }
      } else if(numberOfNeighbours === 3) {
        col = 1;
      }

      return col;
    })];
  });

  return newWorld;
};

/**
 * Convert string pattern into Array of Array
 * 
 * @param {string} pattern 
 * @returns Array[]
 */
export const parse = (pattern) => {
  let grid = [];
  try {
    const rows = pattern.split('\n');
    grid = rows.map(row => {
      const cols = [];
      for (var i = 0; i < row.length; i++) {
        const char = row.charAt(i);
        cols.push(char === '.' ? 0 : 1);
      }

      return cols;
    });
  } catch (error) {
    console.error(error);
  }

  return grid;
};
