let a=parseInt(prompt("Enter num 1:"));
let b=parseInt(prompt("Enter num 2:"))
console.log("Enter the operations to be Performed: 1) Addition 2) Subtraction 3) Multiplication 4) Division")
c=parseInt(prompt("Enter your choice:"));
if(c==1){
    console.log("Addition of "+a+" and "+b+" is: "+(a+b))
}
else if(c==2){
    console.log("Subtraction of "+a+" and "+b+" is: "+(a-b))
}
else if(c==3){
    console.log("Multiplication of "+a+" and "+b+" is: "+(a*b))
}
else if(c==4){
    console.log("Division of "+a+" and "+b+" is: "+(a/b))
}
