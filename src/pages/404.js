import React from 'react'

import webm from '../video/404.webm'
import mp4 from '../video/404.mp4'

const NotFoundPage = () => (
  <video
    autoPlay
    loop
    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
  >
    <source src={webm} type="video/webm" />
    <source src={mp4} type="video/mp4" />
  </video>
)

export default NotFoundPage
