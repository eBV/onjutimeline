import { motion } from 'framer-motion'
import { Twitter, Instagram, MessageCircle, Youtube } from 'lucide-react'
import { SOCIAL_LINKS } from '../../lib/constants'

const Slide6Socials = () => {
  const web2Socials = [
    { name: 'Discord', link: SOCIAL_LINKS.discord, icon: <MessageCircle size={32} />, color: 'bg-[#5865F2]' },
    { name: 'Twitter', link: SOCIAL_LINKS.twitter, icon: <Twitter size={32} />, color: 'bg-[#1DA1F2]' },
    { name: 'Instagram', link: SOCIAL_LINKS.instagram, icon: <Instagram size={32} />, color: 'bg-[#E1306C]' },
    { name: 'YouTube', link: SOCIAL_LINKS.youtube, icon: <Youtube size={32} />, color: 'bg-[#FF0000]' },
  ]

  const web3Socials = [
    { name: 'OpenSea', link: SOCIAL_LINKS.opensea, icon: '🌊', color: 'bg-[#2081E2]' },
    { name: 'Etherscan', link: SOCIAL_LINKS.etherscan, icon: '🔍', color: 'bg-[#21325E]' },
  ]

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="neo-card bg-ohnahji-white p-6 md:p-12 rounded-[3.5rem] relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ohnahji-gold/20 rounded-full -translate-y-1/2 translate-x-1/2 -z-0" />

          <div className="relative z-10 text-center mb-12">
            <h2 className="text-5xl font-black text-ohnahji-burgundy mb-4">Join the community</h2>
            <p className="text-xl text-ohnahji-burgundy/70 max-w-xl mx-auto">
              Follow us across the web and stay updated on the latest in emerging tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {/* Social links grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...web2Socials, ...web3Socials].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className={`${social.color} p-4 flex flex-col items-center gap-2 rounded-3xl border-[6px] border-ohnahji-black shadow-neo hover:shadow-neo-lg transition-all text-white`}
                >
                  <span className="text-3xl">{social.icon}</span>
                  <span className="font-bold text-sm tracking-wide font-sans">{social.name}</span>
                </motion.a>
              ))}
            </div>

            {/* CTA section */}
            <div className="flex flex-col justify-center gap-6 p-4 md:p-8 bg-ohnahji-burgundy rounded-[2.5rem] border-[6px] border-ohnahji-black shadow-neo text-white">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-ohnahji-gold">Become a member</h3>
                <p className="font-bold text-ohnahji-white/80 font-sans">Get exclusive access to our private community and events.</p>
              </div>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-ohnahji-pink text-white border-[6px] border-ohnahji-black shadow-neo hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-active transition-all text-center font-black text-xl rounded-2xl font-sans neo-button-flood"
              >
                Join Discord
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Slide6Socials
