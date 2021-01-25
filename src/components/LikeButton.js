import React, { useEffect, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { isBrowser } from '../utils/runtime'

const LikeButton = () => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(null)

  useEffect(() => {
    if (isBrowser()) {
      fetch('/api/likes')
        .then(response => response.json())
        .then(({ count }) => {
          setLikeCount(count)
          console.log(count)
        })
    }
  }, [])

  const incrementLike = () => {
    if (isBrowser()) {
      setLiked(true)
      setLikeCount(likeCount + 1)
      fetch('/api/likes', {
        body: JSON.stringify({}),
        method: 'POST',
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
        })
        .catch(() => {
          setLikeCount(likeCount - 1)
        })
    }
  }

  return (
    <Fab aria-label="like" onClick={incrementLike}>
      <Badge badgeContent={likeCount} color="primary">
        <FavoriteIcon color={liked ? 'secondary' : 'action'} />
      </Badge>
    </Fab>
  )
}

export default LikeButton
