import {
  CONTRACT_ADDRESS,
  IPFS_CID_GENESIS,
  IPFS_CID_METADATA,
  IPFS_CID_MINT_PLACEHOLDER,
  GATEWAYS,
  getNFTImage,
  SOCIAL_LINKS,
  TWITCH_CHANNEL,
  YOUTUBE_PLAYLIST_ID,
} from '../lib/constants'

describe('constants', () => {
  test('CONTRACT_ADDRESS is a valid Ethereum address', () => {
    expect(CONTRACT_ADDRESS).toMatch(/^0x[0-9a-fA-F]{40}$/)
  })

  test('IPFS CIDs are non-empty strings', () => {
    expect(IPFS_CID_GENESIS.length).toBeGreaterThan(0)
    expect(IPFS_CID_METADATA.length).toBeGreaterThan(0)
    expect(IPFS_CID_MINT_PLACEHOLDER.length).toBeGreaterThan(0)
  })

  test('IPFS CIDs are distinct', () => {
    const cids = new Set([IPFS_CID_GENESIS, IPFS_CID_METADATA, IPFS_CID_MINT_PLACEHOLDER])
    expect(cids.size).toBe(3)
  })

  test('GATEWAYS has 4 entries each containing IPFS_CID_GENESIS', () => {
    expect(GATEWAYS).toHaveLength(4)
    for (const gateway of GATEWAYS) {
      expect(gateway).toContain(IPFS_CID_GENESIS)
    }
  })

  test('GATEWAYS entries are distinct URLs', () => {
    expect(new Set(GATEWAYS).size).toBe(4)
  })

  test('getNFTImage returns a URL ending in /<id>.png', () => {
    expect(getNFTImage(1)).toMatch(/\/1\.png$/)
    expect(getNFTImage(8888)).toMatch(/\/8888\.png$/)
  })

  test('getNFTImage uses the first gateway', () => {
    expect(getNFTImage(42)).toContain(GATEWAYS[0])
  })

  test('SOCIAL_LINKS contains all required platforms', () => {
    expect(SOCIAL_LINKS.discord).toContain('discord')
    expect(SOCIAL_LINKS.twitter).toContain('twitter')
    expect(SOCIAL_LINKS.instagram).toContain('instagram')
    expect(SOCIAL_LINKS.youtube).toContain('youtube')
    expect(SOCIAL_LINKS.opensea).toContain('opensea')
    expect(SOCIAL_LINKS.etherscan).toContain(CONTRACT_ADDRESS)
    expect(SOCIAL_LINKS.twitch).toContain('twitch')
  })

  test('SOCIAL_LINKS URLs are valid https URLs', () => {
    for (const url of Object.values(SOCIAL_LINKS)) {
      expect(url).toMatch(/^https:\/\//)
    }
  })

  test('streaming constants are defined', () => {
    expect(TWITCH_CHANNEL).toBe('ohnahji')
    expect(YOUTUBE_PLAYLIST_ID.length).toBeGreaterThan(0)
  })
})
