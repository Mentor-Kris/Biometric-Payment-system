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
// PROFILE MENU TOGGLE
// ===============================
function toggleMenu() {
  const menu = document.getElementById("menu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const profile = document.querySelector(".profile");

  if (menu && !profile.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});


// ===============================
// BIOMETRIC POPUP CONTROL
// ===============================
function openBiometric() {
  const popup = document.getElementById("bio-popup");
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("bio-popup");
  popup.style.display = "none";
}


// ===============================
// BIOMETRIC AUTHENTICATION FLOW
// ===============================
function authenticate() {
  const fingerprint = document.querySelector(".fingerprint");
  const popupText = document.querySelector(".popup-box p");

  // Step 1: scanning effect
  popupText.innerText = "Scanning fingerprint...";
  fingerprint.style.animation = "pulse 0.6s infinite";

  // Step 2: simulate scan delay
  setTimeout(() => {
    popupText.innerText = "Verifying biometric data...";

    setTimeout(() => {
      popupText.innerText = "Access Granted ✔";

      // Step 3: stop animation
      fingerprint.style.animation = "none";

      // Step 4: close popup + show balance
      setTimeout(() => {
        closePopup();
        showBalance();
      }, 800);

    }, 1000);

  }, 1200);
}


// ===============================
// BALANCE CONTROL
// ===============================
let isVisible = false;

function showBalance() {
  const balance = document.getElementById("balance");

  balance.innerText = "₹12,500"; // you can make dynamic later
  isVisible = true;
}


// ===============================
// OPTIONAL: HIDE AGAIN (IF NEEDED)
// ===============================
function hideBalance() {
  const balance = document.getElementById("balance");

  balance.innerText = "••••••";
  isVisible = false;
}