import { parse } from './engine.js';

const scale = 4;
const worldWidth = 480;
const worldHeight = 240;
const patternUrl = '/src/lexicon.json';


const canvas = document.querySelector("canvas");
canvas.width = worldWidth;
canvas.height = worldHeight;
const ctx = canvas.getContext("2d");

/**
 * Fetch patterns from external JSON file
 * 
 * @param {string} url 
 * @returns {Array}
 */
const getPatterns = async (url) => {
    try {
        const data = await fetch(url);
        const jsonData = await data.json();
        
        return jsonData;
    } catch (error) {
        console.log(`Unable to locate patternns. ${error.message}`);
        return [];
    }
};

/**
 * Initialise the app
 */
const init = async () => {
    const patterns = await getPatterns(patternUrl);
    console.dir(patterns);

    const parsedPattern = parse(patterns[2].pattern);
    console.log(parsedPattern);


    render(parsedPattern);
}

init();

/**
 * 
 * @param {Array[]} world 
 */
const render = (world) => {
    console.dir(world);
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, worldWidth * scale, worldHeight * scale);
    ctx.fillStyle = "green";
    world.forEach((row, y) =>
        row.forEach(
            (alive, x) =>
            alive && ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1)
        )
    );
};