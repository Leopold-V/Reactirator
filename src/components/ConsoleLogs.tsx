// @ts-nocheck

import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

export const ConsoleLogs = () => {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        Hook(
          window.console,
          (log) => setLogs((currLogs) => [...currLogs, log]),
          false
        )
        return () => Unhook(window.console)
      }, [])
    

    return (
        <div className="bg-black rounded overflow-auto h-56">
            <Console logs={logs} variant="dark" />
        </div>
    )
}
