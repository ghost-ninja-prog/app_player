import { createContext, useState } from 'react'
import tracksList from '../assets/tracksList'


const defaultTrack = tracksList[0]
const audio = new Audio(defaultTrack.src)

export const AudioContext = createContext({})

const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(defaultTrack)
    const [isPlaying, setPlaying] = useState(false)


    const handleToggleAudio = (track) => {
        if (currentTrack.id !== track.id) {
            setCurrentTrack(track)
            setPlaying(true)

            audio.src = track.src
            audio.load()
            audio.addEventListener('loadedmetadata', () => {
                audio.currentTime = 0
                audio.play()
            })
            return
        }
        if (isPlaying) {
            audio.pause()
            setPlaying(false)
        } else {
            audio.play()
            setPlaying(true)
        }
        
    }
    
    const nextAudio = (trackPlaying) => {
        console.log('nextAudio')
        audio.currentTime = 0
        const index = tracksList.findIndex(track => track.id === trackPlaying.id)
        if(index < tracksList.length) {
            handleToggleAudio(tracksList[index + 1])
        } else {
            handleToggleAudio(tracksList[0])
        }
    }
    
    const value = { currentTrack, isPlaying, handleToggleAudio, nextAudio, audio }

    return <AudioContext.Provider value={value}>{ children }</AudioContext.Provider>
}
export default AudioProvider