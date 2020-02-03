import React, { useEffect, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { isBrowser } from '../utils/runtime'

const isPathLiked = path => {
  if (isBrowser() && window.localStorage.getItem('likedPaths')) {
    return JSON.parse(
      window.localStorage.getItem('likedPaths') || '[]'
    ).includes(path)
  }
  return false
}

const addLikedPath = path => {
  if (isBrowser()) {
    let likedPaths = JSON.parse(window.localStorage.getItem('likedPaths'))
    if (likedPaths) {
      likedPaths.push(path)
    } else {
      likedPaths = [path]
    }
    window.localStorage.setItem('likedPaths', JSON.stringify(likedPaths))
  }
}

const LikeButton = () => {
  const pathname = isBrowser() ? window.location.pathname : undefined
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(null)

  useEffect(() => {
    const pathLiked = isPathLiked(pathname)
    setLiked(pathLiked)

    if (isBrowser()) {
      fetch('/.netlify/functions/likes')
        .then(response => {
          return response.json()
        })
        .then(count => {
          setLikeCount(count)
          console.log(count)
        })
    }
  }, [])

  const onClick = () => {
    setLiked(true)

    if (isBrowser()) {
      addLikedPath(pathname)
      setLikeCount(likeCount + 1)
      fetch('/.netlify/functions/likes', {
        body: JSON.stringify({}),
        method: 'POST',
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          console.log(json)
        })
    }
  }

  return (
    <Fab aria-label="like" onClick={!liked ? onClick : undefined}>
      <Badge badgeContent={likeCount} color="primary">
        <FavoriteIcon color={liked ? 'secondary' : 'action'} />
      </Badge>
    </Fab>
  )
}

export default LikeButton
