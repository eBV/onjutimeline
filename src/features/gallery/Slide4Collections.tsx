import { motion } from 'framer-motion'
import { MediaRenderer } from 'thirdweb/react'
import { useStore } from '../../hooks/useStore'

const Slide4Collections = () => {
  const { client } = useStore()

  const artworks = [
    { id: 1, title: 'Okoloto #001', color: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Okoloto #002', color: 'from-blue-500 to-cyan-500' },
    { id: 3, title: 'Elemnts #001', color: 'from-orange-500 to-yellow-500' },
    { id: 4, title: 'Elemnts #002', color: 'from-green-500 to-emerald-500' },
    { id: 5, title: 'Okoloto #003', color: 'from-red-500 to-pink-500' },
    { id: 6, title: 'Elemnts #003', color: 'from-indigo-500 to-purple-500' },
  ]

  return (
    <div className="min-h-full flex items-center justify-center py-8">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-12"
        >
          <div className="inline-block bg-ohnahji-pink text-ohnahji-white px-6 py-2 border-[6px] border-ohnahji-black rounded-2xl mb-6 font-sans">
            <span className="text-sm font-bold uppercase tracking-wider">GENERATIVE ART</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-ohnahji-gold mb-4 leading-none">
            OKOLOTOS & ELEMNTS
          </h1>
          <p className="text-xl text-ohnahji-white font-bold font-sans">
            Code-based artistic expression
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`neo-card p-4 bg-gradient-to-br ${art.color} rounded-3xl cursor-pointer group`}
            >
              <div className="aspect-square border-[6px] border-ohnahji-black flex items-center justify-center mb-4 rounded-2xl overflow-hidden bg-white/20 relative">
                <div className="absolute inset-0 bg-white/10 animate-pulse group-hover:hidden" />
                <MediaRenderer
                  client={client}
                  src={`ipfs://QmZJv7nQ9YQXA9yFfX8U1eGqVvR9pW5J3kRk3nN5mX1Y1/${art.id}.png`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-ohnahji-white border-[6px] border-ohnahji-black p-3 rounded-xl shadow-neo-sm group-hover:shadow-neo transition-all">
                <p className="font-black text-center font-sans uppercase text-sm tracking-tighter">{art.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slide4Collections
