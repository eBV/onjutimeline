export const CONTRACT_ADDRESS = '0xbef648e3034e80efe152f3581117c1536fff5afc'

export const IPFS_CID_GENESIS = 'bafybeicwcmxvwmrpb36zq2uzs3ujhimoeqnxvrpalb2efymgeqowlxv42i'
export const IPFS_CID_METADATA = 'bafybeiccpacwmuyqs5whb4h7bk7pe7f7rmbsmy3yzbdl4rhk5em5zzgx3e'
export const IPFS_CID_MINT_PLACEHOLDER = 'bafybeibp75o3ffrwthhnq57x4xgnbyzjjucukzca5b2wemkejcud4fg2ye'

export const GATEWAYS = [
  `https://${IPFS_CID_GENESIS}.ipfs.dweb.link`,
  `https://ipfs.io/ipfs/${IPFS_CID_GENESIS}`,
  `https://nftstorage.link/ipfs/${IPFS_CID_GENESIS}`,
  `https://cloudflare-ipfs.com/ipfs/${IPFS_CID_GENESIS}`,
]

export const getNFTImage = (tokenId: number): string => `${GATEWAYS[0]}/${tokenId}.png`

// Social & Community Links
export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/ohnahji',
  discordCampus: 'https://discord.com/invite/3ahyqHkhc7',
  twitter: 'https://twitter.com/ohnahji',
  instagram: 'https://instagram.com/ohnahji',
  youtube: 'https://youtube.com/@ohnahji',
  opensea: 'https://opensea.io/collection/ohnahji',
  etherscan: `https://etherscan.io/address/${CONTRACT_ADDRESS}`,
  twitch: 'https://twitch.tv/ohnahji',
} as const

// Streaming Embed URLs
export const YOUTUBE_PLAYLIST_ID = 'PLvmAix5Xj5Hk2rYwg2T0H-eMXdDbqSMH9'
export const TWITCH_CHANNEL = 'ohnahji'
