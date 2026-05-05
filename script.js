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