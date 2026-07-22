/**
 * PORTFÓLIO CINEMATOGRÁFICO DE VÍDEOS - SCRIPT PRINCIPAL
 * Mapeamento e Interatividade dos Vídeos Locais
 */

// Catálogo dos 19 Arquivos da pasta "Videos/"
const VIDEOS_CATALOG = [
    {
        id: "v1",
        title: "BH Soul Blues Festival - Cobertura Completa",
        filename: "BH_SoulBluesFestival_Completo.mp4",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Festival Full"
    },
    {
        id: "v2",
        title: "Mister Rock - Chamada Julho 2023",
        filename: "CHAMADA-MISTER-ROCK-JUL-2023.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Chamada"
    },
    {
        id: "v3",
        title: "ColdHot Festival - Aftermovie Oficial",
        filename: "ColdHot_Festival.mp4",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Aftermovie"
    },
    {
        id: "v4",
        title: "Mister Rock - Promocional 35 Segundos",
        filename: "Cópia de CHAMADA-MISTER-ROCK-35s.mp4",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Promo 35s"
    },
    {
        id: "v5",
        title: "Mister Rock Halloween - Teaser Especial",
        filename: "Cópia de MISTER-ROCK-HALLOWEEN-V1.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser"
    },
    {
        id: "v6",
        title: "Mister Rock - Resumo de Destaques Part 01",
        filename: "Cópia de MISTER-ROCK-PARTE01-RESUMO-ALTA.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Resumo HD"
    },
    {
        id: "v7",
        title: "Mister Rock - Resumo Edição Alternativa",
        filename: "Cópia de MISTER-ROCK-PARTE01-RESUMO-V2-BAIXA.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Recap V2"
    },
    {
        id: "v8",
        title: "Ancient Mariners - Teaser Mister Rock",
        filename: "Cópia de MISTERROCK-TEASER-ANCIENT-MARINERS-V1.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser Banda"
    },
    {
        id: "v9",
        title: "Mister Rock Band - Teaser Promocional",
        filename: "Cópia de MISTERROCK-TEASER-MISTER-ROCK-BAND-V1.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser V1"
    },
    {
        id: "v10",
        title: "Queen Tribute - Teaser Mister Rock",
        filename: "Cópia de MISTERROCK-TEASER-QUEEN-V2.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Teaser V2"
    },
    {
        id: "v11",
        title: "XV BH Soul Blues Festival - Edição V3",
        filename: "Cópia de XV-BH-SOUL-BLUES-FESTIVAL-V3.mp4",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Edição XV"
    },
    {
        id: "v12",
        title: "Euro Trip Highlights - Reel Vertical",
        filename: "EUROPA_COMPLETO_INSTA.mp4",
        category: "social",
        categoryName: "Social Media & Reels",
        tag: "Instagram Reel"
    },
    {
        id: "v13",
        title: "FICC 2019 - Comercial 30s",
        filename: "Ficc2019_30Seg.mp4",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Comercial 30s"
    },
    {
        id: "v14",
        title: "FICC 2019 - Kiss Stage Spot",
        filename: "Ficc2019_30Seg_kiss.mp4",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Spot TV"
    },
    {
        id: "v15",
        title: "Mister Rock - Vídeo Institucional da Casa",
        filename: "MISTER ROCK VIDEO .mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Institucional"
    },
    {
        id: "v16",
        title: "Auder Gang - Montagem de Show ao Vivo",
        filename: "Montagem_AuderGang_6-f.mp4",
        category: "shows",
        categoryName: "Shows & Rock",
        tag: "Montagem Live"
    },
    {
        id: "v17",
        title: "No Man's Land - Curta Cinematográfico",
        filename: "No mans land.mp4",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Cinematográfico"
    },
    {
        id: "v18",
        title: "BH Soul Blues - Retrospectiva 4 Eventos",
        filename: "bh_soul_blues_4evenos.mp4",
        category: "festivais",
        categoryName: "Festivais & Blues",
        tag: "Retrospectiva"
    },
    {
        id: "v19",
        title: "XBK Blues Burguer - Vídeo Promocional",
        filename: "xbk_blues_burguer.mp4",
        category: "comercial",
        categoryName: "Comercial & Teasers",
        tag: "Comercial Food"
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

            // Codificar URI do arquivo local para evitar falhas com espaços ou acentos
            const videoSrc = `Videos/${encodeURI(video.filename)}`;

            card.innerHTML = `
                <div class="card-media">
                    <video 
                        class="card-video-preview" 
                        src="${videoSrc}" 
                        muted 
                        loop 
                        playsinline 
                        preload="metadata"
                    ></video>
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
                        <span>Assista em 4K</span>
                    </div>
                </div>
            `;

            const previewVideo = card.querySelector(".card-video-preview");

            // Evento de hover silencioso
            card.addEventListener("mouseenter", () => {
                if (previewVideo) {
                    previewVideo.play().catch(err => {
                        // Trata políticas de autoplay do navegador se necessário
                        console.debug("Autoplay preview restrito pelo navegador:", err);
                    });
                }
            });

            card.addEventListener("mouseleave", () => {
                if (previewVideo) {
                    previewVideo.pause();
                    previewVideo.currentTime = 0;
                }
            });

            // Evento de clique para abrir o Lightbox Modal
            card.addEventListener("click", () => {
                openModal(video);
            });

            videoGrid.appendChild(card);
        });
    }

    /**
     * Abrir o Modal de Vídeo
     */
    function openModal(video) {
        const videoSrc = `Videos/${encodeURI(video.filename)}`;
        
        modalVideoPlayer.src = videoSrc;
        modalTitle.textContent = video.title;
        modalCategory.textContent = video.categoryName;
        modalFilename.textContent = `Arquivo: Videos/${video.filename}`;

        videoModal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Bloqueia scroll de fundo

        modalVideoPlayer.play().catch(err => console.debug("Erro ao reproduzir no modal:", err));
    }

    /**
     * Fechar o Modal de Vídeo
     */
    function closeModal() {
        modalVideoPlayer.pause();
        modalVideoPlayer.src = "";
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
