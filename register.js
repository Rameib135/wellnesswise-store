document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // שמירת המשתמש החדש במערכת כאן (ניתן להשתמש ב-LocalStorage או ב-Database)

    window.location.href = "login.html";
});
