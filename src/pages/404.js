import React from 'react'
import { DefaultPlayer as Video } from 'react-html5video'
import 'react-html5video/dist/styles.css'

import webm from '../video/404.webm'
import mp4 from '../video/404.mp4'

const NotFoundPage = () => (
  <Video
    autoPlay
    loop
    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
  >
    <source src={webm} type="video/webm" />
    <source src={mp4} type="video/mp4" />
  </Video>
)

export default NotFoundPage
