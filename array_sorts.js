// monday: Bubble sort, selection sort
// tuesday: insertion sort, merge sort
// wednesday: partition
// thursday: quick sort
// friday: radix sort

// To talk about big o - use an example for constant time

function multiply(num){
	return num * 5;
}
//doesn't matter how big the array is, this will be constant time
function multiplyFiftieth(arr){
	return arr[50] * 5;
}
// linear time, this will take longer depending on how many items are in the array
function multiplyAll(arr){
	for(var i=0; i<arr.length; i++){
		arr[i] = arr[i]*5;
	}
	return arr;
}
// sneakily introduce merge sort concept
// assume you have two sorted arrays, merge them together into a new array
// this will be quick, but burns up more space
function merge(arr1, arr2){
	var newarray = [];
	var oneidx = 0;
	var twoidx = 0;
	while(oneidx < arr1.length && twoidx < arr2.length){
			if(arr1[oneidx]<arr2[twoidx]){
				newarray.push(arr1[oneidx]);
				oneidx++;
			}
			else {
				newarray.push(arr2[twoidx]);
				twoidx++;
			}
	}
	if(oneidx < arr1.length){
		for(var i=oneidx; i<arr1.length; i++){
			newarray.push(arr1[i]);
		}
	}
	else {
		for(var i=twoidx; i<arr2.length; i++){
			newarray.push(arr2[i])
		}
	}
	return newarray;
}

function mergeInPlace(arr1, arr2){
	while(arr1.length > 0){
		var i = 0;
		while(arr1[0]>arr2[i] && i<arr2.length){
			i++;
		}
		for(var j=arr2.length-1; j>=i; j--){
			arr2[j+1] = arr2[j];
		}

		arr2[i]=arr1.shift();
	}
	return arr2;
}

// console.log("merge in place", mergeInPlace([4,5,6],[4,5,6]));




// SORTS: Given an unsorted array, what's the best way to sort it? Try these out and choose the best one for your purposes.



// super useful helper function
function swap(arr, i, j){
	var temp = arr[i];
	arr[i] = arr[j]
	arr[j] = temp;
}

// to check whether something is sorted, to see if our sorting algorithms worked!
function checkSort(arr){
	for(var i=0; i<arr.length-1; i++){
		if(arr[i]>arr[i+1]){
			return {sorted: false, broken: i};
		}
	}
	return true;
}


// SELECTION SORT

// We'll be setting a boundary to divide the sorted and unsorted parts of the array. We'll want to leave the sorted part alone and limit our meddling to the part that's still unsorted.
// We'll find the minimum value in the unsorted part array and swap it with the left-most value of the unsorted part. That element is now sorted!
// Then we'll reset our boundary, shrinking the unsorted part and exanding the sorted part.

function selectionSort(arr){
	// we'll assume the whole array is unsorted, so set our boundary (b) to index of 0. Each time we go through this loop, we're sorting one element, so our boundary will increase by 1.
	for(var b=0; b<arr.length-1; b++){
		// set the minimum to the boundary position
		var min = b;
		// Now we'll need to go through the part of the array that's to the right of our boundary (let's refer to this as s, for searchable)
		for(var s=b+1; s<arr.length; s++){
			// if anything in s is less than min, it becomes the new min
			if(arr[s] < arr[min]){
				min = s;
			}
		}
		// if we changed the min, it should swap its value with whatever's at the boundary
		if(min != b){
			swap(arr, min, b)
		}
	}
	return arr;
}

// INSERTION SORT

// For insertion sort, we go through the array, looking at each element. We compare it to its left neighbor. If it is less than its left neighbor, we'll shift that left neighbor over to the right one. We'll keep looking left and repeating this process until we find something that is not greater than this element. At that point, we'll have found out where this element should be in order to be sorted. Place that element there, then continue with the next.

