import React from 'react'
import tracksList from '../../assets/tracksList'

import style from './style.module.scss'

export default function MainPage() {
  return (
    <div className={style.search}>
        <>Search Tracks</>
        <div className={style.list}>
            {tracksList.map(track => (
                <div key={track.id}>{ JSON.stringify(track) }</div>
            ))}
        </div>
    </div>
  )
}
