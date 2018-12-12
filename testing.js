
// function findMinIndex(arr){
//   var min = arr[0];
//   var minIndex = 0;
//   for(var i=1; i<arr.length; i++){
//     if(arr[i]<min){
//       min = arr[i];
//       minIndex = i;
//     }
//   }
//   return minIndex;
// }

// function swap(arr, i, j){
// 	var temp = arr[i];
// 	arr[i] = arr[j]
// 	arr[j] = temp;
// }

// function selectionSort(arr){
//   for(var i=0; i<arr.length-1; i++){
//     var minindex = findMinIndex(arr.slice(i)) + i;
//     if(minindex !== i){
//       var temp = arr[i];
//       arr[i] = arr[minindex];
//       arr[minindex] = temp;
//     }
//   }
//   return arr;
// }

// function quickSort(arr, start=0, end=arr.length-1){

// 	if(start >= end){
// 		return arr;
// 	}
// 	var newpivot = partition(arr, start, end);
// 	quickSort(arr, start, newpivot - 1);
// 	quickSort(arr, newpivot+1, end);
// 	return arr;

// }

// function partition(arr, start, end){
	
// 	var pivot = Math.floor((Math.random()*(end-start))+start);
// 	i = start - 1;
// 	j = start;
// 	while(j<=end){
// 		if(arr[pivot]>arr[j]){	
// 			i++;
// 			swap(arr, i, j);
// 		}
// 		if(pivot == i){
// 			pivot = j;
// 		}
//     j++;  
//   }
//   i++;

//   swap(arr, i, pivot)
//   pivot = i;  
//   return pivot;
// }




// function checkSort(arr){
//   for(var i=1; i<arr.length; i++){
//     if(arr[i] < arr[i-1]){
//       return false;
//     }
//   }
//   return true;
// }
// var myarr = [];
// for(var i=0; i<50000; i++){
//   // myarr.push(Math.floor(Math.random()*3000))
//   myarr.push(i)
// }

// console.time("selection")
// selectionSort(myarr);
// console.timeEnd("selection");


// // console.time("quicksort")
// // quickSort(myarr)
// // console.timeEnd("quicksort")
// console.log(checkSort(myarr));

function BST(){
  var newbst = {};
  newbst.root = null;
  return newbst;
}
function Node(val){
  var newNode = {};
  newNode.val = val;
  newNode.left = null;
  newNode.right = null;
  return newNode;
}
var mytree = BST();
mytree.root = Node(5);
console.log(mytree.root);
function insert(bst, val){
  if(!bst.root){
    bst.root = Node(val);
    return bst;
  }
  var current = bst.root;
 
  while(true){
    if(val>=current.val){
      if(!current.right){
        current.right = Node(val);
        return bst;
      }
      current = current.right;
    }
    else {
      if(!current.left){
        current.left = Node(val);
        return bst;
      }
      current = current.left;
    }
  }
}
insert(mytree, 10);
insert(mytree, 3);
insert(mytree, 15);
console.log(mytree);
