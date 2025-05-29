document.addEventListener('DOMContentLoaded', function() {

    const videos = [
        {
            title: "Cris MJ - Party MJ (Video Oficial)",
            channel: "Cris MJ",
            views: "45M",
            time: "hace 3 meses",
            duration: "3:45",
            videoFile: "assets/videos/Cris MJ - Party MJ (Video Oficial).webm",
            videoFileOptimized: "assets/videos/videosOptimizados/party-mj-video-oficial---cris-mj.mp4",
            thumbnailVideo: "assets/thumbnails/Eminem - Habits (feat. White Gold) [Official Audio].mp4",
            thumbnailPoster: "assets/thumbnails/Optimizadas/oxy.avif",
            channelAvatar: {
                original: "assets/img/ImagenesOriginales/usuario.jpg",
                optimized: "assets/img/ImagenesOptimizadas/2.webp",
                fallback: "assets/img/ImagenesOriginales/UsuarioSimplificado.png"
            }
        },
        {
            title: "Metro Boomin & Future - Superhero (Heroes & Villains) [Official Music Video]",
            channel: "Metro Boomin",
            views: "32M",
            time: "hace 5 meses",
            duration: "4:12",
            videoFile: "assets/videos/superhero-heroes--villains-visualizer---metro-boomin-future-chris-brown (1).mp4",
            videoFileOptimized: "assets/videos/videosOptimizados/superhero-heroes--villains-visualizer---metro-boomin-future-chris-brown.mp4",
            thumbnailVideo: "assets/thumbnails/GAVILÁN II (Visualizer) - Peso Pluma, Tito Double P.mp4",
            thumbnailPoster: "assets/thumbnails/Optimizadas/superhero.avif",
            channelAvatar: {
                original: "assets/img/ImagenesOriginales/kevin.jpeg",
                optimized: "assets/img/ImagenesOptimizadas/2.webp",
                fallback: "assets/img/ImagenesOriginales/UsuarioSimplificado.png"
            }
        },
        {
            title: "Roddy Ricch - The Box [Official Music Video]",
            channel: "Roddy Ricch",
            views: "780M",
            time: "hace 2 años",
            duration: "3:16",
            videoFile: "assets/videos/Eminem - Without Me (Official Music Video) [1].mp4",
            videoFileOptimized: "assets/videos/videosOptimizados/Eminem - Without Me (Official Music Video).mp4",
            thumbnailVideo: "assets/thumbnails/BAD BUNNY - VUELVE CANDY B (Visualizer)  nadie sabe lo que va a pasar mañana.mp4",
            thumbnailPoster: "assets/thumbnails/Optimizadas/box.avif",
            channelAvatar: {
                original: "assets/img/ImagenesOriginales/usuario.jpg",
                optimized: "assets/img/ImagenesOptimizadas/2.webp",
                fallback: "assets/img/ImagenesOriginales/UsuarioSimplificado.png"
            }
        }
    ];

    const videoGrid = document.getElementById('videoGrid');

    if (videoGrid) {
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <video 
                        class="video-thumb-preview" 
                        muted 
                        autoplay 
                        loop 
                        playsinline 
                        preload="metadata" 
                        poster="${video.thumbnailPoster}"
                        src="${video.thumbnailVideo}">
                        Tu navegador no soporta videos.
                    </video>
                    <div class="video-duration">${video.duration}</div>
                </div>
                <div class="video-info">
                    <picture class="channel-avatar">
                        <source type="image/webp" data-srcset="${video.channelAvatar.optimized}">
                        <img loading="lazy" src="${video.channelAvatar.fallback}" alt="${video.channel}" class="lazy">
                    </picture>
                    <div class="video-details">
                        <div class="video-title">${video.title}</div>
                        <div class="video-meta">
                            <div>${video.channel}</div>
                            <div>
                                <span>${video.views} vistas</span>
                                <span>•</span>
                                <span>${video.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            videoCard.addEventListener('click', () => {
                const params = new URLSearchParams();
                params.append('v', video.videoFile);
                if (video.videoFileOptimized) {
                    params.append('v_opt', video.videoFileOptimized);
                }
                params.append('title', encodeURIComponent(video.title));
                params.append('channel', encodeURIComponent(video.channel));
                params.append('views', video.views);
                params.append('date', video.time);
                params.append('thumbnail', video.thumbnailPoster);

                window.location.href = `Pages/video-Detail.html?${params.toString()}`;
            });

            videoGrid.appendChild(videoCard);
        });
    }

    // Menú hamburguesa
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });

        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('expanded');
                }
            });
        });
    }
});
