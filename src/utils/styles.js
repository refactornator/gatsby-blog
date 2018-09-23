import { keyframes } from 'styled-components'

const colors = {
  royal: '#366ddc',
  sapphire: '#2955ae',
  midnight: '#00527e',
  shadow: '#0e2451',
  plum: '#583452',
  berry: '#a24352',
  ruby: '#ec5252',
  tangerine: '#f2744c',
  creamsicle: '#f99645',
  solar: '#ffb83f',
  store: '#ced1d6',
  snuggles: '#829fd9',
}

const easings = {
  inOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
}

const animations = {
  growShrink: keyframes`
    from { transform: none; }
    50% { transform: scale(1.5); }
    to { transform: none;}
  `,

  spin: keyframes`
    from { transform: none; }
    50% { transform: rotate(360deg); }
    to { transform: none; }
  `,

  lineDisappear: keyframes`
    from { stroke-dashoffset: null; }
    50% { stroke-dashoffset: 50; }
    to { stroke-dashoffset: null; }
  `,

  lineCrawl: keyframes`
    from { stroke-dashoffset: null; }
    50% { stroke-dashoffset: 0; }
    to { stroke-dashoffset: null; }
  `,
}

export { colors, easings, animations }
