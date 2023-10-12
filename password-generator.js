const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
 const passwordDisplay=document.querySelector("[data-passwordDisplay]");
 const copyBtn=document.querySelector("[data-Copy]");
 const copymsg=document.querySelector("[data-copyMsg]");
 const uppercasecheck=document.querySelector("#uppercase");
 const lowercasecheck=document.querySelector("#lowercase");
 const numberscheck=document.querySelector("#numbers");
 const symbolscheck=document.querySelector("#symbols");
 const indicator=document.querySelector("[data-indicator]");
 const generateBtn=document.querySelector(".generatebutton");
 const allcheckbox=document.querySelectorAll("input[type=checkbox]");
 const symbol ='~!@#$%^&*';
 let password="";
 let passwordlen=10;//by default UI pr initially 10 show karat ba
 let checkcount=0;
 handleslider();
 //set passsword length
 function handleslider(){
    inputSlider.value=passwordlen;
    lengthDisplay.innerText=passwordlen;
    const Min=inputSlider.min;
    const Max=inputSlider.max;
    inputSlider.style.backgroundSize=(((passwordlen-Min)*100)/(Max-Min)) + "% 100%"
 }
 function Setindicator(color){
indicator.style.backgroundColor=color;
indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
 }
 Setindicator("#ccc");
 function getrandomint(min,max){
    return Math.floor(Math.random()*(max-min)) +min;
 }
 function generaterandomnumber(){
    return getrandomint(0,9);
 }
 function generatelowercase(){
 return String.fromCharCode( getrandomint(97,123));
 }
 function generateuppercase(){
return String.fromCharCode(getrandomint(65,91));
 }
 console.log('generateSymbol');
 function generatesymbol(){
let ransymbol= getrandomint(0,symbol.length);
return symbol.charAt(ransymbol);
 }
function calcstrength(){
    let hasupper=false;
    let haslower=false;
    let hassymb=false;
    let hasnumb=false;
    if(uppercasecheck.checked) hasupper=true;
    if(lowercasecheck.checked) haslower=true;
    if(numberscheck.checked) hassymb=true;
    if(symbolscheck.checked) hasnumb=true;
    if(hasupper && haslower &&(hasnumb ||hassymb) &&passwordlen>=8){
        Setindicator("#0f0");
    }
    else if(
        (haslower||hasupper)&&(hassymb||hasnumb)&&passwordlen>=6
    ){
        Setindicator("#ff0");
    }
    else{
        Setindicator("#f00");
    }
}
 async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText="Copied";
    }
    catch (e){
copymsg.innerText="Failed";
    }
   copymsg.classList.add("active");
   setTimeout (()=>{
    copymsg.classList.remove("active");
   },2000)
}
inputSlider.addEventListener('input',(e)=>{
    passwordlen=e.target.value;
    handleslider();
})
 copyBtn.addEventListener('click',()=>{
    if(passwordlen>0)
    copycontent();
 })
 function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    })
 }
 //special condition
 if(passwordlen<checkcount){
    passwordlen=checkcount;
    handleslider();
 }
 allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);

 })
 function shufflepassword(Array){
    console.log('password shuffled');
    //fisher yates method
    for(let i=Array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
    }
    let str="";
    Array.forEach((el)=>(str+=el));
    return str;
 }
generateBtn.addEventListener('click',()=>{
//none of the checkbox are selected
if(checkcount<=0)
return;
if(passwordlen<checkcount){
    passwordlen=checkcount;
    handleslider();
}
//let's find new password

//remove old password
password="";
//if(uppercasecheck.checked)
//password+=generateuppercase();
//if(lowercasecheckcasecheck.checked)
//password+=generatelowercase();
//if(symbolscheck.checked)
//password+=generatesymbol();

//if(numberscheck.checked)
//password+=generaterandomnumber();
let funcArr=[];
if(lowercasecheck.checked){
    funcArr.push(generatelowercase());
}
if(numberscheck.checked){
    funcArr.push(generaterandomnumber());
}
if(uppercasecheck.checked){
    funcArr.push(generateuppercase());
}
if(symbolscheck.checked){
    funcArr.push(generatesymbol());
}
//compulsory Addition
console.log('compulsory addition done');
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i];
}
//remaining addition
console.log('remaining addition done');
for(let i=0;i<passwordlen-funcArr.length;i++){
    let ranindex=getrandomint(0,funcArr.length);
    password+=funcArr[ranindex];
}
//shuffle the password
console.log('shuffling done');
password=shufflepassword(Array.from(password));
//show in UI
passwordDisplay.value=password;
//strength
calcstrength();
});
