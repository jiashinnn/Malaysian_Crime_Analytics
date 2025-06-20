// Dashboard specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('power-bi-frame');
    
    if (iframe) {
        // Add loading indicator
        const dashboardCard = iframe.closest('.card');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'text-center p-5';
        loadingIndicator.innerHTML = `
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading dashboard...</p>
        `;
        
        // Insert loading indicator before iframe
        iframe.style.opacity = '0';
        iframe.parentNode.insertBefore(loadingIndicator, iframe);
        
        // Remove loading indicator when iframe loads
        iframe.addEventListener('load', function() {
            setTimeout(() => {
                loadingIndicator.remove();
                iframe.style.transition = 'opacity 0.5s ease';
                iframe.style.opacity = '1';
            }, 1000); // Slight delay for smoother transition
        });
        
        // Add fullscreen button
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'btn btn-sm btn-outline-primary position-absolute';
        fullscreenBtn.style.bottom = '10px';
        fullscreenBtn.style.right = '10px';
        fullscreenBtn.style.zIndex = '100';
        fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen"></i>';
        fullscreenBtn.setAttribute('data-bs-toggle', 'tooltip');
        fullscreenBtn.setAttribute('data-bs-placement', 'top');
        fullscreenBtn.setAttribute('title', 'Fullscreen');
        
        // Position the button
        dashboardCard.style.position = 'relative';
        dashboardCard.appendChild(fullscreenBtn);
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                dashboardCard.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
                });
                fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
            } else {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen"></i>';
            }
        });
        
        // Handle fullscreen change event
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen"></i>';
            }
        });
    }
}); 