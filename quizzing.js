

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function checkSorted(arr){
  for(var i=0; i<arr.length-1; i++){
    if(arr[i]>arr[i+1]){
      return false;
    }
  }
  return true;
}

function popFront(arr){
  result = arr[0];
  for(var i=0; i<arr.length-1; i++){
    arr[i] = arr[i+1];
  }
  arr.pop();
  return result;
}

function replicateSlice(arr, start, end){
  var result = [];
  for(var i=start; i < end; i++){
    result.push(arr[i]);
  }
  return result;
}
//selection sort is finding the min and constantly moving it over to the leftmost position of the unsorted part of the array

function selectionSort(arr){
  for(var i=0; i<arr.length-1; i++){
    var min = i;
    for(var j=i+1; j<arr.length; j++){
      if(arr[j] < arr[min]){
        min = j;
      }
    }
    if(min != i){
      swap(arr, i, min)
    }
  }
  return arr;
}
// insertion sort is choosing an element in the array and sliding it to the left as far as it can go, proceeding from left to right
function insertionSort(arr){
  for(var i=1; i<arr.length; i++){
    var inserting = arr[i];
    var j=i-1
    while(arr[j] > inserting){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = inserting;
  }
  return arr;
}



// bubble sort we compare pairs of elements and swap if needed. Boundary set at the far right;
function bubbleSort(arr){
  for(var i=arr.length-1; i>0; i--){
    var swapped = false;
    for(var j=0; j<i; j++){
      if(arr[j]>arr[j+1]){
        swapped = true;
        swap(arr, j, j+1);
      }
    }
    if(swapped == false){
      console.log("shortcut!", i)
      return arr;
    }
  }
  return arr;
}

function mergeSort(arr){
  if(arr.length < 2){
    return arr;
  }
  var middle = Math.floor(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
  var sorted = [];
  while(left.length > 0 && right.length > 0){
    if(left[0] <= right[0]){
      sorted.push(left.shift());
    }
    else {
      sorted.push(right.shift());
    }
  }
  while(left.length > 0){
    sorted.push(left.shift());
  }
  while(right.length > 0){
    sorted.push(right.shift());
  }
  return sorted;
}


function quickSort(arr, start, end){
  if(start === undefined){
    start = 0;
    end = arr.length - 1;
  }
  if(start >= end){
    return arr;
  }
  var newpivot = partition(arr, start, end);
  quickSort(arr, start, newpivot-1);
  quickSort(arr, newpivot+1, end);
  return arr;
}

function partition(arr, start, end){
  var pivot = Math.floor((Math.random()*(end-start)) + start);
  i=start-1;
  j=start;
  while(j<=end){
    if(arr[pivot]>arr[j]){
      i++;
      swap(arr, i, j);
    }
    if(pivot == i){
      pivot = j;
    }
    j++;
  }
  i++;
  swap(arr, i, pivot);
  pivot = i;
  return pivot;
}


var unsorted = [];

for(var i=0; i<=500; i++){
	unsorted.push(Math.ceil(Math.random()*1000 + 300));
}
// console.log(unsorted);
console.time("runTime");
sorted = quickSort(unsorted);
console.timeEnd("runTime");
// console.log(sorted, sorted.length);
console.log(checkSorted(sorted));

//
// var testarray = [[2,3,4,], [], [8], [99,33], []];
// var newarray = []
// for(var i=0; i<testarray.length; i++){
//   newarray = newarray.concat(testarray[i]);
// }
// console.log("new array", newarray)
