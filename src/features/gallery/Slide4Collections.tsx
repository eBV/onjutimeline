import { motion } from 'framer-motion'

const Slide4Collections = () => {
  const artworks = [
    {
      id: 1,
      title: 'Okoloto #001',
      color: 'from-purple-500 to-pink-500',
      image: 'https://ipfs.io/ipfs/Qmdaiju45QxWibywnWftvKQgxPy1TJxBuGEUQa4Fevv9Sf/640.jpg',
      link: 'https://opensea.io/collection/okoloto',
    },
    {
      id: 2,
      title: 'Okoloto #002',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://ipfs.io/ipfs/Qmdaiju45QxWibywnWftvKQgxPy1TJxBuGEUQa4Fevv9Sf/265.jpg',
      link: 'https://opensea.io/collection/okoloto',
    },
    {
      id: 3,
      title: 'Elemnts #001',
      color: 'from-orange-500 to-yellow-500',
      image: 'https://arweave.net/PLfqR9j24VXlek1oNotBkYrrRH_IiQQKDjmrsvAEEQc',
      link: 'https://opensea.io/collection/elemntsbyohnahji',
    },
    {
      id: 4,
      title: 'Elemnts #002',
      color: 'from-green-500 to-emerald-500',
      image: 'https://arweave.net/G87rtS-Mt-erTUE3aZZVwTfQ2fO4USetBEz8SmARM_M',
      link: 'https://opensea.io/collection/elemntsbyohnahji',
    },
    {
      id: 5,
      title: 'Okoloto #003',
      color: 'from-red-500 to-pink-500',
      image: 'https://ipfs.io/ipfs/Qmdaiju45QxWibywnWftvKQgxPy1TJxBuGEUQa4Fevv9Sf/1737.jpg',
      link: 'https://opensea.io/collection/okoloto',
    },
    {
      id: 6,
      title: 'Elemnts #003',
      color: 'from-indigo-500 to-purple-500',
      image: 'https://arweave.net/8obmakSPrhbjzUwImpC9MKBXamQ7uFvSKCe-bU8W0MA',
      link: 'https://opensea.io/collection/elemntsbyohnahji',
    },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center py-2 md:py-4">
      <div className="max-w-5xl w-full flex flex-col h-full max-h-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-3 md:mb-5"
        >
          <div className="inline-block bg-ohnahji-pink text-ohnahji-white px-4 py-1 border-[6px] border-ohnahji-black rounded-2xl mb-3 font-sans">
            <span className="text-xs font-bold uppercase tracking-wider">GENERATIVE ART</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-ohnahji-gold mb-2 leading-none">
            OKOLOTOS & ELEMNTS
          </h1>
          <p className="text-base text-ohnahji-white font-bold font-sans">
            Code-based artistic expression
          </p>
        </motion.div>

        <div
          className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 flex-1 min-h-0"
          onWheel={(e) => e.stopPropagation()}
        >
          {artworks.map((art, index) => (
            <motion.a
              key={art.id}
              href={art.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`neo-card p-1.5 md:p-2 bg-gradient-to-br ${art.color} rounded-xl md:rounded-2xl cursor-pointer group flex flex-col min-h-0`}
            >
              <div className="flex-1 min-h-0 border-4 border-ohnahji-black flex items-center justify-center mb-1 rounded-lg md:rounded-xl overflow-hidden bg-white/20 relative">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-ohnahji-white border-4 border-ohnahji-black p-1 rounded-lg shadow-neo-sm group-hover:shadow-neo transition-all shrink-0">
                <p className="font-black text-center font-sans uppercase text-[9px] md:text-[11px] tracking-tighter">{art.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slide4Collections
