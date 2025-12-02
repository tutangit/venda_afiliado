
document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('login-form');
    
    // Check if already logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (session && window.location.pathname.includes('admin-login.html')) {
        window.location.href = 'admin-dashboard.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('error-message');
            
            errorMsg.textContent = 'Autenticando...';
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                errorMsg.textContent = 'Erro: ' + error.message;
            } else {
                window.location.href = 'admin-dashboard.html';
            }
        });
    }
});

// Logout function
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'admin-login.html';
    } else {
        alert('Erro ao sair: ' + error.message);
    }
}

// Protect Admin Routes
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'admin-login.html';
    }
}
