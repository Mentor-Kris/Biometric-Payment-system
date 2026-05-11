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
    const mobile =
localStorage.getItem("mobile");

localStorage.setItem(
"userMobile",
mobile
);
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
  // =========================
// CHECK BALANCE SCAN
// =========================

if(window.checkingBalance){

  document.getElementById("bio-popup").style.display =
  "none";

  document.getElementById("balancePopup").style.display =
  "flex";

  window.checkingBalance = false;

  return;
}
 if(window.balanceMode){

  document.getElementById("bio-popup").style.display =
  "none";

  const balanceText =
  document.getElementById("balance");

  const eye =
  document.querySelector(".eye");

  // SHOW BALANCE

  balanceText.innerText =
  "₹" + balance.toLocaleString();

  eye.className =
  "ri-eye-off-line eye";

  // AUTO HIDE

  setTimeout(() => {

    balanceText.innerText =
    "● ● ● ● ● ●";

    eye.className =
    "ri-eye-line eye";

  }, 8000);

  window.balanceMode = false;

  return;
}

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
  sendMoney(Number(currentAmount));
  addToHistory();
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

  const item =
  button.closest(".activity-item");

  // GET AMOUNT

  const amountText =
  item.querySelector("h3").innerText;

  // REMOVE -₹

  const amount =
  Number(
    amountText
    .replace("-₹","")
    .replace(",","")
  );

  // REMOVE FROM DEBIT

  totalDebit -= amount;

  if(totalDebit < 0){

    totalDebit = 0;
  }

  // RETURN MONEY TO BALANCE

  balance += amount;

  // UPDATE UI

  updateBalanceUI();

  // REMOVE HISTORY

  item.remove();
}
/* clear all */

function clearHistory(){

  document.getElementById("activityList").innerHTML = "";
}
function addToHistory(){

  const activity =
  document.getElementById("activityList");

  let initials =
  currentName
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  const now = new Date();

  const time =
  now.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit"
  });

  // save receipt data

  const item =
  document.createElement("div");

  item.className =
  "activity-item";

  // save custom data

  item.setAttribute("data-name", currentName);

  item.setAttribute("data-mobile", currentMobile);

  item.setAttribute("data-amount", currentAmount);

  item.setAttribute(
    "data-time",
    document.getElementById("receiptTime").innerText
  );

  item.setAttribute(
    "data-date",
    document.getElementById("receiptDate").innerText
  );

  item.setAttribute(
    "data-transaction",
    document.getElementById("transactionId").innerText
  );

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

      <button class="view-btn"
      onclick="viewReceipt(this)">
        View
      </button>

      <button class="delete-btn"
      onclick="deleteHistory(this)">
        Delete
      </button>

    </div>

  `;

  activity.prepend(item);
}
function viewReceipt(button){

  const item =
  button.closest(".activity-item");

  // get saved data

  const name =
  item.getAttribute("data-name");

  const mobile =
  item.getAttribute("data-mobile");

  const amount =
  item.getAttribute("data-amount");

  const date =
  item.getAttribute("data-date");

  const time =
  item.getAttribute("data-time");

  const transaction =
  item.getAttribute("data-transaction");

  // initials

  let initials =
  name
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // update receipt

  document.getElementById("receiptAmount").innerText =
  "₹" + amount;

  document.getElementById("receiverName").innerText =
  name;

  document.getElementById("receiptUser").innerText =
  mobile;

  document.getElementById("receiptDate").innerText =
  date;

  document.getElementById("receiptTime").innerText =
  time;

  document.getElementById("transactionId").innerText =
  transaction;

  document.getElementById("receiverAvatar").innerText =
  initials;

  // show popup

  document.getElementById("receiptPopup").style.display =
  "flex";
}
// OPEN BALANCE

function openBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "flex";
}

// CLOSE BALANCE

function closeBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "none";
}
// =========================
// CHECK BALANCE POPUP
// =========================

function openBalancePopup(){

  // open biometric first

  window.checkingBalance = true;

  document.getElementById("bio-popup").style.display =
  "flex";
}

function closeBalancePopup(){

  document.getElementById("balancePopup").style.display =
  "none";
}
function openBalanceBiometric(){

  const balance =
  document.getElementById("balance");

  const eye =
  document.querySelector(".eye");

  // IF ALREADY VISIBLE -> HIDE

  if(balance.innerText !== "● ● ● ● ● ●"){

    balance.innerText =
    "● ● ● ● ● ●";

    eye.className =
    "ri-eye-line eye";

    return;
    updateBalanceUI();
  }

  // OTHERWISE OPEN BIOMETRIC

  window.balanceMode = true;

  document.getElementById("bio-popup").style.display =
  "flex";
}
// =========================
// OPEN QR
// =========================

function openQRPopup(){
document.getElementById("qrPopup").style.display = "flex";
  // USER DATA

  let username =
  "Kris Bhanderi";

  let upi =
  "kris@biopay";

  // INITIALS

  let initials =
  username
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // AVATAR

  document.getElementById("qrAvatar").innerText =
  initials;

  // CENTER LOGO

  document.getElementById("centerLogo").innerText =
  username.charAt(0).toUpperCase();

  // NAME

  document.getElementById("qrName").innerText =
  username;

  // USERNAME

  document.getElementById("qrUsername").innerText =
  "@" + upi;

  // UPI ID

  document.getElementById("upiId").innerText =
  upi;

  // QR DATA

  let qrData =
  `upi://pay?pa=${upi}&pn=${username}`;

  // REAL QR

  const qrImage =
