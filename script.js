/**
 * PORTFÓLIO CINEMATOGRÁFICO DE VÍDEOS - SCRIPT PRINCIPAL
 * Mapeamento e Interatividade dos Vídeos Locais
 */

// Catálogo de Vídeos Integrado com YouTube
const VIDEOS_CATALOG = [
    {
        id: "v1",
        title: "BH Soul Blues Festival - Cobertura Completa",
        youtubeId: "ujia61tdO-I",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Festival Full"
    },
    {
        id: "v2",
        title: "Mister Rock - Chamada Julho 2023",
        youtubeId: "MxOLuonrooI",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Chamada"
    },
    {
        id: "v3",
        title: "ColdHot Festival - Aftermovie Oficial",
        youtubeId: "eMPWlILVUFA",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Aftermovie"
    },
    {
        id: "v4",
        title: "Mister Rock - Promocional 35 Segundos",
        youtubeId: "QZVdFGC7I58",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Promo 35s"
    },
    {
        id: "v5",
        title: "Mister Rock Halloween - Teaser Especial",
        youtubeId: "xg9TATl7lFs",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser"
    },
    {
        id: "v6",
        title: "Mister Rock - Resumo de Destaques Part 01",
        youtubeId: "Xpv9Wvs6lk8",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Resumo HD"
    },
    {
        id: "v7",
        title: "Mister Rock - Resumo Edição Alternativa",
        youtubeId: "oeIPSsnY8EQ",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Recap V2"
    },
    {
        id: "v8",
        title: "Ancient Mariners - Teaser Mister Rock",
        youtubeId: "DJd6fwTQGSU",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser Banda"
    },
    {
        id: "v9",
        title: "Mister Rock Band - Teaser Promocional",
        youtubeId: "ED-ARTuR9a0",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser V1"
    },
    {
        id: "v10",
        title: "Queen Tribute - Teaser Mister Rock",
        youtubeId: "6OFWMX-oEs0",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser V2"
    },
    {
        id: "v11",
        title: "XV BH Soul Blues Festival - Edição V3",
        youtubeId: "qMevFzvFczQ",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Edição XV"
    },
    {
        id: "v12",
        title: "Euro Trip Highlights - Reel Vertical",
        youtubeId: "HKP-zdgYSp4",
        category: "social",
        categoryName: "Social Media & Reels",
        tag: "Instagram Reel"
    },
    {
        id: "v13",
        title: "FICC 2019 - Comercial 30s",
        youtubeId: "jVUwLyayuEk",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Comercial 30s"
    },
    {
        id: "v14",
        title: "FICC 2019 - Spot de Destaque",
        youtubeId: "WOzG6IeGa-I",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Spot TV"
    }
];

// Elementos do DOM
document.addEventListener("DOMContentLoaded", () => {
    const videoGrid = document.getElementById("video-grid");
    const emptyState = document.getElementById("empty-state");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    // Elementos do Modal Lightbox
    const videoModal = document.getElementById("video-modal");
    const modalVideoPlayer = document.getElementById("modal-video-player");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalFilename = document.getElementById("modal-filename");
    const modalClose = document.getElementById("modal-close");

    let currentFilter = "all";

    /**
     * Renderizar o catálogo de vídeos no Grid
     */
    function renderVideos(filter = "all") {
        videoGrid.innerHTML = "";
        
        const filteredVideos = VIDEOS_CATALOG.filter(video => {
            return filter === "all" || video.category === filter;
        });

        if (filteredVideos.length === 0) {
            emptyState.classList.remove("hidden");
            return;
        } else {
            emptyState.classList.add("hidden");
        }

        filteredVideos.forEach((video, index) => {
            const card = document.createElement("article");
            card.className = "video-card";
            card.style.animationDelay = `${index * 0.05}s`;

            let mediaHTML = "";
            if (video.youtubeId) {
                const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                mediaHTML = `<img class="card-video-preview" src="${thumbUrl}" alt="${video.title}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" />`;
            } else {
                const videoSrc = `Videos/${encodeURI(video.filename)}`;
                mediaHTML = `<video class="card-video-preview" src="${videoSrc}" muted loop playsinline preload="metadata"></video>`;
            }

            card.innerHTML = `
                <div class="card-media">
                    ${mediaHTML}
                    <div class="card-media-overlay">
                        <div class="play-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </div>
                    </div>
                    <span class="card-tag badge">${video.tag}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${video.title}</h3>
                    <div class="card-meta">
                        <span>${video.categoryName}</span>
                        <span>${video.youtubeId ? 'YouTube HD' : 'Assista em 4K'}</span>
                    </div>
                </div>
            `;

            const previewVideo = card.querySelector("video.card-video-preview");

            // Evento de hover para vídeo local (se houver)
            if (previewVideo) {
                card.addEventListener("mouseenter", () => {
                    previewVideo.play().catch(err => console.debug("Autoplay preview restrito:", err));
                });
                card.addEventListener("mouseleave", () => {
                    previewVideo.pause();
                    previewVideo.currentTime = 0;
                });
            }

            // Evento de clique para abrir o Lightbox Modal
            card.addEventListener("click", () => {
                openModal(video);
            });

            videoGrid.appendChild(card);
        });
    }

    /**
     * Abrir o Modal de Vídeo (Suporta YouTube e MP4 Local)
     */
    function openModal(video) {
        const playerWrapper = document.querySelector(".modal-player-wrapper");
        playerWrapper.innerHTML = ""; // Limpa player anterior

        if (video.youtubeId) {
            const iframe = document.createElement("iframe");
            iframe.className = "modal-iframe";
            iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            playerWrapper.appendChild(iframe);
            modalFilename.textContent = `Origem: YouTube (${video.youtubeId})`;
        } else {
            const videoElem = document.createElement("video");
            videoElem.className = "modal-video";
            videoElem.id = "modal-video-player";
            videoElem.controls = true;
            videoElem.playsInline = true;
            videoElem.src = `Videos/${encodeURI(video.filename)}`;
            playerWrapper.appendChild(videoElem);
            videoElem.play().catch(err => console.debug("Erro ao reproduzir no modal:", err));
            modalFilename.textContent = `Arquivo: Videos/${video.filename}`;
        }
        
        modalTitle.textContent = video.title;
        modalCategory.textContent = video.categoryName;

        videoModal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Bloqueia scroll de fundo
    }

    /**
     * Fechar o Modal de Vídeo
     */
    function closeModal() {
        const playerWrapper = document.querySelector(".modal-player-wrapper");
        playerWrapper.innerHTML = ""; // Interrompe áudio/vídeo imediatamente
        videoModal.classList.add("hidden");
        document.body.style.overflow = ""; // Restaura scroll de fundo
    }

    // Eventos do Modal
    modalClose.addEventListener("click", closeModal);

    // Fechar ao clicar fora do container do modal
    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Fechar com a tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
            closeModal();
        }
    });

    /**
     * Filtros por Categoria
     */
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.getAttribute("data-filter");
            renderVideos(currentFilter);
        });
    });

    /**
     * Toggle Menu Mobile
     */
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });

        // Fechar menu ao clicar num link
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
            });
        });
    }

    // Inicialização da galeria
    renderVideos("all");
});
