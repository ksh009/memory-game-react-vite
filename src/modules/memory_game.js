class MemoryGame {
  constructor() {
    this.board = [];
    this.tileImageTypes = [
      "cat-solid.svg",
      "dog-solid.svg",
      "dragon-solid.svg",
      "fish-solid.svg",
      "hippo-solid.svg",
      "otter-solid.svg",
    ];
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  setBoard() {
    const items = this.tileImageTypes;
    const pairs = [...items, ...items];
    this.shuffleArray(pairs);
    this.board = pairs;
  }
}

export { MemoryGame };
