#! /usr/bin/env node

const { runMain } = require("module")
const { exit } = require("process")

let argvs_array = process.argv
let data = ""
if(argvs_array.length == 0){
    console.error("there is no input")
    exit(1)
   
} 
if(argvs_array[2].includes("csv") && argvs_array[2] !== undefined) {
    data = require("fs").readFileSync(argvs_array[2], "utf8")
    if(data !== undefined)
    {
        data = data.split("\r\n");
        for(let i = 0 ; i < data.length ; i++) data[i] = data[i].replace(/\s+/g, '').trim() 

    }
}


let maxLength = checkMax(argvs_array) != 0 ? checkMax(argvs_array) : 0
//helper function 
//take argv input
//look for max length
//returns maxlength
function checkMax(input){
    let maxLength = input[2].length
    for(let i = 2; i < input.length ; i++)
    {
        if(maxLength <= input[i].length)
            maxLength = input[i].length;
    }
    return maxLength;
}


function drawLine(length)
{
   return "━".repeat(length)
}
function drawTopBorder(length)
{
    return "┏"+drawLine(length)+"┓"+"\n"
}
function drawMiddleBorder(length, isCSV = false)
{
    if(isCSV) return "┣"+"━".repeat(length)+"┫"+"┣"+"━".repeat(length)+"┫"+"\n"
    return "┣"+"━".repeat(length)+"┫"+"\n"
}
function drawBottomBorder(length)
{
    return "┗"+"━".repeat(length)+"┛"+"\n"
} 
function drawBarsAround(str,str2,num = maxLength, itsCSV = false)
{
    var cal1 = num - str.length > 0 ? num - str.length : 0
    var cal12 = num - str2.length > 0 ? num - str2.length : 0

    if(itsCSV) return  "┃"+`${str}`+ `${" ".repeat(cal1)}`+ "┃" + `${str2}` + `${" ".repeat(cal12)}`+"┃"+"\n"
    else return "┃"+`${str}`+ `${" ".repeat(cal1)}`+"┃"+"\n" 
}

function boxit(argvs_array, csvOn = false)
{
    
    if(csvOn == false){

        console.log(drawTopBorder(maxLength))
        for(var i = 2 ; i < argvs_array.length; i++)
        {
            console.log(drawBarsAround(argvs_array[i]))
            if(i != argvs_array.length-1){
                console.log(drawMiddleBorder(maxLength))
            }else{
                console.log(drawBottomBorder(maxLength))
            }
        }
    }
    else{
        console.log(argvs_array.length)
        console.log(argvs_array[0].split(','))
        argvs_array = argvs_array[0].split(',')
        console.log(drawTopBorder(maxLength*2.5))
        for(var i = 0 ; i < argvs_array.length; i++)
        {
            var result = false;
            let cal = maxLength - argvs_array[i].length > 0 ? maxLength - argvs_array[i].length : 0
            console.log(drawBarsAround(argvs_array[i],argvs_array[i+1],result, true))
            console.log(drawMiddleBorder(maxLength, true))
            i++
            if( i == argvs_array.length-1){
                console.log(drawBottomBorder(maxLength*2.5))
            }
        }
    }
}




function runMain1(){
    console.log(drawLine(4))
    console.log(drawLine(8))
    
    console.log(drawTopBorder(4)) // returns '┏━━━━┓'
    console.log(drawTopBorder(0)) // returns '┏┓'
    
    
    console.log(drawMiddleBorder(8))// returns '┣━━━━━━━━━┫'
    console.log(drawMiddleBorder(0)) // returns '┣┫'
    
    
    console.log(drawBottomBorder(2)) // returns '┗━━┛'
    console.log(drawBarsAround("My name is Dan")) // returns "┃My name is Dan┃"
    console.log(drawBarsAround("You are Jane  ")) // returns "┃You are Jane  ┃"
    console.log(drawBarsAround("  You are Bill")) // returns "┃  You are Bill┃"
    data.length != 0? boxit(data, true) : boxit(argvs_array)
}

runMain1()
