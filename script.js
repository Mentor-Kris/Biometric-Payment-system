// ===============================
// ICON INIT
// ===============================
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

// ===============================
// DROPDOWN MENU
// ===============================
const avatar = document.getElementById("avatar");
const menu = document.getElementById("menu");

if (avatar && menu) {
  avatar.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
}

// ===============================
// MOBILE INPUT (ONLY NUMBERS)
// ===============================
const mobileInput = document.getElementById("mobile");

if (mobileInput) {
  mobileInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");
    if (v.length > 10) v = v.slice(0, 10);
    this.value = v;
  });
}

// VERIFY NUMBER (generate OTP once)
function verifyNumber() {
  let mobile = document.getElementById("mobile").value;

  mobile = mobile.replace(/\D/g, "");

  if (mobile.length !== 10) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  // ✅ ONLY store mobile
  localStorage.setItem("mobile", mobile);

  // ❌ NO OTP HERE

  // redirect
  window.location.href = "otp.html";
}
// CHECK OTP
function checkOTP() {
  const entered = document.getElementById("otpInput").value;
  const real = localStorage.getItem("otp");

  if (entered === real) {
    alert("Login Successful ✅");
    window.location.href = "home.html";
  } else {
    alert("Wrong OTP ❌");
  }
}

// LOGOUT

function logout() {
  localStorage.clear();
  alert("Logged out");
  window.location.href = "index.html";
}

// ===============================
// ACTIVE CARD SWITCH
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const actions = document.querySelectorAll(".action");

  actions.forEach((card) => {
    card.addEventListener("click", () => {
      actions.forEach(c => c.classList.remove("active-card"));
      card.classList.add("active-card");
    });
  });
});
let balanceVisible = false;

function toggleBalance() {
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  if (!balanceVisible) {
    // show real balance
    balance.innerText = balance.getAttribute("data-real");
    eye.className = "ri-eye-off-line eye";
    balanceVisible = true;
  } else {
    // show PIN dots
    balance.innerText = "● ● ● ● ● ●";
    eye.className = "ri-eye-line eye";
    balanceVisible = false;
  }
}
// ===============================
// OPEN PIN POPUP
// ===============================
function openPinPopup() {
  document.getElementById("pinPopup").style.display = "block";
}

// ===============================
// PIN BALANCE CONTROL
// ===============================
let isUnlocked = false;

function toggleBalancePin() {
  if (!isUnlocked) {
    openPinPopup();
  } else {
    hideBalancePin();
  }
}

function checkPin() {
  const pin = document.getElementById("pinInput").value;
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  if (pin === "1234") {
    balance.innerText = "₹12,500";
    eye.className = "ri-eye-off-line eye";

    isUnlocked = true;

    document.getElementById("pinPopup").style.display = "none";
  } else {
    alert("Wrong PIN ❌");
  }
}

function hideBalancePin() {
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  balance.innerText = "● ● ● ● ● ●";
  eye.className = "ri-eye-line eye";

  isUnlocked = false;
}

function openPinPopup() {
  const popup = document.getElementById("pinPopup");
  popup.style.display = "flex";   // 🔥 important
}
window.onload = () => {
  const balance = document.getElementById("balance");
  const eye = document.querySelector(".eye");

  if (balance && eye) {
    // always start hidden
    balance.innerText = "● ● ● ● ● ●";
    eye.className = "ri-eye-line eye";
  }

  isUnlocked = false;
};
// ===============================
// PAYMENT FLOW
// ===============================

let currentMobile = "";
let currentAmount = "";
let currentName = "";
// OPEN PAY POPUP

function openPayPopup(){

  document.getElementById("mobileInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("messageInput").value = "";

  document.getElementById("paymentError").style.display =
  "none";

  document.getElementById("payPopup").style.display =
  "flex";
}


// CLOSE PAY POPUP

function closePayPopup(){

  document.getElementById("payPopup").style.display =
  "none";
}


// SEND PAYMENT

function sendPayment(){
  const name =
  document.getElementById("nameInput").value.trim();

  const mobile =
  document.getElementById("mobileInput").value.trim();

  const amount =
  document.getElementById("amountInput").value.trim();

  const error =
  document.getElementById("paymentError");

  // validation

  if(name === "" || mobile === "" || amount === ""){

    error.style.display = "block";

    error.innerText =
    "Please fill all required fields";

    return;
  }
 
  if(mobile.length !== 10){

    error.style.display = "block";

    error.innerText =
    "Enter valid 10 digit mobile number";

    return;
  }
  currentName = name;
  currentMobile = mobile;
  currentAmount = amount;

  document.getElementById("payPopup").style.display =
  "none";

  document.getElementById("bio-popup").style.display =
  "flex";
}


// AUTHENTICATE PAYMENT

function authenticate(){

  document.getElementById("bio-popup").style.display =
  "none";

  const now = new Date();

  const date =
  now.toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
  });

  const time =
  now.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit"
  });

  const txn =
  "#BP" + Math.floor(Math.random()*999999);

  document.getElementById("receiptAmount").innerText =
  "₹" + currentAmount;

  document.getElementById("receiptUser").innerText =
  "Paid to " + currentMobile;

 document.getElementById("receiverName").innerText =
currentName;
// avatar letters

let initials =
currentName
.split(" ")
.map(word => word[0])
.join("")
.toUpperCase();

document.getElementById("receiverAvatar").innerText =
initials;

  document.getElementById("receiptDate").innerText =
  date;

  document.getElementById("receiptTime").innerText =
  time;

  document.getElementById("transactionId").innerText =
  txn;

  document.getElementById("receiptPopup").style.display =
  "flex";
}


// CLOSE BIOMETRIC

function closePopup(){

  document.getElementById("bio-popup").style.display =
  "none";
}


// CLOSE RECEIPT

function closeReceipt(){

  document.getElementById("receiptPopup").style.display =
  "none";
}


// SHARE TO WHATSAPP

function shareWhatsApp(){

  let amount =
  document.getElementById("receiptAmount").innerText;

  let user =
  document.getElementById("receiptUser").innerText;

  let txn =
  document.getElementById("transactionId").innerText;

  let text =
`Bio-Pay Payment Receipt

${user}

Amount: ${amount}

Status: Completed

Transaction ID: ${txn}

Paid Securely via Bio-Pay Fingerprint`;

  let url =
`https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url,"_blank");
}
// =========================
// SAVE PAYMENT HISTORY
// =========================

function addToHistory(){

  const activity =
  document.getElementById("activityList");

  // initials

  let initials =
  currentName
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // current time

  const now = new Date();

  const time =
  now.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit"
  });

  // item

  const item =
  document.createElement("div");

  item.className =
  "activity-item";

  item.innerHTML = `

    <div class="activity-left">

      <div class="activity-avatar">
        ${initials}
      </div>

      <div class="activity-info">

        <h4>${currentName}</h4>

        <p>${currentMobile} • ${time}</p>

      </div>

    </div>

    <div class="activity-amount">

      <h3>-₹${currentAmount}</h3>

      <button class="delete-btn"
      onclick="deleteHistory(this)">
        Delete
      </button>

    </div>

  `;

  // newest first

  activity.prepend(item);
}

/* delete single */

function deleteHistory(button){

  button
  .parentElement
  .parentElement
  .remove();
}

/* clear all */

function clearHistory(){

  document.getElementById("activityList").innerHTML = "";
}