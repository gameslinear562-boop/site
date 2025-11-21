import { Sparkles, Palette, Zap, Heart, ArrowRight, ChevronRight, X, ArrowUp, Star, Quote, Upload, MessageCircle, Send } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const bannerImages = [
  'https://i.imgur.com/8LPZ5wx.jpeg',
  'https://i.imgur.com/QcrdT12.png',
  'https://i.imgur.com/sSJJBIu.jpeg',
  'https://i.imgur.com/G8bl5ui.jpeg',
  'https://i.imgur.com/gSGc2JB.jpeg',
  'https://i.imgur.com/9k16KDK.png',
  'https://i.imgur.com/MHFhiIQ.jpeg',
];

const flyerImages = [
  'https://i.imgur.com/chJ1Joc.jpeg',
  'https://i.imgur.com/niSrbee.jpeg',
  'https://i.imgur.com/uOU6AOQ.jpeg',
  'https://i.imgur.com/vX9e5Fp.jpeg',
  'https://i.imgur.com/LRfXlPD.jpeg',
  'https://i.imgur.com/xWzg8Aq.jpeg',
  'https://i.imgur.com/LMlW0nP.jpeg',
  'https://i.imgur.com/d52htiY.jpeg',
  'https://i.imgur.com/e2HwS1c.jpeg',
  'https://i.imgur.com/DdnwINi.jpeg',
];

const logoImages = [
  'https://i.imgur.com/m8mozEk.png',
  'https://i.imgur.com/XuyQVwT.jpeg',
  'https://i.imgur.com/FdX9rTu.png',
];

const categoryImages = {
  'Fortnite': [
    'https://i.imgur.com/h0lnuRf.png',
    'https://i.imgur.com/3yK0llI.png',
    'https://i.imgur.com/TCe6h63.png',
  ],
  'Minecraft 2D': [
    'https://i.imgur.com/0ytH4Ji.jpeg',
    'https://i.imgur.com/0OP1xDy.jpeg',
    'https://i.imgur.com/gdDqLME.jpeg',
    'https://i.imgur.com/mieIyWe.jpeg',
    'https://i.imgur.com/o9NHTbo.jpeg',
    'https://i.imgur.com/dqPwFtG.jpeg',
  ],
  'Minecraft 3D': [
    'https://i.imgur.com/CyLzijT.jpeg',
    'https://i.imgur.com/yuN4HfM.jpeg',
    'https://i.imgur.com/7WKzfJP.jpeg',
    'https://i.imgur.com/CpvEh29.jpeg',
    'https://i.imgur.com/bHYVefj.jpeg',
    'https://i.imgur.com/IQUzKhn.jpeg',
  ],
  'Pokemon': [
    'https://i.imgur.com/HylGKSL.png',
    'https://i.imgur.com/W4DmArA.png',
  ],
  'Roblox': [
    'https://i.imgur.com/fD1xNyi.png',
    'https://i.imgur.com/Hcff9pI.png',
  ],
  'Rocket League': [
    'https://i.imgur.com/4pHSj3W.png',
    'https://i.imgur.com/u7YEhf5.png',
  ],
  'Valorant': [
    'https://i.imgur.com/DYvJZ90.png',
    'https://i.imgur.com/QKazi14.png',
    'https://i.imgur.com/6waAKDg.png',
  ],
  'Wallpapers': [
    'https://i.imgur.com/EQ4ItRe.png',
    'https://i.imgur.com/cR9nugW.png',
    'https://i.imgur.com/kgvmE6D.jpeg',
  ],
  'Desenhos': [
    'https://i.imgur.com/ZKaDqGA.png',
  ],
};

