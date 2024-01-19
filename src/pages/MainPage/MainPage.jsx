import { useState } from 'react'
import tracksList from '../../assets/tracksList'

import style from './style.module.scss'
import Track from '../../components/Track/Track'
import { Input } from '@mui/material'

const runSearch = (query) => {
    if(!query) {
        return tracksList
    }
    const lowerCaseQuery = query.toLowerCase()
    return tracksList.filter(
        track => 
            track.title.toLowerCase().includes(lowerCaseQuery) || 
            track.artists.toLowerCase().includes(lowerCaseQuery)
    )
}

export default function MainPage() {

    const [tracks, setTracks] = useState(tracksList)

    const handleChange = (event) => {
        const foundTracks = runSearch(event.target.value)
        setTracks(foundTracks)
    }

  return (
    <div className={style.search}>
        <Input 
            className={style.input} 
            placeholder='Поиск треков' 
            onChange={handleChange}
        />
        <div className={style.list}>
            {tracks.map(track => (
                <Track key={track.id} {...track} />
            ))}
        </div>
    </div>
  )
}
