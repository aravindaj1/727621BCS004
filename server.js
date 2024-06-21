const { error } = require('console');
const { generateKey } = require('crypto');
const express=require('express');
const { type } = require('os');
const app=express();
const port=3000;
const size=10;

let nums=[];

const genrandom=()=>Math.floor(Math.random()*100)+1;

const generateNumber =(type) =>{
    switch(type){
        case 'p':
            return genPrime();
        case 'f':
            return genFib();
        case 'e':
            return genEven();
        case 'r':
            return genrandom();
        default:
            return null;
    }
}

const calavg =(nums)=> {
    if(nums.length===0) 
        return 0;
    const sum =nums.reduce((acc,num)=> acc+num,0);
    return sum/nums.length;
}

const genPrime =(function(){
    let lastPrime=1;
    return function(){
        let c=lastPrime+1;
        while(true){
            if(isPrime(c)){
                lastPrime=c;
                return c;
            }
            c++;
        }
    };
})();

function isPrime(num) {
    for(let i=2,sqrt = Math.sqrt(num);i<=sqrt;i++){
        if(num % i ===0) return false;
    }
    return num>1;
}

const genFib = (function(){
    let a =0,b=1;
    return function(){
        let next = a+b;
        a=b;
        b=next;
        return a;
    };
})();

const genEven = (function(){
    let lastEven =0;
    return function(){
        lastEven+=2;
        return lastEven;
    };
})();

app.get('/numbers/:numberid',async (req,res)=>{
    const numberid= req.params.numberid;
    const validIds =['p','f','e','r'];

    if(!validIds.includes(numberid)) {
        return res.status(400).json({error:'Invalid number id'});
    }
    const number=generateNumber(numberid);
    const numbersBefore=[...nums];
    
    if(number!==null && !nums.includes(number)){
        if(nums.length>=size){
            nums.shift();
        }
        nums.push(number);
    }
    const numbersAfter=[...nums];
    const average=calavg(nums);

    res.json({
        numbersBefore,
        numbersAfter,
        average
    });
});



app.listen(port,()=>{
    console.log('App is running in port 3000');
});