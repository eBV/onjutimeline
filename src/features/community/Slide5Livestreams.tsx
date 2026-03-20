import { useState } from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, TWITCH_CHANNEL, YOUTUBE_PLAYLIST_ID } from '../../lib/constants'

const Slide5Livestreams = () => {
  const [activeTab, setActiveTab] = useState<'twitch' | 'youtube'>('twitch')

  return (
    <div className="min-h-full flex items-center justify-center py-8">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-ohnahji-gold text-ohnahji-black px-6 py-2 border-[6px] border-ohnahji-black rounded-2xl mb-6">
            <span className="text-sm font-bold font-sans">LIVE CONTENT</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-ohnahji-white mb-4">
            Livestream era
          </h1>
          <p className="text-xl text-ohnahji-gold font-bold font-sans">
            Watch live on Twitch and YouTube
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('twitch')}
            className={`px-8 py-4 border-[6px] font-black text-xl transition-all rounded-2xl font-sans ${activeTab === 'twitch'
              ? 'bg-purple-600 text-white border-ohnahji-black shadow-neo-lg'
              : 'bg-ohnahji-burgundy text-ohnahji-white border-ohnahji-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
          >
            TWITCH
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-8 py-4 border-[6px] font-black text-xl transition-all rounded-2xl font-sans ${activeTab === 'youtube'
              ? 'bg-ohnahji-gold text-ohnahji-black border-ohnahji-black shadow-neo-lg'
              : 'bg-ohnahji-burgundy text-ohnahji-white border-ohnahji-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
          >
            Youtube
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="video-container aspect-video bg-ohnahji-burgundy rounded-3xl overflow-hidden border-[6px] border-ohnahji-black"
        >
          {activeTab === 'twitch' ? (
            <iframe
              src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${window.location.hostname}&muted=true`}
              style={{ border: 'none' }}
              allowFullScreen
              title="Twitch Stream"
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Channel"
              className="w-full h-full"
            />
          )}
        </motion.div>

        <p className="text-center text-ohnahji-white font-bold mt-4 font-sans">
          {activeTab === 'twitch' ? SOCIAL_LINKS.twitch.replace('https://', '') : SOCIAL_LINKS.youtube.replace('https://', '') + '/streams'}
        </p>
      </div>
    </div>
  )
}

export default Slide5Livestreams
