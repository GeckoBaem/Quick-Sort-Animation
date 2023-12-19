function quickSort(array){

    function swap(first, second) {
        [array[first], array[second]] = [array[second], array[first]]
    }

    function sort(start, end){
        if (end - start <= 0) return;

        const pivotIndex = end;
        const pivot = array[pivotIndex];

        let lessIndex = start;
        let moreIndex = pivotIndex - 1;

        while(lessIndex <= moreIndex){
            if(array[lessIndex] <= pivot){
                if(array[moreIndex] > pivot){
                    moreIndex -= 1;
                }
                lessIndex += 1;
            }
            else{
                if(array[moreIndex] < pivot){
                    swap(lessIndex, moreIndex)
                    lessIndex += 1;
                }
                moreIndex -= 1;
            }
        }

        swap(lessIndex, pivotIndex);
        sort(start, lessIndex - 1);
        sort(lessIndex + 1, end);
    }
    sort(0, array.length - 1);
    console.log(array);
    return array;
}

