import { useContext } from 'react'
import style from './track.module.scss'
import { IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import cn from 'classnames'
import secondsToMMSS from '../../utils/secondsToMMSS'

import { AudioContext } from '../../context/AudioContext'

export default function Track(track) {

    const { preview, title, artists, duration } = track

    const { handleToggleAudio, currentTrack, isPlaying } = useContext(AudioContext)

    const isCurrentTrack = currentTrack.id === track.id

    const formattedDuration = secondsToMMSS(duration)

  return (
    <div className={cn(style.track, (isCurrentTrack && isPlaying ) && style.playing)}>
        <IconButton onClick={() => handleToggleAudio(track)}>
            { isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <img className={style.preview} src={preview} alt='' />
        <div className={style.credits}>
            <b>{title}</b>
            <p>{artists}</p>
        </div>
        <p>{formattedDuration}</p>
    </div>
  )
}
