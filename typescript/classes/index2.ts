//basics generic

function myData<T>(item: T): T[] {
     return [item]
}
console.log(myData("rushikesh"));
console.log(myData(24));
console.log(myData(true));