function insertionSort(arr){

	for(var i=1; i<arr.length; i++){
		// Set current to be the element in the array we want to analyze
		var current = arr[i];
		// Set j to be to be current's left neighbor
		var j=i-1;
		// we'll do this loop as long as j is 0 or greater and arr[j] is greater than our current
		while(j>=0 && arr[j]>current){
			arr[j+1] = arr[j];
			j--;
		}
		// for(j; j>=0 && arr[j]>current; j--){
		// 	// make arr[j]'s right neighbor equal to arr[j]
		// 	arr[j+1] = arr[j];
		// }
		// when the for loop breaks, we're sitting on an element that is either greater than or less than our current OR j is -1. either way, we need to refer to the element to the right of j and make that equal to our current
		arr[j+1] = current;

	}
	return arr;
}

function insertionSortRefactor(arr){
	for(var i=1; i<arr.length; i++){
		var current = arr[i];
		var j = i-1;
		while(j>=0 && arr[j]>current){
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = current;
	}
	return arr;
}
function recursiveInsertionSort(arr, current = 1, left = 0){
	if(current = arr.length -1 && arr[current-1] < arr[current]){
		return 
	}
}
function bubbleagain(arr){
	for(var end = arr.length-1; end > 0; end--){
		var swapped = false;
		for(var i=0; i<end; i++){
			console.log(`comparing ${arr[i]} and ${arr[i+1]}`);
			if(arr[i] > arr[i+1]){
				swapped = true;
				let temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
			}
		}
		if(swapped == false){
			console.log("quick exit")
			return arr;
		}
	}
	console.log("no quick exit");
	return arr;
}



var bubarr = [1,2,3,4,5,6,7,8,7];			 
bubbleagain(bubarr);
console.log("bubbbb", bubarr);

// BUBBLE SORT
// We'll be traveling down the array, looking at two adjacent values. We'll swap them if the lesser value is to the right. Once we get to the end of the part of the array that we're sorting, we'll know that we at least ended up with the maximum value all the way to the right. So we'll limit our next sorting process only to the left of this value.

function bubbleSort(arr){
	// b will keep track of how much we want to reduce our array by
	for(var b=0; b < arr.length; b++){

		var swapped = false
		for(var s=0; s<arr.length-b-1; s++){
			// look at the adjacent value to s and decide if they need to be flipped
			if(arr[s] > arr[s+1]){
				swap(arr, s, s+1);
				swapped = true;
			}
		}
		if(swapped == false){ // fast finish check, can show a huge difference between best-case and worst-case run time. Adaptive algo.

			return arr;
		}
	}
}

function bubbleSortRefactor(arr){
	var edge = arr.length - 2;
	while(edge>=0){
		var swapped = false;
		for(var i=0; i<=edge;i++){
			if(arr[i]>arr[i+1]){
				swap(arr, i, i+1);
				swapped = true;
			}
		}
		if(swapped == false){
			return arr;
		}
		edge--;
	}
	return arr;
}

// QUICKSORT
// We'll be doing a series of partitions on the array in order to sort it. We'll pick a position in the array to be our pivot. The partition method will put all values less than the pivot value to the left and all values greater than the pivot value to the right.

// The quicksort function accepts three arguments: the array, a start position, and an end position

function quickSort(arr, start=0, end=arr.length-1){
	// When the user calls this function, they will probably just pass in the array to be sorted, so start and end will be undefined. Set them to be the first and last positions in the array
	// if(start === undefined){
	// 	start = 0;
	// 	end = arr.length - 1;
	// }
// If start is ever equal to or greater than the end, then we'll just return to wherever this method was called
	if(start >= end){
		return arr;
	}
	// The partition function gives us back where our pivot ended up, meaning that everything to the left and everything to the right of it still needs to be sorted. So we'll need to know this new position for our pivot, which we'll call newpivot
	var newpivot = partition(arr, start, end);
	// Call quicksort again from the start to just left of new pivot and from just right of newpivot to the end
	quickSort(arr, start, newpivot - 1);
	quickSort(arr, newpivot+1, end);
	return arr;

}
var arrHoare = [9,2,3,5,19,4,7,1,6,20,89,33,50,90,80];

function quickhoare(arr, start=0, end=arr.length-1){
	if(arr.length < 2){
		return arr;
	}
	var pivot = hoare(arr, start, end);
	if(pivot > start+1){
		quickhoare(arr, start, pivot - 1);
	}
	if(pivot < end-1){
		quickhoare(arr, pivot+1, end);
	}
	return arr;
}

function hoare(arr, start, end){
	var pivotidx = Math.floor((Math.random()*(end-start))+start);
	// console.log(pivotidx, start, end);
	var pivot = arr[pivotidx]
	var i=start;
	var j=end;
	while(i<j){
		// console.log(i, j);
		while(arr[i]<pivot){
			i++;
		}
		while(arr[j]>pivot){
			j--;
		}
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return j;
}
// console.log("qh", quickhoare(arrHoare));
// The helper partition function, which takes an array, a start position, and an end position. All values less than the pivot value go to the left. All values greater than the pivot value go to the right
function partition(arr, start, end){
	//pick a random pivot that's between start and end
	var pivot = Math.floor((Math.random()*(end-start))+start);
	// var pivot = start;
	// Two pointers, i and j, set up j at the start position and i trails it
	i = start - 1;
	j = start;
	while(j<=end){
		// as we go through the array by incrementing j, we'll be watching to see if arr[pivot] is ever greater than the value we're looking at

		if(arr[pivot]>arr[j]){
			// we'll have to increment i and then swap arr[i] with arr[j]
			i++;
			swap(arr, i, j);

		}
		// if pivot ever equals i, it's because i had just been incremented in the previous step, meaning that the i and j had been flipped, and now our pivot value is up where j is.
		if(pivot == i){
			// make sure that pivot is still pointing at that value that we originally picked
			pivot = j;
		}
		j++;
	}
	// when we exit the while loop, we need to increment i and swap i with the pivot value
	i++;

	swap(arr, i, pivot)
	//put pivot back on the value that we started with

	pivot = i;
	return pivot;
	// the quicksort function calls this method, so we'll return to it where our pivot is currently. Quicksort will then be able to use this value to set up the next quicksort call.
}

var mergearray = makeArray();
// console.time("mergingsort");
// var mergedArray = mergeSort(mergearray);
// console.timeEnd("mergingsort");
// console.log("checking merge", checkSort(mergedArray));
console.time("bubbled");
bubbleSort(mergearray);
console.timeEnd("bubbled");
console.log("checking bubble", checkSort(mergearray));



function mergeSort(arr){
	//find out if the array is worth sorting
	if(arr.length < 2){
		return arr
	}
	// otherwise we'll have to cut it in half as best we can
	var middle = Math.round(arr.length/2);
	var leftside = arr.slice(0, middle);

	var rightside = arr.slice(middle, arr.length);

	// now we'll call mergeSort on the leftside and on the rightside, and once we actually get arrays back, we'll merge them.
	return mergeSorted(mergeSort(leftside), mergeSort(rightside));

}
function mergeSorted(left, right){
	var result = [];
	var l = 0;
	var r = 0;
	while(l < left.length && r < right.length){
		if(left[l] < right[r]){
			result.push(left[l]);
			l++;
		}
		else {
			result.push(right[r]);
			r++;
		}
	}
	while(l<left.length){
		result.push(left[l]);
		l++;
	}
	while(r < right.length){
		result.push(right[r]);
		r++;
	}
	return result;
}

//A helper function to merge together two sorted arrays. The arrays must be sorted!
// function mergeSorted(left, right){
// 	var result = [];
// 	while(left.length && right.length){
// 		if(left[0] <= right[0]){
// 		result.push(left.shift());

// 		}
// 		else {
// 		result.push(right.shift());
// 		}
// 	}

// 	while(left.length){
// 		result.push(left.shift());

// 	}
// 	while(right.length){
// 		result.push(right.shift());

// 	}
// 	return result;
// }


// make an unsorted array with thousands of elements
function makeArray(){

	var unsorted = [];
	for(var i=0; i<=15000; i++){
		unsorted.push(Math.round(Math.random()*1000));
	}
	return unsorted;
}
function makeSortedArray(){
	var sorted = [];
	for(var i=0; i<15000; i++){
		sorted.push(i);
	}
	return sorted;
}


// console.log("unsorted array", unsorted);
var getDigit = function(num,nth){
  // get last nth digit of a number
  var ret = 0;
	nth--;
  while(nth>=0){
		// console.log("the nth", nth);
    ret = num % 10 // the remainder from dividing by 10
    num = Math.floor((num - ret) / 10) //subtract that off the num if this isn't the digit we want
		nth--;
  }
  return ret
}

// radixSort
function radixSortb(list){
  var max = Math.floor(Math.log10(Math.max.apply(Math,list))),
      // get the length of digits of the max value in this array
      digitBuckets = [],
      idx = 0;

  for(var i = 0;i<max+1;i++){

    // rebuild the digit buckets according to this digit
    digitBuckets = []
    for(var j = 0;j<list.length;j++){
      var digit = getDigit(list[j],i+1);

      digitBuckets[digit] = digitBuckets[digit] || [];
      digitBuckets[digit].push(list[j]);
    }

    // rebuild the list according to this digit
    idx = 0
    for(var t = 0; t< digitBuckets.length;t++){
      if(digitBuckets[t] && digitBuckets[t].length > 0){
        for(j = 0;j<digitBuckets[t].length;j++){
          list[idx++] = digitBuckets[t][j];
        }
      }
    }
  }
  return list
}


function radixSortCount(arr){
	// We would look at the ones digit, go through and count how many end with 0, 1, 2, etc
	// Make an array with the counts
	// starting at index 1 of the counts array, add up everything before so that you know where in the new array each number with that ones digit should be placed
	// pop off the end and move each element into its new position, decrementing the corresponding count in the counts array
	// repeat with each digit

	// Find the maxlength
	// var maxlength = arr[0].toString.length;
	// for(var i=1; i<arr.length; i++){
	// 	if(arr[i].toString().length > maxlength){
	// 		maxlength = arr[i].toString().length;
	// 	}
	//
	// }
	var maxlength = 1;
	for(var i=0; i<arr.length; i++){
		var temp = Math.abs(arr[i]);
		// console.log("temp", temp);
		var length = 0;
		while(temp >= 1){
			temp = temp/10;
			length ++;
		}
		if(length > maxlength){
			maxlength = length;
		}
	}

	// console.log("max length", maxlength);

	for(var j=1; j<=maxlength; j++){
		var counts = [0,0,0,0,0,0,0,0,0,0];
		for(var n=0; n<arr.length; n++){
			// console.log("arr of n", arr[n]);
			// var numstring = arr[n].toString();
			//get the digit
			var signum = getDigit(arr[n], j);
			// if(j<=numstring.length){
			// 	signum = Number(numstring[numstring.length-j]);
			// }
			counts[signum]++;
		}
		var sum = counts[0];
		for(var k=1; k<counts.length; k++){
			sum += counts[k];
			counts[k]=sum;
		}
		var sorting = [];
		while(arr.length > 0){
			var toSort = arr.pop();
			var sortDigit = getDigit(toSort, j)
			counts[sortDigit]--;
			sorting[counts[sortDigit]] = toSort;
		}
		// console.log("sorting arr", sorting);
		arr = sorting;




	}
	return arr;
}

var runsort = [3,2,33,27,99,106,88,102,312,217,74];
console.log("insertion sort", insertionSort(runsort));
// console.log("radix count", radixSortCount(runsort));

// console.log("radix sort count", radixSortCount(unsorted));

function bucketSort(arr){
	// We start by looking at ones digits, sorting everything into buckets 0-9
	// smush the buckets together, clear the buckets, do everything again with tens digits
	// keep going for however many digits the longest number has
	var maxlength = arr[0].toString().length;
	for(var i=1; i<arr.length; i++){
		if(arr[i].toString().length > maxlength){
			maxlength = arr[i].toString().length;
		}
	}
	// console.log("got the maxlength", maxlength)
	var buckets = [[],[],[],[],[],[],[],[],[],[]];
	for(var j=1; j<=maxlength; j++){
		for(var n=0; n<arr.length; n++){
			var numstring = arr[n].toString();
			var signum = 0;
			if(j<=numstring.length){
				signum = Number(numstring[numstring.length - j]);
			}
			buckets[signum].push(arr[n]);
		}
		// console.log(buckets);
		arr = [];
		for(var x=0; x<buckets.length; x++){
			arr = arr.concat(buckets[x]);
		}
		buckets = [[],[],[],[],[],[],[],[],[],[]];
	}
	return arr;

}
var unsorted1 = makeArray();
var unsorted2 = makeArray();
var sorted = makeSortedArray();

// console.time("sorting")
// quickSort(unsorted1);
// quickSort(sorted)
// console.timeEnd("sorting")
// console.log("sorted?", checkSort(sorted))
// console.time("anotherSort")
// bubbleSort(unsorted2)
// console.timeEnd("anotherSort")





function stmerge(arr){
	if(arr.length == 1){
		return arr;
	}
	else if(arr.length > 1){
		var part1 = stmerge(arr.slice(0, Math.ceil(arr.length/2)));
		var part2 = stmerge(arr.slice(Math.ceil(arr.length/2), arr.length));
		return mergeInPlace(part1, part2);
	}
	else {
		return arr;
	}
}

function recmaxsort(arr){
	if(arr.length <= 1){
		return arr;
	}
	var maxidx = 0;
	for(var i=1; i<arr.length; i++){
		if(arr[i] > arr[maxidx]){
			maxidx = i;
		}
	}
	var temp = arr[maxidx];
	arr[maxidx] = arr[arr.length -1];
	arr[arr.length -1]= temp;
	arr.pop();
	recmaxsort(arr).push(temp);
	return arr;
}

function heapSort(arr){
	// turn the array into a heap
	if(arr.length <=1){
		return arr;
	}
	arr = heapify(arr);
	n=0;
	while(n <= arr.length - 2){
		var temp = arr[1];
		arr[1] = arr[arr.length - 1 - n];
		arr[arr.length - 1 - n] = temp;
		reHeapify(arr, n);
		n++;
	}
	return arr;
}
function reHeapify(arr, n=0){
	var parent = 1;
	var c1;
	var c2;
	// as long as there is a child within the heap portion
	while(parent * 2 < arr.length -1 -n){
		if(parent * 2 + 1 < arr.length - 1 - n){
			c2 = parent * 2 + 1;
			c1 = parent * 2;
			if(arr[c2] > arr[parent] || arr[c1] > arr[parent]){
				var largerChild;
				if(arr[c2] > arr[c1]){
					// second child is bigger than parent and first child
					largerChild = c2;
				}
				else {
					// first child is bigger than parent and second child
					largerChild = c1;
				}
				var temp = arr[parent];
				arr[parent] = arr[largerChild];
				arr[largerChild] = temp;
				parent = largerChild;
			}
			else {
				return arr;
			}
		}
		else if(parent * 2 < arr.length - 1 - n){
			// only one child
			c1 = parent * 2;
			if(arr[c1] > arr[parent]){
				// if the one child is bigger than the parent
				var temp = arr[parent];
				arr[parent] = arr[c1];
				arr[c1] = temp;
				parent = c1;
	
			}
			else {
				return arr;
			}
		}
		else {
			// no children
			return arr;
		}
	}


}
function heapify(arr){
	arr.push(arr[0]);
	arr[0] = undefined;
	for(var p = Math.floor((arr.length-1)/2); p>=1; p--){
		var c1 = 2*p;
		var c2 = c1 + 1;
		if ((c2 < arr.length && arr[c2] > arr[p]) || arr[c1] > arr[p]) {
			var bp = p;
			while((c2 < arr.length && arr[c2] > arr[bp]) || arr[c1] > arr[bp]){
				var largerChild;
				if(c2 < arr.length && arr[c2] > arr[c1]) {
					largerChild = c2;
				}
				else {
					largerChild = c1;
				}
				var temp = arr[bp];
				arr[bp] = arr[largerChild];
				arr[largerChild] = temp;
				bp = largerChild;
				c1 = bp * 2;
				c2 = c1 + 1;
			}
		}
	}
	return arr;
}

var unsortedArray = [5, 15, 2, 7, 3, 20, 21, 14, 6, 4, 75, 33, 35];
heapSort(unsortedArray);
console.log(unsortedArray);
// var recmarr = [9];
// console.log("recmaxsort", recmaxsort(recmarr))
// console.log(recmarr);


//   50
//  25  25
// 12   12  12  12
// 6
//3
//end


//80
//40 40
//20
//10
//5
//2
//end


//500
//250 250
// 125 
// 

