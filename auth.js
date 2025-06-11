// Tambah akun admin default jika belum ada
(function ensureAdmin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (!users.some(u => u.username === "admin")) {
    users.push({
      nama: "Admin",
      username: "admin",
      email: "admin@pinjamsarana.com",
      password: "123",
      role: "admin"
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
})();

// Fungsi registrasi
function register(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("reg-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Cek apakah username sudah digunakan
  if (users.some(u => u.username === username)) {
    alert("Username sudah terdaftar!");
    return;
  }

  const newUser = {
    nama,
    username,
    email,
    password,
    role: "user" // Semua yang daftar lewat form akan menjadi user
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registrasi berhasil. Silakan login!");
  window.location.href = "login.html";
}

// Fungsi login
function login(event) {
  event.preventDefault();

  const username = document.getElementById("log-username").value;
  const password = document.getElementById("log-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (!foundUser) {
    alert("Username atau password salah!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
  alert("Login berhasil!");

  // Redirect sesuai role
  if (foundUser.role === "admin") {
    window.location.href = "dashboard_admin.html";
  } else {
    window.location.href = "dashboard_user.html"; // misal: dashboard user biasa
  }
}
