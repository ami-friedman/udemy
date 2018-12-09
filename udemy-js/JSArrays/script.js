console.log("Connected");

function printReverse(array){
    for (i = array.length -1; i >= 0;i--){
        console.log(array[i]);
    }
}

function isUniform(array){
    var base = array[0];
    for (i = 1;i < array.length;i++){
        if (array[i] !== base){
            return false;
        }
    }
    return true;
}

function sumArray(array) {
    var sum = 0;
    array.forEach(element => {
        sum += element;
    });

    return sum;
}

function max(array){
    var max = array[0];
    array.forEach(element => {
        if (max < element){
            max = element;
        }
    });

    return max;

}

prompt("Are you redy?");

var myArray = [1,1,1,1];
printReverse(myArray);
console.log("The following array " + myArray + (isUniform(myArray)? " is" : " is not") + " unifrom");
console.log("The array sum is: " + sumArray(myArray));
console.log("The max element is: " + max(myArray));




