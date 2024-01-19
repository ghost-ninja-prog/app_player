import { createContext, useState } from 'react'
import tracksList from '../assets/tracksList'

export const AudioContext = createContext({})

const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0])
    const [isPlaying, setPlaying] = useState(false)

    const handleToggleAudio = (track) => {
        console.log('Click')
    }

    const value = { currentTrack, isPlaying, handleToggleAudio }

    return <AudioContext.Provider value={value}>{ children }</AudioContext.Provider>
}
export default AudioProvider