let display = document.getElementById("display");
let result = document.getElementById("result");
let userIn = null; // Track logged-in user

// Toggle class
function load() {
  const element = document.getElementById("info");
  element.classList.toggle("hidden"); 
}

function apend(enter){
    display.value += enter;
}
function clearDisplay(){
    display.value = "";
}

// atm users data
let InfoObj =[ {
    name: "Biodun Alade",
    email: "biodunalade@gmail.com",
    phone: "0712345678",
    phone: "1234567890",
    balance: 10000,
    pin: "1234",
    acctNumber: "0234567890"
},
{
    name: "Oyewole Oluwasegun",
    email: "oyewoleoluwasegun@gmail.com",
    phone: "0798765432",
    phone: "9876543210",
    balance: 5000,
    pin: "4321",
    acctNumber: "1234567890"
},
{
    name: "Mayowa Shade",
    email: "mayowashade@gmail.com",
    phone: "0711111111",
    phone: "1111111111",
    balance: 20000,
    pin: "5678",
    acctNumber: "2345678901"
},
{
    name: "Fiyin Opeyemi",
    email: "fiyinopeyemi@gmail.com",
    phone: "0722222222",
    phone: "2222222222",
    balance: 15000,
    pin: "1111",
    acctNumber: "3456789012"
},
{
    name: "Yemi Alade",
    email: "yemialade@gmail.com",
    phone: "0733333333",
    phone: "3333333333",
    balance: 30000,
    pin: "9876",
    acctNumber: "4567890123"
}
];

// atm start function
function startAccess(){
    result.innerHTML = "Please enter your 4-digit PIN to access the ATM.";
    display.value = "";
   userIn = null;
}


// atm function
function atm(){
    if(userIn === null){
        result.innerHTML = "Please login first.";
        return;
    }
    let choice = display.value;
    switch(choice){
        case "withdraw":
            result.innerHTML = "Enter amount to withdraw, then press Enter.";
            display.value = "";
            window.nextAction = "withdraw";
            break;
        case "deposit":
            result.innerHTML = "Enter amount to deposit, then press Enter.";
            display.value = "";
            window.nextAction = "deposit";
            break;
        case "balance":
            result.innerHTML = "Current balance: " + InfoObj[userIn].balance;
            display.value = "";
            window.nextAction = null;
            break;
        case "loan":
            result.innerHTML = "Enter amount to loan, then press Enter.";
            display.value = "";
            window.nextAction = "loan";
            break;
        default:
            result.innerHTML = "Invalid choice. Please try again.";
            display.value = "";
            window.nextAction = null;
    }
}

// Enter button now handles next action
function enter(){
    if(userIn === null){
        //login
        let pin = display.value;
        for(let i=0; i<InfoObj.length; i++){
            if(InfoObj[i].pin == pin){
                result.innerHTML = "Access successful. Welcome " + InfoObj[i].name + "! Click on the yellow button to continue.";
                display.value = "";
               userIn = i;
                window.nextAction = null;
                return;
            }
        }
        result.innerHTML = "Invalid access credentials. Please try again.";
        display.value = "";
        return;
    }
    // atm actions
    if(window.nextAction === "withdraw"){
        let amount = Number(display.value);
        if(amount > InfoObj[userIn].balance){
            result.innerHTML = "Insufficient balance.";
        }else{
            InfoObj[userIn].balance -= amount;
            result.innerHTML = "Withdrawal successful. New balance: " + InfoObj[userIn].balance;
        }
        display.value = "";
        window.nextAction = null;
    }else if(window.nextAction === "deposit"){
        let amount = Number(display.value);
        InfoObj[userIn].balance += amount;
        result.innerHTML = "Deposit successful. New balance: " + InfoObj[userIn].balance;
        display.value = "";
        window.nextAction = null;
    }else if(window.nextAction === "loan"){
        let amount = Number(display.value);
        if(amount > InfoObj[userIn].balance){
            result.innerHTML = "Insufficient balance for loan.";
        }else{
            InfoObj[userIn].balance -= amount;
            result.innerHTML = "Loan successful. New balance: " + InfoObj[userIn].balance;
        }
        display.value = "";
        window.nextAction = null;
    }else{
        atm(); // Handle choice
    }
}

// atm end function
function stopAccess(){
    result.innerHTML = "Thank you for using the ATM. Goodbye!";
    display.value = "";
   userIn = null;
    window.nextAction = null;
}