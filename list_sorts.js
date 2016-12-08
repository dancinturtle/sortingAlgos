
function SLL(){
	this.head = null;
	this.insert = function(val){
		if(this.head){
			this.head.insert(val);
		}
		else {
			this.head = new Node(val);
		}
		return this;
	}
	this.bubbleSort = function(){
		if(!this.head){
			return "no list"
		}
    // if there's only a list head, there's nothing to sort.
    if(!this.head.next){
      return this;
    }
    // To start bubbleSort on the nodes, we'll need to keep track of the head node and whether any swapping happened. Pass these as parameters.
    this.head.bubbleSort(this.head, false);
    // returning this allows for method chaining
    return this;
	}
  this.selectionSort = function(){
    if(!this.head){
      return "No list"
    }
    // if there's only a head, there's nothing to sort
    if(!this.head.next){
      return this;
    }
    this.head.next.selectionSort(this.head, this.head)
  }
  this.insertionSort = function(){
    if(!this.head){
      return "No list"
    }
    if(!this.head.next){
      return this
    }
    var current = this.head;
    while(current.next){
      var innercurrent = current;

      while(innercurrent.val < innercurrent.next.val){

        innercurrent = innercurrent.next
      }
      var tomove = innercurrent.next;
      if(tomove.val<this.head.val) {

        if(tomove.next){
          innercurrent.next = tomove.next;

        }
        else {
          innercurrent.next = null;
        }
        tomove.next = this.head;
        this.head = tomove;
      }
      else {
        var searchcurrent = this.head;
        while(searchcurrent.next.val < tomove.val){
          searchcurrent = searchcurrent.next;
        }
        if(tomove.next){
          innercurrent.next = tomove.next;
        }
        else {
          innercurrent.next = null;
        }
        tomove.next = searchcurrent.next;
        searchcurrent.next = tomove;
      }
      if(current.next){
        current = current.next;
      }
      // current = current.next;

    }
    return this;
  }
	this.traverse = function(){
		if(this.head){
			return this.head.traverse();
		}
		else {
			return "no list"
		}
	}

}
function Node(val){
	this.val = val;
	this.next = null;
	this.insert = function(val){
		if(this.next){
			this.next.insert(val);
		}
		else {
			this.next = new Node(val);
		}
	}
	this.traverse = function(arr){
	  if(arr === undefined){
      arr = [];
    }
    arr.push(this.val)
		if(this.next){
			this.next.traverse(arr);
		}
    return arr;
	}
  // The node's bubbleSort will keep track of the head node, whether any swaps have happened yet, and how far down the list we want to go
	this.bubbleSort = function(head, swap, endnode){
    // as long as we have a next and the next node isn't where we want to stop
    if(this.next && this.next != endnode){
      // we'll check if this value is greater than the next value. If it is, we'll swap them and mark our swap as true
      if(this.val > this.next.val){
        var temp = this.val;
        this.val = this.next.val;
        this.next.val = temp;
        swap = true;
      }
      //We'll pass this task on to the next node, telling it where our head node is, whether we've swapped, and where our end node is (if we know it)
      this.next.bubbleSort(head, swap, endnode);
    }
    // if we don't have a next or if the next one is our end node, then we made it through the list.
    if(!this.next || this.next == endnode){
      // we'll check if we've done any swaps.
      if(swap == false){
        // if we haven't done any swaps, then we're done. Just return and don't do anything more.
        return
      }
      // if we have done swaps, then we're not done yet. We'll go back to our head node and start all over. The node we're on is the new endnode and we'll reset our swaps to false.
      head.bubbleSort(head, false, this)
    }

	}
  this.selectionSort = function(leftnode, minnode){
    if(this.val < minnode.val){
      minnode = this;
    }
    if(this.next){
      this.next.selectionSort(leftnode, minnode);
    }
    else {
      var temp = minnode.val;
      minnode.val = leftnode.val;
      leftnode.val = temp;
      if(leftnode.next.next){
        leftnode.next.next.selectionSort(leftnode.next, leftnode.next);
      }
      else{
        console.log(this.val);

      }
    }

  }
}

var testlist = new SLL();
testlist.insert(3).insert(4).insert(20).insert(2).insert(7).insert(1).insert(5).insert(33).insert(-8)
console.log(testlist.traverse());
testlist.insertionSort();
console.log(testlist.traverse());
