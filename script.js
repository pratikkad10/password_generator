const inputSlider=document.querySelector("[data-legnth-slider]");
const lengthDisplay=document.querySelector("[data-length-number]");
const passwordDisplay=document.querySelector("[data-display-password]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbol");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector("[generate-btn]");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password = "";
let dispPass="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//set color to strength kaa circle
setIndicator("#ccc")

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `1px 0px 15px ${color}`;
}

function getRadInt(min, max){
    let code = Math.floor(Math.random()*(max-min))+min;
    // let char = String.fromCharCode(code);                    ////to convert the number to character
    console.log(code);
    return code;
}

function getRndNumb(){
    return getRadInt(0,10);
}

function generatelowercase(){
    let code=getRadInt(97, 123);
    let char = String.fromCharCode(code);
    console.log(char);
    return char;
}


function generateUppercase(){
    let code=getRadInt(65, 91);
    let char = String.fromCharCode(code);
    console.log(char);
    return char;
}
const Symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "=", "+","<", ">", ".", "?","-"];

function generateSymbol(){
    let idx=getRadInt(0, Symbols.length);
    console.log(Symbols[idx]);
    return Symbols[idx];
}

function calStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hassymbol=false;

    if(uppercaseCheck.checked) hasupper=true;
    if(lowercaseCheck.checked) haslower=true;
    if(numbersCheck.checked) hasnumber=true;
    if(symbolCheck.checked) hassymbol=true;

    if(hasupper && haslower && (hasnumber || hassymbol) && passwordLength >=8) setIndicator("#0f0");
    else if((haslower || hasupper) && (hasnumber || hassymbol) && passwordLength >=6) setIndicator("#ff0");
    else setIndicator("#f00");
}

async function copyMessage(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    } catch(e){
        copyMsg.inner="failed"
    }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    }, 2000)
    
}


inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value) copyMessage();
})

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=> {
    checkbox.addEventListener('click', handleCheckBoxChange);
})

generateBtn.addEventListener('click', ()=>{
    if(checkCount==0) return;

    if(passwordLength  < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";
    dispPass="";

    // if(uppercaseCheck.checked) password += generateUppercase();
    // if(lowercaseCheck.checked) password += generatelowercase();
    // if(symbolCheck.checked) password += generateSymbol();
    // if(numbersCheck.checked) password += getRndNumb();

    let pass=[];
    if(uppercaseCheck.checked) pass.push(generateUppercase);
    if(lowercaseCheck.checked) pass.push(generatelowercase);
    if(symbolCheck.checked) pass.push(generateSymbol);
    if(numbersCheck.checked) pass.push(getRndNumb);

    for(let i=0; i<pass.length;i++){
        password += pass[i]();
    }

    for(let i=0; i<(passwordLength-pass.length); i++){
        let Ridx=getRadInt(0, pass.length);
        password += pass[Ridx]();
    }
    console.log("Password ",password)

    shuffle();
    passwordDisplay.value=dispPass;
    calStrength();
});

// function shuffle(){
    
//     for(let i=0; i<password.length; i++){
//         let Rval = getRadInt(0, password.length-1);
//         dispPass += password[Rval];
//     }

// }

function shuffle() {
    // Convert the password string into an array to shuffle it
    let array = password.split('');
    dispPass = "";  // Reset dispPass

    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        // Get a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements at index i and j
        [array[i], array[j]] = [array[j], array[i]];
    }

    // Join the shuffled array back into a string
    dispPass = array.join('');
    console.log("DispPass ",dispPass)
}
