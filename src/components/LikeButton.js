import React, { useEffect, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { isBrowser } from '../utils/runtime'

const isPathLiked = path => {
  if (isBrowser() && window.localStorage.getItem('likedPaths')) {
    return path in JSON.parse(window.localStorage.getItem('likedPaths') || '{}')
  }
  return false
}

const addLikedPath = (id, path) => {
  if (isBrowser()) {
    let likedPaths = JSON.parse(window.localStorage.getItem('likedPaths'))
    if (likedPaths) {
      likedPaths[path] = id
    } else {
      likedPaths = { [path]: id }
    }
    window.localStorage.setItem('likedPaths', JSON.stringify(likedPaths))
  }
}

const removeLikedPath = path => {
  if (isBrowser()) {
    let likedPaths = JSON.parse(window.localStorage.getItem('likedPaths'))
    if (likedPaths) {
      delete likedPaths[path]
      window.localStorage.setItem('likedPaths', JSON.stringify(likedPaths))
    }
  }
}

const getIdForLikedPath = path => {
  if (isBrowser()) {
    let likedPaths = JSON.parse(window.localStorage.getItem('likedPaths'))
    if (likedPaths) {
      return likedPaths[path]
    }
  }
  return null
}

const LikeButton = () => {
  const pathname = isBrowser() ? window.location.pathname : undefined
  const [liked, setLiked] = useState(isPathLiked(pathname))
  const [likeCount, setLikeCount] = useState(null)

  useEffect(() => {
    if (isBrowser() && window.localStorage.getItem('likedPaths')) {
      if (
        Array.isArray(JSON.parse(window.localStorage.getItem('likedPaths')))
      ) {
        window.localStorage.removeItem('likedPaths')
      }
    }
  }, [])

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

  const toggleLike = () => {
    if (!liked) {
      setLiked(true)

      if (isBrowser()) {
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
            addLikedPath(json.ref['@ref'].id, pathname)
          })
      }
    } else {
      setLiked(false)

      if (isBrowser()) {
        setLikeCount(likeCount - 1)
        const id = getIdForLikedPath(pathname)
        if (id) {
          fetch(`/.netlify/functions/likes/${id}`, {
            method: 'DELETE',
          })
            .then(response => {
              removeLikedPath(pathname)
              return response.json()
            })
            .then(json => {
              console.log(json)
            })
        }
      }
    }
  }

  return (
    <Fab aria-label="like" onClick={toggleLike}>
      <Badge badgeContent={likeCount} color="primary">
        <FavoriteIcon color={liked ? 'secondary' : 'action'} />
      </Badge>
    </Fab>
  )
}

export default LikeButton
