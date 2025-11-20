// Function to fetch HTML content
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const text = await response.text();
        document.getElementById(id).innerHTML = text;
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p style="color:red">Error loading section: ${file}</p>`;
    }
}

// Load all sections sequentially
async function init() {
    await Promise.all([
        loadComponent('header-section', 'sections/01-header.html'),
        loadComponent('diagram-section', 'sections/02-diagram.html'),
        loadComponent('definitions-section', 'sections/03-definitions.html'),
        loadComponent('hypotheses-section', 'sections/04-hypotheses.html'),
        loadComponent('methodology-section', 'sections/05-methodology.html'),
        loadComponent('footer-section', 'sections/06-footer.html')
    ]);

    // Initialize Mermaid AFTER content is loaded
    mermaid.initialize({ 
        startOnLoad: true,
        theme: 'base',
        themeVariables: { 
            primaryColor: '#dbeafe', 
            edgeLabelBackground:'#ffffff', 
            tertiaryColor: '#f0f9ff'
        }
    });
    
    // Force re-render of diagrams
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
}

// Run
document.addEventListener('DOMContentLoaded', init);
