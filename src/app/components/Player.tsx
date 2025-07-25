import React from 'react'
import { Play, SkipBack, Clock, ClockFading, CirclePlay, SkipForward } from 'lucide-react'

const Player = () => {
  return (
    <div className="w-full bg-zinc-950 rounded-xl shadow-lg flex mt-4 items-center p-2 gap-5 text-zinc-200">
      {/* Controls */}
      <button className="p-2 hover:bg-zinc-900 rounded-full transition flex items-center justify-center"><SkipBack className="w-4 h-4" /></button>
      <ClockFading className="w-4 h-4" />
      <button className="p-2 hover:bg-zinc-900 rounded-full transition flex items-center justify-center"><Play className="w-4 h-4" /></button>
      <ClockFading className="w-4 h-4" />
      <button className="p-2 hover:bg-zinc-900 rounded-full transition flex items-center justify-center"><SkipForward className="w-4 h-4" /></button>
      <span className="mx-2 flex items-center gap-2 text-lg font-semibold tracking-wide"><Clock className="w-4 h-4" />03:12:37 <span className="font-normal text-base">(15-Jun-2025)</span></span>
      <span className="mx-2 flex items-center gap-2 px-3 py-1 rounded-full text-base font-medium shadow">1x</span>
      <button className="p-2 hover:bg-zinc-900 rounded-full transition flex items-center justify-center"><CirclePlay className="w-4 h-4" /></button>
    </div>
  )
}

export default Player