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
        console.log(typeof(data), data.lenth)
        
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
function drawMiddleBorder(length)
{
    return "┣"+"━".repeat(length)+"┫"+"\n"
}
function drawBottomBorder(length)
{
    return "┗"+"━".repeat(length)+"┛"+"\n"
} 
function drawBarsAround(str)
{
    return "┃"+`${str}`+ `${" ".repeat(maxLength - str.length)}`+"┃"+"\n"
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
        for(let i in data) console.log(i)
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
}


data.length != 0? boxit(data, true) : boxit(argvs_array)