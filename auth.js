// Fungsi autentikasi
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');
    
    // Toggle antara form login dan register
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerCard.style.display = 'none';
        loginCard.style.display = 'block';
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validasi sederhana
        if (!username || !password) {
            showMessage('error', 'Silakan isi username dan password');
            return;
        }
        
        // Cek user di localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Simpan informasi user di sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect ke dashboard
            window.location.href = 'dashboard.html';
        } else {
            showMessage('error', 'Username atau password salah');
        }
    });
    
    // Handle register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const name = document.getElementById('reg-name').value;
        const role = document.getElementById('reg-role').value;
        
        // Validasi sederhana
        if (!username || !password || !name) {
            showMessage('error', 'Silakan isi semua field');
            return;
        }
        
        // Cek apakah username sudah ada
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usernameExists = users.some(u => u.username === username);
        
        if (usernameExists) {
            showMessage('error', 'Username sudah digunakan');
            return;
        }
        
        // Tambahkan user baru
        const newUser = {
            username,
            password,
            name,
            role
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('success', 'Pendaftaran berhasil! Silakan login');
        
        // Setelah 2 detik, tampilkan form login
        setTimeout(() => {
            registerCard.style.display = 'none';
            loginCard.style.display = 'block';
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
        }, 2000);
    });
    
    function showMessage(type, text) {
        // Buat elemen pesan jika belum ada
        let messageElement = document.querySelector('.message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'message';
            document.querySelector('.login-card').insertBefore(messageElement, loginForm);
        }
        
        // Setel pesan
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        
        // Sembunyikan pesan setelah 3 detik
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }
});