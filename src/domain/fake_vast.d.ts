export interface FakeVast {
  skipOffset: number
  duration: number
  mediaFile: string
  impressionTracker: string
  midrollTime: number
  position: 'preroll' | 'midroll' | 'postroll'
}
