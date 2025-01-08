var fruits =  ["apple", "orange","cherries"];

export function addItem(newItem) {
    fruits.push(newItem);
}

export function differentFruits() {
    console.log(fruits.length); 
  }