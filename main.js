let bars = []
let backgroundArrNum = []

let canShuffle = true;
let canSort = true;

async function quickSortDivBar(array){
    if(!canShuffle || !canSort) return;

    async function swap(first, second) {
        [array[first], array[second]] = [array[second], array[first]];
        let changeNumFirst = second;
        let changeNumsecond = first;
        await new Promise(resolve => {
            const swapDelay = setInterval(() => {
                bars[changeNumFirst].style.setProperty("--index", `${array[changeNumFirst]}`);
                bars[changeNumsecond].style.setProperty("--index", `${array[changeNumsecond]}`);
                resolve(null);
                return clearInterval(swapDelay);
            }, 5);
        })
    }

    async function sort(start, end){
        if (end <= start) return;

        canSort = false;

        const pivotIndex = end;
        const pivot = array[pivotIndex];
        bars[pivotIndex].style.setProperty('--bar-color','#f00');

        let lessIndex = start;
        let moreIndex = pivotIndex - 1;
        let beforeLess = -1;
        let beforeMore = -1;
        
        await new Promise(resolve => {
            const repeater = setInterval(() => {
                if (beforeLess !== -1) bars[beforeLess].style.setProperty("--bar-color", "#fff");
                if (beforeMore !== -1) bars[beforeMore].style.setProperty("--bar-color", "#fff");
                beforeLess = lessIndex;
                beforeMore = moreIndex;
                bars[lessIndex].style.setProperty('--bar-color','#00f');
                bars[moreIndex].style.setProperty('--bar-color','#0f0');
                if(array[lessIndex] <= pivot){
                    if(array[moreIndex] > pivot){
                        moreIndex -= 1;
                    }
                    lessIndex += 1;
                }
                else{
                    if(array[moreIndex] < pivot){
                        swap(lessIndex, moreIndex);
                        lessIndex += 1;
                    }
                    moreIndex -= 1;
                    
                }
                if (lessIndex > moreIndex) {
                    resolve(null);
                    return clearInterval(repeater);
                }
            }, 5);
        })

        if (beforeLess !== -1) bars[beforeLess].style.setProperty("--bar-color", "#fff");
        if (beforeMore !== -1) bars[beforeMore].style.setProperty("--bar-color", "#fff");
        
        bars[pivotIndex].style.setProperty('--bar-color','#fff');
        swap(lessIndex, pivotIndex);
        await sort(start, lessIndex - 1);
        await sort(lessIndex + 1, end);
    }
    await sort(0, array.length - 1);
    canSort = true;
    return array;
}

window.onload = function(){
    const main = document.getElementById("main");

    for(let i = 1; i < 201; i++){
            const bar = document.createElement("div");  
            bar.classList.add("bar")
            bar.style.setProperty("--index", `${i}`)
            bar.style.setProperty("--bar-color", "#fff");

            bars.push(main.appendChild(bar))
            backgroundArrNum.push(i)
    }
}

function shuffle(array){
    array.sort(() => Math.random() -0.5)
}

async function shuffleDivBar(){
    if(!canShuffle || !canSort) return;
    canShuffle = false;

    shuffle(backgroundArrNum);
    // console.log(backgroundArrNum)
    

        let index = 0;
        while(index < bars.length){
            bars[index].style.setProperty('--bar-color', '#f00');
            bars[index].style.setProperty("--index", `${backgroundArrNum[index]}`);
            await new Promise(resolve => {
                setTimeout(() => {
                    bars[index].style.setProperty('--bar-color', '#fff');
                    index += 1;
                    resolve(null);
                }, 5);
            });
        }
        canShuffle = true;
}
