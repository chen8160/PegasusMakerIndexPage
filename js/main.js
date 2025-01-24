import { 
    db, 
    collection, 
    getDocs,
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
    const linksContainer = document.getElementById('links-container');
    const loginButton = document.getElementById('login-button');
    
    // Handle authentication state
    auth.onAuthStateChanged(async user => {
        if (user) {
            const allowed = await isAllowedUser(user.email);
            if (allowed) {
                loginButton.textContent = 'Sign out';
                try {
                    const querySnapshot = await getDocs(collection(db, "links"));
                    linksContainer.innerHTML = ''; // Clear existing content
                    
                    querySnapshot.forEach((doc) => {
                        const link = doc.data();
                        const linkCard = document.createElement('a');
                        linkCard.className = 'link-card';
                        linkCard.href = link.url;
                        linkCard.target = '_blank';
                        
                        const icon = document.createElement('img');
                        icon.src = link.icon;
                        icon.alt = `${link.name} icon`;
                        
                        const title = document.createElement('h2');
                        title.textContent = link.name;
                        
                        linkCard.appendChild(icon);
                        linkCard.appendChild(title);
                        linksContainer.appendChild(linkCard);
                    });
                } catch (error) {
                    console.error('Error loading links:', error);
                    linksContainer.innerHTML = '<p>Error loading links. Please try again later.</p>';
                }
            } else {
                await signOut(auth);
                alert('Access denied. Your email is not authorized.');
                linksContainer.innerHTML = '<p>Access denied. Please contact the administrator.</p>';
            }
        } else {
            loginButton.textContent = 'Sign in with Google';
            linksContainer.innerHTML = '<p>Please sign in to view links</p>';
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
});