const testimonials = [
  {
    name: 'Muriloso',
    role: '',
    image: 'https://i.imgur.com/At5Uvr2.jpeg',
    rating: 5,
    text: 'Top dms, primeira vez que Contratei para fazer imagens do meu canal'
  },
  {
    name: 'El Salvador',
    role:'',
    image: 'https://i.imgur.com/HZUJlS2.png',
    rating: 3,
    text: 'Dmr um pouco mais chego gostei bastante valeu a pena esperar. Vou Recomendar pra alguns amigos.'
  },
  {
    name: 'Portuguinha',
    role: '',
    image: 'https://i.imgur.com/j29tQJO.png',
    rating: 4,
    text: 'Top fez umas designers para minha cidade de RP fico massa só demoro um pouco pra fazer entrega das outras que pedi '
  },
  {
    name: 'Julia Alves',
    role: '',
    image: 'https://i.pravatar.cc/150?img=47',
    rating: 4,
    text: 'Designs incríveis que realmente fazem a diferença! O Weslley entende perfeitamente o que você precisa e entrega ainda melhor.'
  }
];

interface FallingElement {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'leaf' | 'circle' | 'square';
  rotation: number;
}

function App() {
  const [activeFilter, setActiveFilter] = useState('projetos');
  const [selectedBannerIndex, setSelectedBannerIndex] = useState<number | null>(null);
  const [bannerStartIndex, setBannerStartIndex] = useState(0);
  const [selectedFlyerIndex, setSelectedFlyerIndex] = useState<number | null>(null);
  const [flyerStartIndex, setFlyerStartIndex] = useState(0);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number | null>(null);
  const [logoStartIndex, setLogoStartIndex] = useState(0);
  const [fallingElements, setFallingElements] = useState<FallingElement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryImageIndex, setSelectedCategoryImageIndex] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = currentTestimonial;
  }, [currentTestimonial]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX.current - x) / 200;
    const newIndex = Math.round(scrollLeft.current + walk);
    const clampedIndex = Math.max(0, Math.min(testimonials.length - 3, newIndex));
    if (clampedIndex !== currentTestimonial) {
      setCurrentTestimonial(clampedIndex);
    }
  }, [currentTestimonial]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewModal(false);
    setReviewRating(0);
    setAvatarPreview(null);
  };

  useEffect(() => {
    const elements: FallingElement[] = [];
    for (let i = 0; i < 30; i++) {
      elements.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 12,
        size: 20 + Math.random() * 40,
        rotation: Math.random() * 360,
        type: ['leaf', 'circle', 'square'][Math.floor(Math.random() * 3)] as 'leaf' | 'circle' | 'square'
      });
    }
    setFallingElements(elements);
  }, []);

  useEffect(() => {
    if (selectedBannerIndex !== null || selectedFlyerIndex !== null || selectedLogoIndex !== null || selectedCategoryImageIndex !== null || showContactMenu || showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBannerIndex, selectedFlyerIndex, selectedLogoIndex, selectedCategoryImageIndex, showContactMenu, showReviewModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {fallingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-fall-leaf"
            style={{
              left: `${element.left}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            {element.type === 'leaf' && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="text-emerald-400/20"
                style={{
                  width: element.size,
                  height: element.size,
                  transform: `rotate(${element.rotation}deg)`
                }}
              >
                <path
                  d="M12 3C7 3 3 7 3 12C3 13.5 3.5 15 4.5 16.5C5.5 15 7 14 9 14C9 11.5 10.5 10 12 10C13.5 10 15 11.5 15 14C17 14 18.5 15 19.5 16.5C20.5 15 21 13.5 21 12C21 7 17 3 12 3Z"
                  fill="currentColor"
                />
                <path
                  d="M12 10V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {element.type === 'circle' && (
              <div
                className="rounded-full bg-gradient-to-br from-green-400/10 to-emerald-400/10 blur-sm"
                style={{ width: element.size, height: element.size }}
              />
            )}
            {element.type === 'square' && (
              <div
                className="rounded-lg bg-gradient-to-br from-teal-400/10 to-green-400/10 blur-sm"
                style={{
                  width: element.size,
                  height: element.size,
                  transform: `rotate(${element.rotation}deg)`
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-8 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Design Que</span>
                <br />
                <span className="text-white">
                  Multiplica
                </span>
                <br />
                <span className="text-white">Seus Resultados</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed">
                Criamos experiências visuais que não apenas impressionam, mas convertem visitantes em clientes e elevam sua marca acima da concorrência.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:bg-purple-950/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">204+</div>
                    <div className="text-sm text-gray-300 font-medium">Projetos Entregues</div>
                    <p className="text-xs text-gray-500 mt-2">Soluções criadas com paixão</p>
                  </div>
                </div>

                <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 hover:border-pink-500/60 transition-all duration-300 hover:bg-pink-950/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">48h</div>
                    <div className="text-sm text-gray-300 font-medium">Entrega Rápida</div>
                    <p className="text-xs text-gray-500 mt-2">Sem comprometer qualidade</p>
                  </div>
                </div>

                <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:bg-blue-950/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">98%</div>
                    <div className="text-sm text-gray-300 font-medium">Satisfação</div>
                    <p className="text-xs text-gray-500 mt-2">Clientes felizes sempre</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setShowContactMenu(true)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-sm flex items-center gap-2"
                >
                  Entrar em contato
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600/80 to-pink-500/80 rounded-full text-white font-medium text-sm"
                >
                  Ver Portfólio
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="relative w-full max-w-lg">
                <div className="relative w-full h-full flex items-center justify-center p-12">
                  <img
                    src="https://i.imgur.com/7vyAVaf.png"
                    alt="Aurea Logo"
                    className="w-full h-auto drop-shadow-2xl animate-float"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative pt-0 pb-12 px-6 bg-slate-900/50 z-10">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-3 p-2 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-full items-center">
              {[
                { id: 'projetos', label: 'Projetos' },
                { id: 'banners', label: 'Banners' },
                { id: 'flyers', label: 'Flyers' },
                { id: 'logos', label: 'Logos' },
                { id: 'vlogs', label: 'Outras Artes' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              <div className="w-px h-6 bg-purple-500/20 mx-1"></div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap text-gray-300 hover:text-white hover:bg-slate-700/50"
              >
                E cliente? Clique para avaliar.
              </button>
            </div>
          </div>

          {activeFilter === 'banners' ? (
            <>
              <div className="relative min-h-[600px]">
                <div className={bannerStartIndex === 6 ? "flex justify-center" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                  {bannerImages.slice(bannerStartIndex, Math.min(bannerStartIndex + 6, bannerImages.length)).map((image, index) => (
                    <div
                      key={bannerStartIndex + index}
                      onClick={() => setSelectedBannerIndex(bannerStartIndex + index)}
                      className={`group relative overflow-hidden rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${bannerStartIndex === 6 ? 'max-w-md' : ''}`}
                    >
                      <img
                        src={image}
                        alt={`Banner ${bannerStartIndex + index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                {bannerImages.length > 6 && (
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={() => setBannerStartIndex(Math.max(0, bannerStartIndex - 6))}
                      disabled={bannerStartIndex === 0}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => setBannerStartIndex(6)}
                      disabled={bannerStartIndex + 6 >= bannerImages.length}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {selectedBannerIndex !== null && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <button
                    onClick={() => setSelectedBannerIndex(null)}
                    className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <div className="relative max-w-4xl w-full flex items-center justify-center">
                    <img
                      src={bannerImages[selectedBannerIndex]}
                      alt={`Banner ${selectedBannerIndex + 1}`}
                      className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                    />

                    <button
                      onClick={() =>
                        setSelectedBannerIndex((selectedBannerIndex + 1) % bannerImages.length)
                      }
                      className="absolute right-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() =>
                        setSelectedBannerIndex(
                          selectedBannerIndex === 0
                            ? bannerImages.length - 1
                            : selectedBannerIndex - 1
                        )
                      }
                      className="absolute left-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                      {selectedBannerIndex + 1} / {bannerImages.length}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeFilter === 'flyers' ? (
            <>
              <div className="relative min-h-[600px]">
                <div className={flyerStartIndex === 6 ? "flex justify-center gap-8" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                  {flyerImages.slice(flyerStartIndex, Math.min(flyerStartIndex + 6, flyerImages.length)).map((image, index) => (
                    <div
                      key={flyerStartIndex + index}
                      onClick={() => setSelectedFlyerIndex(flyerStartIndex + index)}
                      className={`group relative overflow-hidden rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${flyerStartIndex === 6 ? 'max-w-md' : ''}`}
                    >
                      <img
                        src={image}
                        alt={`Flyer ${flyerStartIndex + index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                {flyerImages.length > 6 && (
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={() => setFlyerStartIndex(Math.max(0, flyerStartIndex - 6))}
                      disabled={flyerStartIndex === 0}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => setFlyerStartIndex(6)}
                      disabled={flyerStartIndex + 6 >= flyerImages.length}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {selectedFlyerIndex !== null && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <button
                    onClick={() => setSelectedFlyerIndex(null)}
                    className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <div className="relative max-w-4xl w-full flex items-center justify-center">
                    <img
                      src={flyerImages[selectedFlyerIndex]}
                      alt={`Flyer ${selectedFlyerIndex + 1}`}
                      className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                    />

                    <button
                      onClick={() =>
                        setSelectedFlyerIndex((selectedFlyerIndex + 1) % flyerImages.length)
                      }
                      className="absolute right-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() =>
                        setSelectedFlyerIndex(
                          selectedFlyerIndex === 0
                            ? flyerImages.length - 1
                            : selectedFlyerIndex - 1
                        )
                      }
                      className="absolute left-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                      {selectedFlyerIndex + 1} / {flyerImages.length}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeFilter === 'logos' ? (
            <>
              <div className="relative min-h-[600px]">
                <div className="flex justify-center gap-8">
                  {logoImages.slice(logoStartIndex, Math.min(logoStartIndex + 6, logoImages.length)).map((image, index) => (
                    <div
                      key={logoStartIndex + index}
                      onClick={() => setSelectedLogoIndex(logoStartIndex + index)}
                      className="group relative overflow-hidden rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer max-w-md"
                    >
                      <img
                        src={image}
                        alt={`Logo ${logoStartIndex + index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                {logoImages.length > 6 && (
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={() => setLogoStartIndex(Math.max(0, logoStartIndex - 6))}
                      disabled={logoStartIndex === 0}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => setLogoStartIndex(6)}
                      disabled={logoStartIndex + 6 >= logoImages.length}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {selectedLogoIndex !== null && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <button
                    onClick={() => setSelectedLogoIndex(null)}
                    className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <div className="relative max-w-4xl w-full flex items-center justify-center">
                    <img
                      src={logoImages[selectedLogoIndex]}
                      alt={`Logo ${selectedLogoIndex + 1}`}
                      className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                    />

                    <button
                      onClick={() =>
                        setSelectedLogoIndex((selectedLogoIndex + 1) % logoImages.length)
                      }
                      className="absolute right-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() =>
                        setSelectedLogoIndex(
                          selectedLogoIndex === 0
                            ? logoImages.length - 1
                            : selectedLogoIndex - 1
                        )
                      }
                      className="absolute left-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                      {selectedLogoIndex + 1} / {logoImages.length}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeFilter === 'vlogs' ? (
            <>
              {!selectedCategory ? (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Fortnite', bgImage: 'https://i.imgur.com/NSEGHyr.jpeg' },
                    { name: 'Minecraft 2D', bgImage: 'https://i.imgur.com/oY3e2bv.png' },
                    { name: 'Minecraft 3D', bgImage: 'https://i.imgur.com/XT1rOmv.jpeg' },
                    { name: 'Pokemon', bgImage: 'https://i.imgur.com/3uIZznm.jpeg' },
                    { name: 'Roblox', bgImage: 'https://i.imgur.com/2GB0Hj3.png' },
                    { name: 'Rocket League', bgImage: 'https://i.imgur.com/6cX7QLl.jpeg' },
                    { name: 'Valorant', bgImage: 'https://i.imgur.com/WAPFg03.jpeg' },
                    { name: 'Wallpapers', bgImage: 'https://i.imgur.com/tXf7BBl.jpeg' },
                    { name: 'Desenhos', bgImage: 'https://i.imgur.com/iU58B7Z.jpeg' }
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedCategory(item.name)}
                      className="group relative overflow-hidden rounded-xl border border-white/30 transition-all duration-300 cursor-pointer h-48"
                    >
                      <img
                        src={item.bgImage}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedCategoryImageIndex(null);
                      }}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>
                    <h3 className="text-2xl font-bold text-white">{selectedCategory}</h3>
                  </div>

                  <div className="relative min-h-[600px]">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(categoryImages[selectedCategory as keyof typeof categoryImages] || []).map((image, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedCategoryImageIndex(index)}
                          className="group relative overflow-hidden rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${selectedCategory} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedCategoryImageIndex !== null && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <button
                        onClick={() => setSelectedCategoryImageIndex(null)}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                      >
                        <X className="w-8 h-8" />
                      </button>

                      <div className="relative max-w-4xl w-full flex items-center justify-center">
                        <img
                          src={categoryImages[selectedCategory as keyof typeof categoryImages][selectedCategoryImageIndex]}
                          alt={`${selectedCategory} ${selectedCategoryImageIndex + 1}`}
                          className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                        />

                        <button
                          onClick={() =>
                            setSelectedCategoryImageIndex(
                              (selectedCategoryImageIndex + 1) % categoryImages[selectedCategory as keyof typeof categoryImages].length
                            )
                          }
                          className="absolute right-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        <button
                          onClick={() =>
                            setSelectedCategoryImageIndex(
                              selectedCategoryImageIndex === 0
                                ? categoryImages[selectedCategory as keyof typeof categoryImages].length - 1
                                : selectedCategoryImageIndex - 1
                            )
                          }
                          className="absolute left-4 text-white bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full backdrop-blur-sm"
                        >
                          <ChevronRight className="w-6 h-6 rotate-180" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                          {selectedCategoryImageIndex + 1} / {categoryImages[selectedCategory as keyof typeof categoryImages].length}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">O Que Dizem</span>
                  <br />
                  <span className="text-white">Nossos Clientes</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Depoimentos reais de pessoas que confiaram no nosso trabalho
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto" ref={testimonialRef}>
                <div
                  className="overflow-hidden cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentTestimonial * (100 / 3)}%)` }}
                  >
                    {[...testimonials, ...testimonials.slice(0, 3)].map((testimonial, index) => (
                      <div key={index} className="min-w-[33.333%] px-2 select-none">
                        <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 h-full">
                          <div className="flex flex-col items-center text-center h-full">
                            <div className="relative mb-4">
                              <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="flex gap-1 mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                              {testimonial.text}
                            </p>

                            <div>
                              <h4 className="text-white font-bold text-base mb-0.5">{testimonial.name}</h4>
                              <p className="text-gray-400 text-xs">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {showContactMenu && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactMenu(false)}
          ></div>

          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-l border-purple-500/30 shadow-2xl animate-in slide-in-from-right">
            <div className="h-full flex flex-col p-8">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-bold text-white">Vamos Conversar!</h2>
                <button
                  onClick={() => setShowContactMenu(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 space-y-6">
                <a
                  href="https://discord.com/invite/nsJJuAvbZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/60 transition-all duration-300 hover:bg-purple-950/30"
                >
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src="https://i.imgur.com/iATmMur.png" alt="Discord" className="w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">Dsicord</h3>
                    <p className="text-gray-400 text-sm">Junte-se ao nosso servidor Discord</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                </a>

                <a
                  href="https://api.whatsapp.com/send/?phone=5516996204267&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-green-500/20 rounded-2xl hover:border-green-500/60 transition-all duration-300 hover:bg-green-950/30"
                >
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src="https://i.imgur.com/VOZZEC1.png" alt="WhatsApp" className="w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">WhatsApp</h3>
                    <p className="text-gray-400 text-sm">Resposta rápida e direta. Tire suas dúvidas</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                </a>
              </div>

              <div className="pt-8 border-t border-purple-500/20">
                <p className="text-gray-400 text-sm text-center">
                  Respondemos em até <span className="text-purple-400 font-semibold">2 horas</span> durante o horário comercial
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/95 border border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => {
                setShowReviewModal(false);
                setReviewRating(0);
                setAvatarPreview(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Nos avalie!</h2>
            <p className="text-gray-400 mb-6">Sua opinião é muito importante para nós.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Avatar (opcional)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-shrink-0 w-20 h-20 bg-slate-700/50 border-2 border-dashed border-purple-500/30 rounded-full flex items-center justify-center hover:border-purple-500/50 transition-colors overflow-hidden"
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-sm text-gray-300 hover:bg-slate-700 hover:border-purple-500/40 transition-colors w-full"
                    >
                      {avatarPreview ? 'Trocar foto' : 'Adicionar foto de perfil'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Codigo de avaliação do cliente</label>
                <input
                  type="text"
                  placeholder="Digite aqui seu código"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Classificação</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`transition-colors ${reviewRating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Seu depoimento</label>
                <textarea
                  placeholder="Conte sua experiência conosco..."
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Enviar avaliação
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Partnership Section */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Nossas </span>
              <span className="text-white">Parcerias</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="group flex items-start gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-white rounded-2xl">
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src="https://i.imgur.com/aq49zHQ.png" alt="Parceiro 1" className="w-16 h-16 rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Parceria Premium</h3>
                <p className="text-gray-400 text-sm">Parceria exclusiva que potencializa criatividade e inovação em cada projeto. Juntos criamos experiências visuais transformadoras para marcas que querem se destacar no mercado.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-white rounded-2xl">
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src="https://i.imgur.com/s3CxgBr.jpeg" alt="Parceiro 2" className="w-16 h-16 rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Colaboração Estratégica</h3>
                <p className="text-gray-400 text-sm">Uma colaboração dedicada à excelência e qualidade. Compartilhamos a mesma paixão por design impecável e resultados extraordinários que impactam verdadeiramente o negócio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-purple-500/20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img
                src="https://i.imgur.com/7vyAVaf.png"
                alt="Aurea Logo"
                className="h-12 mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">Design que transforma marcas em experiências inesquecíveis. Criamos soluções visuais que capturam a essência do seu negócio.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 flex items-center justify-center p-2">
                  <img src="https://i.imgur.com/RRPZ7m5.png" alt="X" className="w-full h-full object-contain" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center p-2">
                  <img src="https://i.imgur.com/iATmMur.png" alt="Discord" className="w-full h-full object-contain" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Serviços</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2"><span className="text-purple-400">→</span> Branding</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2"><span className="text-purple-400">→</span> UI/UX Design</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2"><span className="text-purple-400">→</span> Design Editorial</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2"><span className="text-purple-400">→</span> Identidade Digital</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2"><span className="text-purple-400">→</span> Consultoria Visual</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contato & Informações</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contato@aurea.design" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">weslleyfelipegodoi@gmail.com</a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Telefone</p>
                  <a href="tel:+55(16)999999999" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">+55 (16) 996204367</a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Disponibilidade</p>
                  <p className="text-gray-400 text-sm">Segunda a Sexta, 10:30h-18h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 py-8 border-y border-purple-500/10">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">204+</div>
              <p className="text-gray-400 text-sm">Projetos Realizados</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">98%</div>
              <p className="text-gray-400 text-sm">Taxa de Satisfação</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">5+</div>
              <p className="text-gray-400 text-sm">Anos de Experiência</p>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 Aurea Design. Todos os direitos reservados. | <a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidade</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