document.getElementById("realQR");

qrImage.src =
"https://api.qrserver.com/v1/create-qr-code/?size=260x260&data="
+ encodeURIComponent(qrData);

qrImage.onerror = function(){

  this.src =
  "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=BioPay";
};
}
/* CLOSE POPUP */

function closeQRPopup(){

  document.getElementById("qrPopup").style.display =
  "none";
}

// =========================
// COPY UPI
// =========================

function copyUPI(){

  let text =
  document.getElementById("upiId").innerText;

  navigator.clipboard.writeText(text);

  alert("UPI ID Copied");
}

// =========================
// SHARE QR
// =========================

async function shareQR(){

  const qrImage =
  document.getElementById("realQR");

  const response =
  await fetch(qrImage.src);

  const blob =
  await response.blob();

  const file =
  new File(
    [blob],
    "BioPayQR.png",
    { type:"image/png" }
  );

  // native share

  if(navigator.canShare &&
     navigator.canShare({ files:[file] })){

    await navigator.share({

      title:"Bio-Pay QR",

      text:"Scan this QR to pay me",

      files:[file]

    });

  }else{

    alert(
    "QR sharing works on mobile devices/browser."
    );
  }
}
/* =========================
OPEN QR
========================= */

function openQRPopup(){

  document.getElementById("qrPopup").style.display =
  "flex";

  // USER DATA

  let username =
  "Kris Bhanderi";

  let upi =
  "kris@biopay";

  // INITIALS

  let initials =
  username
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // USER

  document.getElementById("qrAvatar").innerText =
  initials;

  document.getElementById("centerLogo").innerText =
  username.charAt(0).toUpperCase();

  document.getElementById("qrName").innerText =
  username;

  document.getElementById("qrUsername").innerText =
  "@" + upi;

  document.getElementById("upiId").innerText =
  upi;

  // QR

  let qrData =
  `upi://pay?pa=${upi}&pn=${username}`;

  document.getElementById("realQR").src =
  "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data="
  + encodeURIComponent(qrData);
}

/* =========================
CLOSE
========================= */

function closeQRPopup(){

  document.getElementById("qrPopup").style.display =
  "none";
}

/* =========================
COPY
========================= */

function copyUPI(){

  let text =
  document.getElementById("upiId").innerText;

  navigator.clipboard.writeText(text);

  alert("UPI ID Copied");
}

/* =========================
CREATE QR CARD
========================= */

