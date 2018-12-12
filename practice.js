function insertionSort(arr){
    if(arr.length <=1) {
        return arr;
    }
    for(var i=1; i<arr.length; i++){
        var j = i;
        var temp = arr[i];
        while(j > 0 && temp < arr[j-1]){
            animate(arr, arr[j-1], arr[j])
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = temp;
        animate(arr, temp, arr[j]);
    }
    return arr;
}
var testarray = [2,3,1,5,4];
console.log(insertionSort(testarray));

function animate(arr, a, b){
    console.log(`Swapping ${a} with ${b}`);
}