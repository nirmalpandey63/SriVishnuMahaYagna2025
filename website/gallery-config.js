// Dynamic Gallery Configuration
const GALLERY_CONFIG = {
    photos: [
        { src: 'assets/gallery1.jpg', alt: 'यज्ञ तस्वीर 1' },
        { src: 'assets/gallery2.jpg', alt: 'यज्ञ तस्वीर 2' },
        { src: 'assets/gallery11.jpg', alt: 'यज्ञ तस्वीर 3' },
        { src: 'assets/gallery20.jpg', alt: 'यज्ञ तस्वीर 4' },
        { src: 'assets/gallery22.jpg', alt: 'यज्ञ तस्वीर 5' }
        // Add new images here
    ],
    videos: [
        // Add video URLs here when available
    ]
};

// Dynamic gallery rendering
function renderGallery() {
    const photosContainer = document.getElementById('photos');
    const videosContainer = document.getElementById('videos');
    
    // Render photos
    if (photosContainer) {
        photosContainer.innerHTML = GALLERY_CONFIG.photos.map(photo => `
            <div class="gallery-item" onclick="openModal('${photo.src}')">
                <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');
    }
    
    // Render videos
    if (videosContainer) {
        if (GALLERY_CONFIG.videos.length === 0) {
            videosContainer.innerHTML = `
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>वीडियो जल्द ही अपलोड किए जाएंगे</p>
                </div>
            `;
        } else {
            videosContainer.innerHTML = GALLERY_CONFIG.videos.map(video => `
                <div class="gallery-item">
                    <video controls>
                        <source src="${video.src}" type="video/mp4">
                    </video>
                </div>
            `).join('');
        }
    }
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', renderGallery);