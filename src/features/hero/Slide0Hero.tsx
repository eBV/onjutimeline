import { motion } from 'framer-motion'

const Slide0Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-ohnahji-pink/10 rounded-full blur-3xl -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-3 md:space-y-6 mt-4 md:-mt-[2px]"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative group min-h-[155px] md:min-h-[200px] flex items-center justify-center">
            {/* Layer 1: Bottom (Shadow) */}
            <h1
              className="text-[7.4rem] sm:text-8xl md:text-[12rem] font-black leading-none text-black absolute translate-x-2 translate-y-2"
              style={{ WebkitTextStroke: '6px black' }}
            >
              Ohnahji
            </h1>
            {/* Layer 2: Middle (Outline) */}
            <h1
              className="text-[7.4rem] sm:text-8xl md:text-[12rem] font-black leading-none text-white absolute"
              style={{ WebkitTextStroke: '6px black' }}
            >
              Ohnahji
            </h1>
            {/* Layer 3: Top (Fill) */}
            <h1
              className="text-[7.4rem] sm:text-8xl md:text-[12rem] font-black leading-none text-white relative z-10"
              style={{ WebkitTextStroke: '0px' }}
            >
              Ohnahji
            </h1>
          </div>
        </div>

        <p className="text-xl sm:text-3xl md:text-5xl font-bold text-ohnahji-pink max-w-4xl mx-auto leading-tight px-4 mt-3 md:mt-6">
          Your Homebase For Learning<br />Emerging Technologies
        </p>
      </motion.div>

      <div className="mt-12 md:mt-2 flex flex-row items-center gap-6">
        <p className="text-ohnahji-white font-black text-sm tracking-widest uppercase">Scroll to Explore</p>
        <div className="w-12 h-8 border-4 border-ohnahji-white rounded-full p-1 relative overflow-hidden flex items-center">
          <motion.div
            animate={{ x: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 bg-ohnahji-gold rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Slide0Hero
