document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("what' your name");
    if (yourName == "" || yourName == null) {
        document.getElementById('namePlace').innerHTML = 'Unknown';
    }
    else {
        document.getElementById('namePlace').innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
// add order css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipBlock(block);
    })
});
// flip block function 
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippBlock => flippBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
// check matched blocks 
function checkMatchedBlocks(firstBlock, secondBlock) {
    let tries = document.querySelector(".tries .triesNumber");
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    }
    else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)
    }
}
function stopClicking() {
    // Add class no clicking on main container 
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
        blocks.forEach(e => e.classList.remove('is-flipped'))
    }, duration)
}
// shuffle function 
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}