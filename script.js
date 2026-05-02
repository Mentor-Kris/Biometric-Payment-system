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
