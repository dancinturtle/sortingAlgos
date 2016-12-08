// SORTS: Given an unsorted array, what's the best way to sort it? Try these out and choose the best one for your purposes.


// super useful helper function
function swap(arr, i, j){
	var temp = arr[i];
	arr[i] = arr[j]
	arr[j] = temp;
}

// to check whether something is sorted, to see if our sorting algorithms worked!
function checkSort(arr){
	var min = arr[0];
	for(var i=1; i<arr.length; i++){

		if(arr[i]<min){
			return {'sorted': false, 'broken': i}
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
}

// INSERTION SORT

// For insertion sort, we go through the array, looking at each element. We compare it to its left neighbor. If it is greater than its left neighbor, we'll shift that left neighbor over one. We'll keep looking left and repeating this process until we find something that is not less than this element. At that point, we'll have found out where this element should be in order to be sorted.
function insertionSort(arr){

	for(var i=1; i<arr.length; i++){
		// Set current to be the element in the array we want to analyze
		var current = arr[i];
		// Set j to be to be current's left neighbor
		var j=i-1;
		// we'll do this loop as long as j is 0 or greater and arr[j] is greater than our current
		for(j; j>=0 && arr[j]>current; j--){
			// make arr[j]'s right neighbor equal to arr[j]
			arr[j+1] = arr[j];
		}
		// when the for loop breaks, we're sitting on an element that is either greater than or less than our current OR j is -1. either way, we need to refer to the element to the right of j and make that equal to our current
		arr[j+1] = current;

	}
}


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
				// var temp = arr[s];
				// arr[s] = arr[s+1];
				// arr[s+1] = temp;
				swapped = true;
			}
		}
		if(swapped == false){ // fast finish check, can show a huge difference between best-case and worst-case run time. Adaptive algo.

			return;
		}
	}
}

// QUICKSORT
// We'll be doing a series of partitions on the array in order to sort it. We'll pick a position in the array to be our pivot. The partition method will put all values less than the pivot value to the left and all values greater than the pivot value to the right.

// The quicksort function accepts three arguments: the array, a start position, and an end position

function quicksort(arr, start, end){
	// When the user calls this function, they will probably just pass in the array to be sorted, so start and end will be undefined. Set them to be the first and last positions in the array
	if(start === undefined){
		start = 0;
		end = arr.length - 1;
	}
// If start is ever equal to or greater than the end, then we'll just return to wherever this method was called
	if(start >= end){
		return
	}
	// The partition function gives us back where our pivot ended up, meaning that everything to the left and everything to the right of it still needs to be sorted. So we'll need to know this new position for our pivot, which we'll call newpivot
	newpivot = partition(arr, start, end);
	// Call quicksort again from the start to just left of new pivot and from just right of newpivot to the end
	quicksort(arr, start, newpivot - 1);
	quicksort(arr, newpivot+1, end);

}
// The helper partition function, which takes an array, a start position, and an end position. All values less than the pivot value go to the left. All values greater than the pivot value go to the right
function partition(arr, start, end){
	//pick a random pivot that's between start and end
	var pivot = Math.floor((Math.random()*(end-start))+start);
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

//A helper function to merge together two sorted arrays. The arrays must be sorted!
function mergeSorted(left, right){
	var result = [];
	while(left.length && right.length){
		if(left[0] <= right[0]){
		result.push(left.shift());

		}
		else {
		result.push(right.shift());
		}
	}

	while(left.length){
		result.push(left.shift());

	}
	while(right.length){
		result.push(right.shift());

	}
	return result;
}





// Andres' mergeSort
function msort(arr){
	var start = [];
	start.push(arr[0]);
	for (var i=1; i<arr.length; i++){
		var next = [];
		next.push(arr[i]);
		start = mergeSorted(start, next); // return sorted array
	}
	return start;
}


// make an unsorted array with thousands of elements
var unsorted = [];
for(var i=0; i<=5000; i++){
	unsorted.push(Math.round(Math.random()*5000));
}

var swaparray = [1,2,3,4,5,6];

// console.log("before", unsorted);
console.time("runTime");
var checked = checkSort(swaparray);
console.timeEnd("runTime");
console.log(checked)


// console.log(checkSort(unsorted))
// console.time("bubble");
// selectionSort(unsorted);
// console.timeEnd("bubble");

// console.time("bubbletime")
// bubbleSort(unsorted);
// console.timeEnd("bubbletime");
// console.time("selectionTime");
// selectionSort(unsorted);
// console.timeEnd("selectionTime");

// var splitting = [2,3,4];
// console.log("splitting", splitting.slice(0,1));




// console.log("after merge sort", unsort)

// var testarray = [5,4,9,2,5,3];
// console.log("before", testarray);
// partition(testarray, 0, testarray.length-1 );
// console.log("after", testarray);
// var linkedlist = new SLL();
// linkedlist.insert(6).insert(7).insert(3);
// linkedlist.traverse();
