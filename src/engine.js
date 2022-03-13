// (world: boolean[][]) => boolean[][]
export const next = (world) => {
  return world;
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
