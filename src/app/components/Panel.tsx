"use client"
import React, { act, useEffect, useState } from 'react'
import Image from 'next/image'
import StaticPanel from '../../../public/images/static-panel.png'
import { getUnresolvedIncidents } from '../utils/getUnresolvedIncidents'
import { formatIncidentTime } from '../utils/formatIncidentTime'
import { TriangleAlert, DoorOpen, Plus, UserRoundCog, CheckCheck, Clock, Cctv } from 'lucide-react'
import { handleResolving } from '../utils/handleResolving'

const Panel = () => {
  const [unresolved, setUnresolved] = useState([])
  const [fading, setFading] = useState<{[key:string]: boolean}>({})
  const [activeIncident, setActiveIncident] = useState<any>()

  const fetchData = async () => {
    const data = await getUnresolvedIncidents()
    setUnresolved(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 ">
      
      {/* left panel */}
      <div className="w-full lg:w-[55%] relative min-h-[60vh]">
        <Image
          src={activeIncident?.thumbnailUrl || StaticPanel}
          alt="Static Panel"
          fill
          className="rounded-xl object-cover shadow-lg"
        />
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            <p className=' bg-zinc-900 border-1 border-zinc-800 rounded-xl p-2 flex items-center'>
                <Cctv className="w-4 h-4 mr-1 text-red-500" />
         {activeIncident ? activeIncident.cammera.name: "No Camera Selected"}
            </p>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <div className="w-24 h-16 bg-zinc-600 rounded overflow-hidden" />
          <div className="w-24 h-16 bg-zinc-600 rounded overflow-hidden" />
        </div>
      </div>

     {/* right panle */}
      <div className="w-full lg:w-[45%] h-[60vh]  flex flex-col gap-4 bg-zinc-800 p-4 rounded-xl shadow-md">
        {/* head */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TriangleAlert className="text-red-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-white">{unresolved?.length} Unresolved Incidents</h2>
          </div>
          
          <div className='flex'>
        <div className="flex -space-x-3">
          <DoorOpen className="bg-orange-800 text-yellow-300 p-2 rounded-full w-10 h-10 border-2 border-zinc-900" />
          <Plus className="bg-red-900 text-red-300 p-2 rounded-full w-10 h-10 border-2 border-zinc-900" />
          <UserRoundCog className="bg-blue-900 text-blue-300 p-2 rounded-full w-10 h-10 border-2 border-zinc-900" />
        </div>
          <span className="text-sm text-zinc-400 border-2 border-zinc-700 bg-zinc-800 px-3 py-1 rounded-full flex items-center gap-2">
            <CheckCheck className="text-green-500 w-4 h-4" />
            {20 - unresolved?.length} resolved
          </span>
          </div>
        </div>
    {/* incident list */}
        <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-2">
          {unresolved && unresolved.length > 0 ? (
            unresolved.map((incident: any, idx: number) => (
              <div
              onClick={() => setActiveIncident(incident)}
                key={incident.id || idx}
                className={`flex items-center gap-4  rounded-lg p-2 shadow border border-zinc-600 transition-opacity duration-300 ${fading[incident.id] ? 'opacity-0' : 'opacity-100'}`}
              >
                {/* image */}
                <div className="w-20 h-16 rounded overflow-hidden bg-zinc-700 flex-shrink-0">
                  {incident.thumbnailUrl ? (
                    <Image src={incident.thumbnailUrl} alt={incident.title || 'Incident'} width={80} height={64} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                        No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className='font-semibold font-family-jakarta'>{incident.type}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{incident.cammera.location}</span>
                  <span className="text-xs flex gap-2 text-zinc-500">
                    <Clock className='text-white text-bold w-4 h-4' />
                    {formatIncidentTime(incident.tsStart, incident.tsEnd)}
                  </span>
                </div>
                {/* Resolve button */}
                <button
                  onClick={async () => {
                    setFading((prev) => ({ ...prev, [incident.id]: true }));
                    setTimeout(() => {
                      setUnresolved((prev) => prev.filter((i: any) => i.id !== incident.id));
                    }, 300);
                    await handleResolving(incident.id);
                    fetchData();
                  }}
                  className="ml-auto text-yellow-400 hover:text-yellow-300 font-semibold text-sm flex items-center gap-1 px-2 py-1 rounded transition-colors"
                >
                  Resolve <span className="text-lg">&gt;</span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-zinc-400 text-center py-8">No unresolved incidents</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Panel
