// Utility function to generate a random integer between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // Utility function to shuffle the array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Generate a new array of bars
  function generateArray(size) {
    const array = [];
    for (let i = 1; i <= size; i++) {
      array.push(i);
    }
    return shuffleArray(array);
  }
  
  // Render the bars on the screen
  function renderBars(array) {
    const barsContainer = document.getElementById('bars-container');
    barsContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${array[i] * 4}px`;
      barsContainer.appendChild(bar);
    }
  }
  
  // Bubble Sort
  async function bubbleSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          bars[j].style.height = `${array[j] * 4}px`;
          bars[j + 1].style.height = `${array[j + 1] * 4}px`;
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }
  }
  
  // Selection Sort
  async function selectionSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i] * 4}px`;
      bars[minIdx].style.height = `${array[minIdx] * 4}px`;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
  
  // Insertion Sort
  async function insertionSort(array, speed) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1] * 4}px`;
        j--;
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      array[j + 1] = key;
      bars[j + 1].style.height = `${key * 4}px`;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
  
  // Merge Sort
  async function mergeSort(array, speed) {
    if (array.length <= 1) {
      return array;
    }
  
    const mid = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, mid), speed);
    const right = await mergeSort(array.slice(mid), speed);
    const sortedArray = await merge(left, right, speed);
  
    return sortedArray;
  }
  
  async function merge(left, right, speed) {
    const mergedArray = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        mergedArray.push(left[i]);
        i++;
      } else {
        mergedArray.push(right[j]);
        j++;
      }
    }
  
    while (i < left.length) {
      mergedArray.push(left[i]);
      i++;
    }
  
    while (j < right.length) {
      mergedArray.push(right[j]);
      j++;
    }
  
    const bars = document.getElementsByClassName('bar');
    for (let k = 0; k < mergedArray.length; k++) {
      bars[k].style.height = `${mergedArray[k] * 4}px`;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  
    return mergedArray;
  }
  
  // Quick Sort
  async function quickSort(array, low, high, speed) {
    if (low < high) {
      const pi = await partition(array, low, high, speed);
      await quickSort(array, low, pi - 1, speed);
      await quickSort(array, pi + 1, high, speed);
    }
  }
  
  async function partition(array, low, high, speed) {
    const pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j <= high - 1; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        const bars = document.getElementsByClassName('bar');
        bars[i].style.height = `${array[i] * 4}px`;
        bars[j].style.height = `${array[j] * 4}px`;
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }
  
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    const bars = document.getElementsByClassName('bar');
    bars[i + 1].style.height = `${array[i + 1] * 4}px`;
    bars[high].style.height = `${array[high] * 4}px`;
    await new Promise(resolve => setTimeout(resolve, speed));
  
    return i + 1;
  }
  
  // Event listeners
  document.getElementById('generate').addEventListener('click', () => {
    const size = 50; // Adjust the size of the array here
    const array = generateArray(size);
    renderBars(array);
  });
  
  document.getElementById('bubble-sort').addEventListener('click', async () => {
    const array = Array.from(document.getElementsByClassName('bar')).map(bar =>
      parseInt(bar.style.height) / 4
    );
    const speed = parseInt(document.getElementById('speed').value);
    await bubbleSort(array, speed);
  });
  
  document.getElementById('selection-sort').addEventListener('click', async () => {
    const array = Array.from(document.getElementsByClassName('bar')).map(bar =>
      parseInt(bar.style.height) / 4
    );
    const speed = parseInt(document.getElementById('speed').value);
    await selectionSort(array, speed);
  });
  
  document.getElementById('insertion-sort').addEventListener('click', async () => {
    const array = Array.from(document.getElementsByClassName('bar')).map(bar =>
      parseInt(bar.style.height) / 4
    );
    const speed = parseInt(document.getElementById('speed').value);
    await insertionSort(array, speed);
  });
  
  document.getElementById('merge-sort').addEventListener('click', async () => {
    const array = Array.from(document.getElementsByClassName('bar')).map(bar =>
      parseInt(bar.style.height) / 4
    );
    const speed = parseInt(document.getElementById('speed').value);
    await mergeSort(array, speed);
  });
  
  document.getElementById('quick-sort').addEventListener('click', async () => {
    const array = Array.from(document.getElementsByClassName('bar')).map(bar =>
      parseInt(bar.style.height) / 4
    );
    const speed = parseInt(document.getElementById('speed').value);
    await quickSort(array, 0, array.length - 1, speed);
  });