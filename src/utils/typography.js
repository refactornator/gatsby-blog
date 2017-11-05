import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

funstonTheme.googleFonts = []
funstonTheme.bodyFontFamily = ['Ubuntu', 'sans-serif']
funstonTheme.headerFontFamily = ['Ubuntu', 'sans-serif']

const typography = new Typography(funstonTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
