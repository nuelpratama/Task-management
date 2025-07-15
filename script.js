// Periksa apakah user sudah login
document.addEventListener('DOMContentLoaded', function() {
    // Cek user di sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Redirect ke halaman login jika belum login
        window.location.href = 'index.html';
        return;
    }
    
    // Tampilkan informasi user
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = currentUser.role;
    document.getElementById('user-avatar').textContent = 
        currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Fungsi dashboard lainnya tetap sama
    // ...
});