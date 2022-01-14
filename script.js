let clear = document.querySelector("#clearbtn");
let deletebtn = document.querySelector("#deletebtn");


// let operations = document.querySelector("#operations");
let answer = document.querySelector("#answer");

let numbers = document.querySelectorAll(".numbers");
let symbols = document.querySelectorAll(".symbols");

let btns = document.querySelectorAll("button");

(Array.from(btns)).forEach(btn => {
    btn.addEventListener("click", () => {
        let audio = document.querySelector("audio");
        audio.currentTime= 0;
        audio.play();
    })
})


function roundNumber(num, scale) {
    if(!("" + num).includes("e")) {
      answer.textContent = +(Math.round(num + "e+" + scale)  + "e-" + scale);

    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      answer.textContent = +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  }


function add(a, b) {
    answer.textContent = a + b;
    if (answer.textContent.length > 10) {
        if (answer.textContent.includes(".")) {
         roundNumber(parseFloat(answer.textContent), (10 - answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf(".") + 1).length))
        }
    }
}

function subtract(a, b) {
    answer.textContent = a - b;
    if (answer.textContent.length > 10) {
        if (answer.textContent.includes(".")) {
            roundNumber(parseFloat(answer.textContent), (10 - answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf(".") + 1).length))

        }
    }
}

function multiply(a, b) {
    answer.textContent = a * b;
    if (answer.textContent.length > 10) {
        if (answer.textContent.includes(".")) {
            roundNumber(parseFloat(answer.textContent), (10 - answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf(".") + 1).length))

        }
    }
}

function divide(a, b) {
    answer.textContent = a / b;
    if (answer.textContent == "Infinity") {
            alert("YOOO YOU KNOW U CANT DIVIDE BY 0 RIGHT??")
            answer.textContent = 0;
    }
    if (answer.textContent.length > 10) {
        if (answer.textContent.includes(".")) {
            roundNumber(parseFloat(answer.textContent), (10 - answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf(".") + 1).length))

        }
    }
}




(Array.from(numbers)).forEach(number => {
    number.addEventListener("click", () => {
        if(/\.[0-9]$/.test(answer.textContent.split("").splice(-2, 2, -1).join(""))) {
            console.log("no more number");
        } else if (number.innerText == 1 || number.innerText == 2 || number.innerText == 3 || number.innerText == 4 || number.innerText == 5 || number.innerText == 6 || number.innerText == 7 || number.innerText == 8 || number.innerText == 9) {
            if (answer.textContent == 0 && answer.textContent.length == 1) {
                    answer.textContent = "";
            } 

            answer.textContent += number.innerText;
           
        } else if(number.innerText == ".") {
            if (answer.textContent.includes(".")) {
            } else {
                answer.textContent += number.innerText
            }
        } else if (number.innerText == 0) {
            if (answer.textContent == 0) {
                answer.textContent = 0;
            } else {
                answer.textContent += number.innerText;
            }
        } else if (number.innerText == "+/-") {
            if (answer.textContent == 0) {
                answer.textContent = 0;
            } else if (answer.textContent.split("").splice(0, 1) == "-") {
                answer.textContent = answer.textContent.split("").splice(1).join("");
            } else {
                let arr = (answer.textContent.split(""));
                arr.unshift("-")
                answer.textContent = arr.join("");

            }
        } 
    })
});


clear.addEventListener("click", function() {
        answer.textContent = '0';
        // operations.textContent = '';
});

deletebtn.addEventListener("click", function() {
    if (answer.textContent == 0) {
        answer.textContent = "0";
    } else if (answer.textContent.split("").length == 1) {
        answer.textContent = "0";
    } else if((answer.textContent.split(""))[0] == "-" && (answer.textContent.length == 2)) {
        answer.textContent = "0";
    } else {
        let array = answer.textContent.split("");
        array.splice(-1)
        answer.textContent = array.join("");
    }
});

(Array.from(symbols)).forEach(symbol => {
    symbol.addEventListener("click", () => {
        if (answer.textContent.split("").splice(-1) == "x" || answer.textContent.split("").splice(-1) == "+" || answer.textContent.split("").splice(-1) == "÷" || answer.textContent.split("").splice(-1) == "-") {
        } else if(answer.textContent.includes("x")) {
            let a = answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf("x")).join("");
            let b = answer.textContent.split("").slice(((answer.textContent.split("")).indexOf("x"))+1).join("");
            multiply(a, b);
            if (!(symbol.innerText == "=")) {
                answer.textContent = answer.textContent + symbol.innerText;
            }
        } else if(answer.textContent.includes("÷")) {
            let a = answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf("÷")).join("");
            let b = answer.textContent.split("").slice(((answer.textContent.split("")).indexOf("÷"))+1).join("");;
            divide(a, b);
            if (!(symbol.innerText == "=")) {
                answer.textContent = answer.textContent + symbol.innerText;
            }
        } else if(answer.textContent.includes("+")) {
            let a = parseFloat(answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf("+")).join(""));
            let b = parseFloat(answer.textContent.split("").slice(((answer.textContent.split("")).indexOf("+"))+1).join(""));
            add(a, b);
            if (!(symbol.innerText == "=")) {
                answer.textContent = answer.textContent + symbol.innerText;
            }
        } else if(answer.textContent.includes("-") && (!(answer.textContent.split("").splice(0, 1) == "-"))) {
            let a = answer.textContent.split("").slice(0, (answer.textContent.split("")).indexOf("-")).join("");
            let b = answer.textContent.split("").slice(((answer.textContent.split("")).indexOf("-"))+1).join("");;
            subtract(a, b);
            if (!(symbol.innerText == "=")) {
                answer.textContent = answer.textContent + symbol.innerText;
            }
        } else if(!(symbol.innerText == "=")) {
            console.log("symbol");
            answer.textContent = answer.textContent + symbol.innerText;
        }
    })
});

