document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/links.json', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.links.forEach(link => {
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
                console.error('Error parsing JSON:', error);
                linksContainer.innerHTML = '<p>Error loading links. Please check the JSON file.</p>';
            }
        } else {
            console.error('Error loading links:', xhr.statusText);
            linksContainer.innerHTML = '<p>Error loading links. Please try again later.</p>';
        }
    };
    
    xhr.onerror = function() {
        console.error('Request failed');
        linksContainer.innerHTML = '<p>Error loading links. Please try again later.</p>';
    };
    
    xhr.send();
});