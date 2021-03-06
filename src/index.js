import { parse, next } from './engine.js';

const scale = 10;
const patternUrl = '/src/lexicon.json';


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let patterns = [];
let selectedPattern = 'AK94 gun';
let world = [];

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
        console.log(`Unable to locate patterns. ${error.message}`);
        return [];
    }
};

/**
 * Initialise the app
 */
const init = async () => {
    patterns = await getPatterns(patternUrl);
    patterns = patterns.map(item => {
        item.pattern = parse(item.pattern);

        return item;
    });
}

init();

/**
 * 
 * @param {Array[]} world 
 */
const render = (world) => {
    canvas.height = world.length * scale;
    canvas.width = world[0].length * scale;
    
    world.forEach((row, y) =>
        row.forEach(
            (alive, x) => {
                ctx.fillStyle = "#202020";
                ctx.beginPath();
                ctx.rect(x * scale, y * scale, scale - 1, scale - 1);
                ctx.fillStyle = alive ? "green" : "black";
                ctx.fill();
            }
        )
    );
};

/**
 * Filter pattern with given name
 * @param {string} patternName 
 * @returns Object
 */
const getSelectedPattern = (patternName) => patterns.find(item => item.name === patternName);

// Pattern selecter
const patternSelecter = document.querySelector('#patter-control');
const descriptionElement = document.querySelector('#description');
const startButton = document.querySelector('#start');

startButton.onclick = () => {
    selectedPattern = patternSelecter.value;
    const selPattern = getSelectedPattern(selectedPattern);
    descriptionElement.textContent = selPattern.description;
    world = selPattern.pattern;
    
    requestAnimationFrame(update);
}

const update = () => {
    world = next(world);
    render(world);
    requestAnimationFrame(update);
}