import { 
    db, 
    collection, 
    addDoc,
    doc,
    getDoc,
    auth,
    provider,
    signInWithPopup,
    signOut
} from './firebase-init.js';

async function isAllowedUser(email) {
    const docRef = doc(db, "allowed-emails", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-link-form');
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Sign in with Google';
    loginButton.className = 'login-button';
    document.querySelector('.admin-container').prepend(loginButton);

    // Handle authentication state
    auth.onAuthStateChanged(async user => {
        if (user) {
            const allowed = await isAllowedUser(user.email);
            if (allowed) {
                loginButton.textContent = 'Sign out';
                form.style.display = 'block';
            } else {
                await signOut(auth);
                alert('Access denied. Your email is not authorized.');
                form.style.display = 'none';
            }
        } else {
            loginButton.textContent = 'Sign in with Google';
            form.style.display = 'none';
        }
    });

    // Handle login/logout
    loginButton.addEventListener('click', async () => {
        if (auth.currentUser) {
            await signOut(auth);
        } else {
            try {
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.error('Authentication error:', error);
                alert('Error signing in. Please try again.');
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!auth.currentUser) {
            alert('Please sign in to add links');
            return;
        }
        
        const name = document.getElementById('link-name').value;
        const url = document.getElementById('link-url').value;
        const icon = document.getElementById('link-icon').value;
        
        try {
            await addDoc(collection(db, "links"), {
                name,
                url,
                icon,
                addedBy: auth.currentUser.email,
                timestamp: new Date()
            });
            
            alert('Link added successfully!');
            form.reset();
        } catch (error) {
            console.error('Error adding link: ', error);
            alert('Error adding link. Please try again.');
        }
    });
});