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
            thumbnail: {
                original: "assets/thumbnails/oxy.jpg",
                optimized: "assets/thumbnails/Optimizadas/oxy.avif",
                fallback: "assets/img/ImagenesOptimizadas/1.avif"
            },
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
            thumbnail: {
                original: "assets/thumbnails/superhero.jpg",
                optimized: "assets/thumbnails/Optimizadas/superhero.avif",
                fallback: "assets/img/ImagenesOptimizadas/1.avif"
            },
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
            thumbnail: {
                original: "assets/thumbnails/box.jpg",
                optimized: "assets/thumbnails/Optimizadas/box.avif",
                fallback: "assets/img/ImagenesOptimizadas/1.avif"
            },
            channelAvatar: {
                original: "assets/img/ImagenesOriginales/usuario.jpg",
                optimized: "assets/img/ImagenesOptimizadas/2.webp",
                fallback: "assets/img/ImagenesOriginales/UsuarioSimplificado.png"
            }
        }
    ];

    // Generar tarjetas de video con lazy loading
    const videoGrid = document.getElementById('videoGrid');
    
    // Verificar si hay elementos para observar
    if (videoGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoCard = entry.target;
                    const video = videoCard._videoData;
                    
                    // Cargar solo cuando es visible
                    const thumbnailImg = videoCard.querySelector('.video-thumbnail img');
                    if (thumbnailImg) {
                        thumbnailImg.src = video.thumbnail.optimized;
                        thumbnailImg.onerror = () => {
                            thumbnailImg.src = video.thumbnail.original;
                            thumbnailImg.onerror = () => {
                                thumbnailImg.src = video.thumbnail.fallback;
                            };
                        };
                    }
                    
                    // Cargar avatar del canal
                    const channelAvatarImg = videoCard.querySelector('.channel-avatar img');
                    if (channelAvatarImg) {
                        channelAvatarImg.src = video.channelAvatar.optimized;
                        channelAvatarImg.onerror = () => {
                            channelAvatarImg.src = video.channelAvatar.original;
                            channelAvatarImg.onerror = () => {
                                channelAvatarImg.src = video.channelAvatar.fallback;
                            };
                        };
                    }
                    
                    observer.unobserve(videoCard);
                }
            });
        }, { threshold: 0.1 });

        videos.forEach(video => {
            // Verificar si el video tiene archivos existentes
            if (!video.videoFile && !video.videoFileOptimized) {
                console.warn(`Video ${video.title} no tiene archivos definidos`);
                return;
            }

            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard._videoData = video;
            
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <picture>
                        <source type="image/avif" data-srcset="${video.thumbnail.optimized}">
                        <source type="image/webp" data-srcset="${video.thumbnail.fallback}">
                        <img loading="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3C/svg%3E" 
                            alt="${video.title}" class="lazy">
                    </picture>
                    <div class="video-duration">${video.duration}</div>
                </div>
                <div class="video-info">
                    <picture class="channel-avatar">
                        <source type="image/webp" data-srcset="${video.channelAvatar.optimized}">
                        <img loading="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3C/svg%3E" 
                            alt="${video.channel}" class="lazy">
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
            
            // Configurar evento de clic
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
                params.append('thumbnail', video.thumbnail.optimized);
                params.append('thumbnail_fb', video.thumbnail.original);
                
                window.location.href = `Pages/video-Detail.html?${params.toString()}`;
            });
            
            videoGrid.appendChild(videoCard);
            observer.observe(videoCard);
        });
    }

    // Menú hamburguesa
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
        
        // Cerrar sidebar en móviles al hacer clic en un item
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('expanded');
                }
            });
        });
    }
});