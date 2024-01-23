import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '../../context/AudioContext'
import { IconButton, Slider, Stack } from '@mui/material'
import { Pause, PlayArrow, VolumeUpRounded, VolumeOff } from '@mui/icons-material'

import style from './playbar.module.scss'
import secondsToMMSS from '../../utils/secondsToMMSS'

const TimeControls = () => {
    const { audio, currentTrack } = useContext(AudioContext)
    const { duration } = currentTrack 

    const [currentTime, setCurrentTime] = useState(0)
    const formattedCurrentTime = secondsToMMSS(currentTime)

    const sliderCurrentTime = Math.round((currentTime / duration) * 100)


    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration)
        setCurrentTime(time)
        audio.currentTime = time
    }


    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)
        return () => {
            clearInterval(timeInterval)
        }
    }, [])


    return (
        <>
            <p>{ formattedCurrentTime }</p>
            <Slider 
                step={1} 
                min={0} 
                max={100} 
                value={sliderCurrentTime}
                onChange={handleChangeCurrentTime}
            />
        </>
    )
}

export default function Playbar() {
    const [mute, setMute] = useState(false)

    const { audio, currentTrack, handleToggleAudio, nextAudio, isPlaying } = useContext(AudioContext)

    const { title, artists, preview, duration } = currentTrack

    const formattedDuration = secondsToMMSS(duration)


    const handleChangeVolume = (_, value) => {
        audio.volume = value/100
    }
    const handleMuteButton = () => {
        setMute(!mute)
        audio.muted = !mute
    }

    

    
    useEffect(() => {
        audio.addEventListener('ended', () => nextAudio(currentTrack))
        console.log('ue next Audio')
        return audio.removeEventListener('ended', () => nextAudio(currentTrack))
    }, [currentTrack])

  return (
    <div className={style.playbar}>
        <img className={style.preview} src={preview} alt='' />
        <IconButton onClick={() => handleToggleAudio(currentTrack)}>
            { isPlaying ? <Pause /> : <PlayArrow /> }
        </IconButton>
        <div className={style.credits}>
            <h4>{title}</h4>
            <p>{artists}</p>
        </div>
        <Stack 
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ width: '300px' }}
        >
            <IconButton onClick={handleMuteButton}>
                { mute ? <VolumeOff /> : <VolumeUpRounded /> }
            </IconButton>
            <Slider
                aria-label='volume'
                defaultValue={30}
                onChange={handleChangeVolume}
            />
        </Stack>
        <div className={style.slider}>
            <TimeControls  />
            <p>{formattedDuration}</p>
        </div>
    </div>
  )
}