async function createQRCard(){

  let username =
  document.getElementById("qrName").innerText;

  let upi =
  document.getElementById("upiId").innerText;

  let qr =
  document.getElementById("realQR").src;

  let initials =
  username
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  // CANVAS

  const canvas =
  document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 980;

  const ctx =
  canvas.getContext("2d");

  // BACKGROUND

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(
  0,
  0,
  800,
  980
  );

  // USER LOGO

  const gradient =
  ctx.createLinearGradient(
  0,
  0,
  200,
  200
  );

  gradient.addColorStop(
  0,
  "#2563eb"
  );

  gradient.addColorStop(
  1,
  "#60a5fa"
  );

  ctx.beginPath();

  ctx.fillStyle =
  gradient;

  ctx.arc(
  400,
  120,
  80,
  0,
  Math.PI * 2
  );

  ctx.fill();

  // INITIALS

  ctx.fillStyle =
  "white";

  ctx.font =
  "bold 60px Arial";

  ctx.textAlign =
  "center";

  ctx.fillText(
  initials,
  400,
  140
  );

  // NAME

  ctx.fillStyle =
  "#071a52";

  ctx.font =
  "bold 52px Arial";

  ctx.fillText(
  username,
  400,
  290
  );

  // UPI

  ctx.fillStyle =
  "#64748b";

  ctx.font =
  "36px Arial";

  ctx.fillText(
  "@" + upi,
  400,
  345
  );

  // QR BOX

  ctx.fillStyle =
  "#ffffff";

  roundRect(
  ctx,
  180,
  410,
  440,
  440,
  30,
  true
  );

  ctx.lineWidth = 4;

  ctx.strokeStyle =
  "#dbeafe";

  ctx.stroke();

  // QR IMAGE

  const qrImg =
  new Image();

  qrImg.crossOrigin =
  "anonymous";

  qrImg.src = qr;

  await new Promise(resolve=>{
      qrImg.onload = resolve;
  });

  ctx.drawImage(
  qrImg,
  220,
  450,
  360,
  360
  );

  // CENTER LOGO

  ctx.beginPath();

  ctx.fillStyle =
  "white";

  ctx.shadowColor =
  "rgba(0,0,0,.15)";

  ctx.shadowBlur = 20;

  ctx.arc(
  400,
  630,
  60,
  0,
  Math.PI * 2
  );

  ctx.fill();

  ctx.shadowBlur = 0;

  // CENTER LETTER

  ctx.fillStyle =
  "#2563eb";

  ctx.font =
  "bold 52px Arial";

  ctx.fillText(
  username.charAt(0).toUpperCase(),
  400,
  650
  );
/* BOTTOM TEXT */

ctx.fillStyle =
"#64748b";

ctx.font =
"32px Arial";

ctx.textAlign =
"center";

ctx.fillText(
"Scan to pay with any UPI app",
400,
930
);
return canvas;
}
/* =========================
ROUND RECTANGLE
========================= */

function roundRect(
ctx,
x,
y,
width,
height,
radius,
fill
){

  ctx.beginPath();

  ctx.moveTo(x + radius, y);

  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
  x + width,
  y,
  x + width,
  y + radius
  );

  ctx.lineTo(
  x + width,
  y + height - radius
  );

  ctx.quadraticCurveTo(
  x + width,
  y + height,
  x + width - radius,
  y + height
  );

  ctx.lineTo(
  x + radius,
  y + height
  );

  ctx.quadraticCurveTo(
  x,
  y + height,
  x,
  y + height - radius
  );

  ctx.lineTo(
  x,
  y + radius
  );

  ctx.quadraticCurveTo(
  x,
  y,
  x + radius,
  y
  );

  ctx.closePath();

  if(fill){
    ctx.fill();
  }
}

/* =========================
SHARE QR
========================= */

async function shareQR(){

  const canvas =
  await createQRCard();

  canvas.toBlob(async function(blob){

    const file =
    new File(
    [blob],
    "BioPayQR.png",
    {type:"image/png"}
    );

    await navigator.share({

      title:"BioPay QR",

      files:[file]

    });

  });
}

