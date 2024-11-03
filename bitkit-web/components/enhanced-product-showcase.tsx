'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown, Globe } from 'lucide-react'

const products = [
  {
    id: 'jade',
    name: { ko: 'Blockstream Jade', en: 'Blockstream Jade' },
    description: { 
      ko: '안전하고 편리한 하드웨어 지갑', 
      en: 'Secure and convenient hardware wallet' 
    },
    color: 'bg-gray-900',
    textColor: 'text-white',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: [
      { ko: '높은 보안성', en: 'High security' },
      { ko: '사용자 친화적 인터페이스', en: 'User-friendly interface' },
      { ko: '다중 암호화폐 지원', en: 'Multi-cryptocurrency support' },
    ],
  },
  {
    id: 'seedsigner',
    name: { ko: 'Seedsigner', en: 'Seedsigner' },
    description: { 
      ko: '오픈소스 DIY 하드웨어 지갑', 
      en: 'Open-source DIY hardware wallet' 
    },
    color: 'bg-orange-500',
    textColor: 'text-white',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: [
      { ko: '완전한 오프라인 작동', en: 'Fully offline operation' },
      { ko: '저렴한 구축 비용', en: 'Low-cost build' },
      { ko: '커스터마이징 가능', en: 'Customizable' },
    ],
  },
  {
    id: 'mnemonic',
    name: { ko: '니모닉 스토리지', en: 'Mnemonic Storage' },
    description: { 
      ko: '안전한 시드 구문 보관 솔루션', 
      en: 'Secure seed phrase storage solution' 
    },
    color: 'bg-blue-600',
    textColor: 'text-white',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    features: [
      { ko: '내구성 있는 소재', en: 'Durable material' },
      { ko: '방수 및 방화 기능', en: 'Water and fire resistant' },
      { ko: '간편한 복구 프로세스', en: 'Easy recovery process' },
    ],
  },
]

const ProductPage = ({ product, lang, isVisible }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const scrollToFeatures = () => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth'
    })
  }

  return (
    <div className={`${product.color} ${product.textColor} flex flex-col items-center justify-start`}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-7xl"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div className="text-center md:text-left md:flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">{product.name[lang]}</h2>
              <p className="text-xl mb-8">{product.description[lang]}</p>
              <button 
                className={`px-6 py-2 rounded-full ${product.textColor === 'text-white' ? 'bg-white text-black' : 'bg-black text-white'} 
                  font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {lang === 'ko' ? '자세히 보기' : 'Learn More'}
              </button>
            </div>
            
            <div 
              className="md:flex-1 flex justify-center md:justify-end relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-64 h-64 md:w-[448px] md:h-[448px] bg-white rounded-lg shadow-lg relative overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name[lang]}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {isHovering && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 
                        bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 
                        bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full px-4 py-16 max-w-6xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">{lang === 'ko' ? '주요 특징' : 'Key Features'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm 
                transition-all duration-300 hover:shadow-xl"
            >
              <h4 className="text-xl font-semibold mb-2">{feature[lang]}</h4>
              <p>{lang === 'ko' ? '자세한 설명...' : 'Detailed description...'}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function EnhancedProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lang, setLang] = useState('ko')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollPosition > windowHeight / 4)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const toggleLang = () => {
    setLang(current => current === 'ko' ? 'en' : 'ko')
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-4 z-10"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center 
            shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <span className="text-2xl font-bold text-gray-800">Logo</span>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={toggleLang}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        className="fixed top-4 right-4 z-10 bg-white text-gray-800 px-4 py-2 
          rounded-full shadow-lg flex items-center transition-all duration-300 
          hover:shadow-xl"
      >
        <Globe className="w-5 h-5 mr-2" />
        {lang === 'ko' ? 'EN' : '한국어'}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 left-0 right-0 z-10 mx-auto flex justify-center px-4"
      >
        <nav className="bg-transparent">
          <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            {products.map((product, index) => (
              <li key={product.id}>
                <motion.button
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full transition-colors duration-300 w-full md:w-auto
                    ${currentIndex === index 
                      ? 'bg-white text-gray-800' 
                      : `${product.textColor} border border-white`}`}
                >
                  {product.name[lang]}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20,
            mass: 0.8
          }}
        >
          <ProductPage 
            product={products[currentIndex]} 
            lang={lang} 
            isVisible={isVisible}
          />
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={prevProduct}
        whileHover={{ scale: 1.1 }}
        className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-white 
          rounded-full p-2 shadow-lg z-10 transition-all duration-300 
          hover:shadow-xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={nextProduct}
        whileHover={{ scale: 1.1 }}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-white 
          rounded-full p-2 shadow-lg z-10 transition-all duration-300 
          hover:shadow-xl"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  )
}