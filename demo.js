function bubble(arr){
  var bound = arr.length - 1;
  var temp = 0;
  while(bound > 0){
    var swapped = false;
    for(var i=0; i<bound; i++){

      if(arr[i]>arr[i+1]){
        swapped = true;
        temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1]= temp;
      }

    }
    if(swapped == false){
      return arr;
    }
    bound--;
  }
  return arr;
}

function selection(arr){
  for(var i=0; i<arr.length; i++){
    var min = i;
    for(var k=i+1; k<arr.length; k++){
      if(arr[k] < arr[min]){
        min = k;
      }
    }
    var temp = arr[min];
    arr[min] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
//
function insertion(arr){
  for(var i=1; i<arr.length; i++){
    // if(arr[i]<arr[i-1]){
      var current = arr[i];
    //   var j = i-1;
    //   while( j>=0 && current<arr[j]){
    //     arr[j+1] = arr[j];
    //     j--;
    //   }
    //   arr[j+1] = current;
    // }

    for(var j=i; j>0; j--){
      if(current < arr[j-1]){
        arr[j] = arr[j-1];
      }
      else {
        arr[j] = current;
        break;
      }
    }
  }
  return arr;
}

function mergeSort(arr){
	if(arr.length < 2){
		return arr
	}
	var middle = Math.round(arr.length/2);
	var leftside = arr.slice(0, middle);
	var rightside = arr.slice(middle, arr.length);

	return mergeSorted(mergeSort(leftside), mergeSort(rightside));

}

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

function checkSort(arr){
	var min = arr[0];
  var max = arr[0];
	for(var i=0; i<arr.length; i++){
    max = arr[i+1]
		if(arr[i]<min || arr[i]>max){
			return {'sorted': false, 'broken': i}
		}

	}
	return true;
}

function swap(arr, one, two){
  var temp = arr[one];
  arr[one] = arr[two];
  arr[two] = temp;
  return arr;
}

function quickSort(arr, start=0, end=arr.length-1){

	if(start >= end){
		return arr;
	}

	var newpivot = partition(arr, start, end);

	quickSort(arr, start, newpivot - 1);
	quickSort(arr, newpivot+1, end);
	return arr;

}

function partition(arr, start, end){

	var pivot = Math.floor((Math.random()*(end-start))+start);

	i = start - 1;
	j = start;
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

	swap(arr, i, pivot)

	pivot = i;
	return pivot;

}



var unsorted = [];
for(var i=0; i<=15000; i++){
	unsorted.push(Math.round(Math.random()*1000));
}




console.time("runTime");
var sorted = quickSort(unsorted);
console.timeEnd("runTime");

console.log(checkSort(sorted), sorted.length);
