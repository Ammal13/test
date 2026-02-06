// config.js - Client-side configuration and helpers

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = '618402076762-i48nl6v0rlarov55qt0fuoqpr3s4dgpr.apps.googleusercontent.com';

// Helper to decode JWT token (ID Token)
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Helper to check authentication
function checkAuth() {
    const isAuthenticated = localStorage.getItem('user_authenticated') === 'true';
    if (!isAuthenticated) {
        window.location.href = 'login.html';
        return null;
    }
    return {
        email: localStorage.getItem('user_email'),
        name: localStorage.getItem('user_name'),
        picture: localStorage.getItem('user_picture')
    };
}

// Helper to sign out
function signOut() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('user_authenticated');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_picture');
        localStorage.removeItem('login_time');
        window.location.href = 'login.html?logout=success';
    }
}
