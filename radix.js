// Radix sort:
// Go through and look at only ones digits, put them into buckets 0-9
// Smush them together, go through again and sort into buckets by tens digits
// Continue for the longest number
// Will be sorted because order is preserved from the last iteration

var array = [2,3,9,100,2000,187,298,376,672,18,87,22,567,43,2323,2848,111];



var RadixSort = function(arr){
	this.array = arr;
	this.maxlength = this.array[0].toString().length;
	this.buckets = {"0": [], "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": []};
	this.findmaxlength = function(){
		for(var i=1; i<this.array.length; i++){
			if(this.array[i].toString().length > this.maxlength){
				this.maxlength = this.array[i].toString().length;
			}
		}
	}
	this.putinbuckets = function(num, signum){
		this.buckets[signum].push(num);

	}
	this.clearbuckets = function(){
		for (var key in this.buckets){
			this.buckets[key] = [];
		}
	}
	this.mergebuckets = function(){
		this.array = this.buckets["0"].concat(this.buckets["1"], this.buckets["2"], this.buckets["3"], this.buckets["4"], this.buckets["5"], this.buckets["6"], this.buckets["7"], this.buckets["8"], this.buckets["9"]);
	}

	this.sorting = function(){
		this.findmaxlength();
		for(var j=0; j<this.maxlength; j++){

			for(var k=0; k<this.array.length; k++){

				var numberstring = this.array[k].toString();

				var signum = numberstring[numberstring.length-1-j];
				if(signum === undefined){
					signum = "0";
				}

				this.putinbuckets(this.array[k], signum)
			}
			this.mergebuckets();

			this.clearbuckets();

		}
	}

}

var testingRadix = new RadixSort(array);
testingRadix.sorting();
console.log(testingRadix.array);

function checkSorted(arr){
  for(var i=0; i<arr.length-1; i++){
    if(arr[i]>arr[i+1]){
      return false;
    }
  }
  return true;
}

var unsorted = [];

for(var i=0; i<=50; i++){
	unsorted.push(Math.round(Math.random()*50));
}

console.log(unsorted);
var newRadix = new RadixSort(unsorted);
newRadix.sorting();
console.log(newRadix.array);
