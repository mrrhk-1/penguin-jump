const fs = require("fs");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log("✅ PASS:", message);
    passed++;
  } else {
    console.error("❌ FAIL:", message);
    failed++;
  }
}

assert(fs.existsSync("index.html"), "index.html exists");
assert(fs.existsSync("style.css"), "style.css exists");
assert(fs.existsSync("script.js"), "script.js exists");

const html = fs.readFileSync("index.html", "utf8");
assert(html.includes("Penguin Jump"), "Title 'Penguin Jump' present");
assert(html.includes('id="penguin"'), "Penguin element present");
assert(html.includes('id="obstacle"'), "Obstacle element present");
assert(html.includes('id="score"'), "Score element present");

const js = fs.readFileSync("script.js", "utf8");
assert(js.includes("function jump"), "jump() function exists");
assert(js.includes("function startGame"), "startGame() function exists");
assert(js.includes("function endGame"), "endGame() function exists");
assert(js.includes("requestAnimationFrame"), "Uses requestAnimationFrame");

const css = fs.readFileSync("style.css", "utf8");
assert(css.includes(".penguin"), ".penguin style exists");
assert(css.includes(".obstacle"), ".obstacle style exists");

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);