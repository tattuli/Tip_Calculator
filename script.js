"use strict";
const bill = document.querySelector("#billAmt");
const peopleNum = document.querySelector("#numPeople");
const percentCustom = document.querySelector("#customPercent");
const tipPersonAmt = document.querySelector("#tipPersonAmt");
const totalAmt = document.querySelector("#totalAmt");
const button = document.querySelector("button");
const percentBox = document.querySelector(".select-tip-grid");
const percentTip = document.querySelectorAll(".tip-percent-box");
const hidden = document.querySelector(".hidden");
const inputBoxP = document.querySelector(".input-box--people");
const billAmt = () => {
  return bill.value;
};

const numPeople = () => {
  return peopleNum.value;
};

const billPeople = () => {
  return billAmt() / numPeople();
};

const customTip = () => {
  return percentCustom.value / 100;
};

function money_round(num) {
  return Math.ceil(num * 100) / 100;
}

const calcTip = function (tip) {
  if (numPeople() >= 1) {
    let tipAmount = money_round((billAmt() * tip) / numPeople());
    let total = money_round(+billAmt() / numPeople() + tipAmount);
    tipPersonAmt.textContent = "$" + tipAmount.toFixed(2);
    totalAmt.textContent = "$" + total.toFixed(2);
  } else if (numPeople() == "") {
    let tipAmount = money_round(billAmt() * tip);
    let total = money_round(+billAmt() + tipAmount);
    tipPersonAmt.textContent = "$" + tipAmount.toFixed(2);
    totalAmt.textContent = "$" + total.toFixed(2);
  } else if (numPeople() <= 0) {
    hidden.style.opacity = 100;
    inputBoxP.style.border = "2px solid #e17457";
  }
};

percentBox.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tip-percent-box");
  percentTip.forEach((p) => p.classList.remove("tip-percent-box--active"));
  if (e.target.innerHTML == clicked.innerHTML) {
    clicked.classList.add("tip-percent-box--active");
    let tipValue = +clicked.value / 100;
    calcTip(`${tipValue}`);
  }
});
customPercent.addEventListener("input", () => {
  calcTip(customTip());
});
function reset() {
  tipPersonAmt.textContent = "$0.00";
  totalAmt.textContent = "$0.00";
  bill.value = "";
  peopleNum.value = "";
  percentCustom.value = "";
}
btnReset.addEventListener("click", reset);
