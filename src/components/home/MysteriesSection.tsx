// src/components/home/MysteriesSection.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'

interface Character {
  name: string
  type: string
  power: string
  description: string
  nftImage: string
  physicalImage: string
  backgroundColor: string
}

interface MysteriesSectionProps {
  title?: string
  subtitle?: string
  characters?: Character[]
  onLearnMore?: (characterName: string) => void
}

const defaultCharacters: Character[] = [
  {
    name: 'Uri',
    type: 'Plush',
    power: 'Glows in the dark',
    description: 'A mysterious ghost-like entity that illuminates the darkness with an ethereal glow.',
    nftImage: '/images/Ghost1.png',
    physicalImage: '/images/uri-physical.jpg', // Add these physical product images
    backgroundColor: 'bg-purple-100'
  },
  {
    name: 'Kappa',
    type: 'Vinyl',
    power: 'Water manipulation',
    description: 'Ancient water spirit with the ability to control rivers and rain.',
    nftImage: '/images/kappa.png',
    physicalImage: '/images/kappa-physical.jpg',
    backgroundColor: 'bg-blue-100'
  },
  {
    name: 'Ryuu',
    type: 'Plush',
    power: 'Fire breathing',
    description: 'A legendary dragon whose flames can forge the strongest metals.',
    nftImage: '/images/dragon.png',
    physicalImage: '/images/ryuu-physical.jpg',
    backgroundColor: 'bg-red-100'
  },
  {
    name: 'Fenikkusu',
    type: 'Vinyl',
    power: 'Eternal rebirth',
    description: 'The immortal phoenix that rises from ashes stronger than before.',
    nftImage: '/images/phoenix.png',
    physicalImage: '/images/phoenix-physical.jpg',
    backgroundColor: 'bg-pink-100'
  }
]

// Physical Product Card Component
const PhysicalProductCard = ({ 
  character, 
  index, 
  onLearnMore 
}: { 
  character: Character
  index: number
  onLearnMore?: (name: string) => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ 
        y: -8, 
        scale: 1.01
      }}
      className="relative w-full max-w-[420px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Polaroid-style card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-gray-100 hover:shadow-3xl transition-all duration-500">
        
        {/* Product number badge */}
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-kaiju-pink rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
          <span className="text-white font-black text-lg">{index + 1}</span>
        </div>

        {/* Image container with flip effect */}
        <div className="relative h-96 md:h-[420px] mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          
          {/* Physical product image (front) */}
          <motion.div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <img
              src={character.physicalImage}
              alt={`${character.name} Physical Product`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder for physical images we don't have
                const target = e.target as HTMLImageElement
                target.src = '/images/placeholder-physical.jpg'
              }}
            />
            
            {/* Physical product overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-white text-sm font-semibold">
                {character.type} Collectible
              </div>
            </div>
          </motion.div>

          {/* NFT image (back) */}
          <motion.div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: isHovered ? 'rotateY(0deg)' : 'rotateY(-180deg)',
              backfaceVisibility: 'hidden'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-kaiju-navy/10 via-kaiju-purple-light/10 to-kaiju-pink/10">
              <motion.img
                src={character.nftImage}
                alt={`${character.name} NFT`}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                animate={{
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ 
                  scale: { duration: 0.3 }
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/placeholder-kaiju.png'
                }}
              />
            </div>
            
            {/* NFT overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-kaiju-pink/80 to-transparent p-4">
              <div className="text-white text-sm font-semibold">
                Digital NFT
              </div>
            </div>
          </motion.div>

          {/* Hover instruction */}
          <motion.div
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Hover to see NFT
          </motion.div>
        </div>

        {/* Character info */}
        <div className="text-center space-y-4">
          <motion.h3 
            className="text-2xl font-black text-kaiju-navy tracking-tight"
            animate={{ 
              color: isHovered ? '#FF005C' : '#1f2760'
            }}
            transition={{ duration: 0.3 }}
          >
            {character.name}
          </motion.h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-kaiju-pink">
                {character.power}
              </span>
            </div>
            
            <p className="text-sm text-kaiju-navy/70 leading-relaxed line-clamp-3">
              {character.description}
            </p>
          </div>

          {/* Learn more button */}
          <motion.button
            onClick={() => onLearnMore?.(character.name)}
            className="w-full bg-gradient-to-r from-kaiju-pink to-kaiju-red text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover {character.name}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function MysteriesSection({
  title = "Physical Collectibles Available",
  subtitle = "Each mystery box contains one of these incredible physical collectibles, each paired with a unique NFT. Check out what you can collect!",
  characters = defaultCharacters,
  onLearnMore
}: MysteriesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleLearnMore = (characterName: string) => {
    if (onLearnMore) {
      onLearnMore(characterName)
    } else {
      const heroElement = document.querySelector('#hero')
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="bg-kaiju-light-pink py-20 px-6" id="mysteries" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-kaiju-navy leading-tight">
            {title}
          </h2>
          <p className="text-lg text-kaiju-navy/70 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 max-w-4xl mx-auto">
          {characters.map((character, index) => (
            <PhysicalProductCard
              key={character.name}
              character={character}
              index={index}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={() => {
              const heroElement = document.querySelector('#hero')
              if (heroElement) {
                heroElement.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-gradient-to-r from-kaiju-pink to-kaiju-red text-white font-black text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-kaiju-pink/25 transition-all duration-300 flex items-center justify-center gap-3 mx-auto border-4 border-white/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            <span>Open Your Mystery Box</span>
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}