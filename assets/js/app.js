// Function to fetch HTML content
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const text = await response.text();
        document.getElementById(id).innerHTML = text;
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p style="color:red; text-align:center;">Error loading: ${file}</p>`;
    }
}

// Load all sections sequentially
async function init() {
    await Promise.all([
        // FIXED: Added ./ before sections
        loadComponent('header-section', './sections/header.html'),
        loadComponent('abstract-section', './sections/abstract.html'),
        loadComponent('diagram-section', './sections/diagram.html'),
        loadComponent('definitions-section', './sections/definitions.html'),
        loadComponent('hypotheses-section', './sections/hypotheses.html'),
        loadComponent('methodology-section', './sections/methodology.html'),
        loadComponent('footer-section', './sections/footer.html')
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
    
    // Force re-render of diagrams to ensure they display correctly
    setTimeout(() => {
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    }, 100);
}

// Run the script when the page loads
document.addEventListener('DOMContentLoaded', init);
