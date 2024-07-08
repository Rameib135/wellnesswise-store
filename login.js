document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // ביצוע בדיקות כניסה כאן

    // אם הכניסה מוצלחת
    document.cookie = "user=" + email + "; path=/; max-age=" + 24*60*60;
    window.location.href = "index.html";
});

window.onload = function() {
    if (document.cookie.includes('user=')) {
        window.location.href = "index.html";
    }
};