/* =========================
DOWNLOAD QR
========================= */

async function downloadQR(){

  const canvas =
  await createQRCard();

  const link =
  document.createElement("a");

  link.download =
  "BioPayQR.png";

  link.href =
  canvas.toDataURL();

  link.click();
}
/* =========================
CUSTOMIZE QR
========================= */

function changeQRColor(){

  let colors = [

    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#f97316",
    "#e11d48"

  ];

  let randomColor =
  colors[Math.floor(
  Math.random() * colors.length
  )];

  document.querySelector(
  ".real-qr-box"
  ).style.borderColor =
  randomColor;

  document.querySelector(
  ".upi-user-logo"
  ).style.background =
  randomColor;
}
/* CUSTOM QR IMAGE */

function uploadQRLogo(event){

  const file =
  event.target.files[0];

  if(!file) return;

  const reader =
  new FileReader();

  reader.onload = function(e){

    // CENTER LOGO

    const centerLogo =
    document.querySelector(
    ".qr-center-logo"
    );

    // REMOVE LETTER

    centerLogo.innerHTML = "";

    // CREATE IMAGE

    const img =
    document.createElement("img");

    img.src =
    e.target.result;

    img.style.width =
    "45px";

    img.style.height =
    "45px";

    img.style.objectFit =
    "cover";

    img.style.borderRadius =
    "50%";

    // ADD IMAGE

    centerLogo.appendChild(img);
  };

  reader.readAsDataURL(file);
}
/* BALANCE SYSTEM */

let balance = 0;

let totalCredit = 0;

let totalDebit = 0;

/* UPDATE UI */

function updateBalanceUI(){

document.getElementById(
"balance"
).innerText =
"₹" + balance.toLocaleString();

document.getElementById(
"creditAmount"
).innerText =
"+₹" + totalCredit.toLocaleString();

document.getElementById(
"debitAmount"
).innerText =
"-₹" + totalDebit.toLocaleString();
}

/* RECEIVE PAYMENT */

function receiveMoney(amount){

balance += amount;

totalCredit += amount;

updateBalanceUI();
}

/* SEND PAYMENT */

function sendMoney(amount){

balance -= amount;

totalDebit += amount;

updateBalanceUI();
}
function openSettings(){

alert("Settings Opening...");

}
function openSettings(){

  alert("Opening Settings & Devices");

}
function openSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "flex";

}

function closeSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "none";

}
/* SETTINGS POPUP */

function openSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "flex";

}

function closeSettingsPopup(){

document.getElementById(
"settingsPopup"
).style.display = "none";

}

/* SETTINGS FUNCTIONS */

function openProfileSettings(){

alert("Opening Profile");

}

function openSecurity(){

alert("Opening Security Center");

}

function openNotifications(){

alert("Opening Payment Alerts");

}

function openAbout(){

alert("Bio-Pay v1.0");

}

function openHelp(){

alert("Opening Help & Support");

}

function signOut(){

alert("Signing Out...");

}

/* DARK MODE */

function toggleDarkMode(){

document.body.classList.toggle(
"dark-mode"
);

}
/* =================================
   PROFILE PAGE
================================= */

function openProfilePage(){

document.getElementById(
"profilePage"
).style.display = "flex";

}

/* =================================
   SECURITY PAGE
================================= */

function openSecurityPage(){

document.getElementById(
"securityPage"
).style.display = "flex";

}

/* =================================
   ALERT PAGE
================================= */

function openAlertsPage(){

document.getElementById(
"alertsPage"
).style.display = "flex";

}

/* =================================
   CLOSE PAGE
================================= */

function closePage(id){

document.getElementById(id)
.style.display = "none";

}
/* =========================
   PROFILE USER DATA
========================= */

window.addEventListener(
"load",
function(){

const savedMobile =
localStorage.getItem(
"userMobile"
);

if(savedMobile){

const mobileText =
document.getElementById(
"profileMobile"
);

if(mobileText){

mobileText.innerText =
savedMobile;
}

}

});