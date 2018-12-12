def insertionSort(arr):
    for i in range(1, len(arr)):
        k = i-1
        temp = arr[i]
        while k >= 0 and arr[k] > temp:
            arr[k+1] = arr[k]
            k-=1
        arr[k+1] = temp
    return arr

testarr = [8,3,9,10,2,10,5,99,7,4,34,55,24,27,95,37,88]
# insertionSort(testarr)
# print(testarr)

def recursiveSort(arr):
    if len(arr) == 1:
        return arr
    maxidx = 0
    maxval = arr[maxidx]
    for i in range(1, len(arr)):
        if arr[i] > arr[maxidx]:
            maxidx = i
            maxval = arr[maxidx]
    arr[maxidx], arr[len(arr)-1] = arr[len(arr)-1], arr[maxidx]
    arr.pop()
    x = recursiveSort(arr)
    x.append(maxval)
    return x

import math
recursiveSort(testarr)
print(testarr)
test = 7/2
print(test)
print(math.ceil(test))
print(math.floor(test))
