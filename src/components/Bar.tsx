import React from 'react'

export const Bar = () => {
    return (
      <div id="titlebar">
        <div id="drag-region">
          <div id="window-title">
            <a id="button_git">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff" width="25"><path d="M12 2A10 10 0 002 12a10 10 0 006.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 015 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0012 2z"></path></svg>
            </a>
          </div>
          <div id="window-controls">
            <div className="button" id="min-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e5e7eb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div className="button" id="max-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-maximize" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e5e7eb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="16 4 20 4 20 8" />
                <line x1="14" y1="10" x2="20" y2="4" />
                <polyline points="8 20 4 20 4 16" />
                <line x1="4" y1="20" x2="10" y2="14" />
                <polyline points="16 20 20 20 20 16" />
                <line x1="14" y1="14" x2="20" y2="20" />
                <polyline points="8 4 4 4 4 8" />
                <line x1="4" y1="4" x2="10" y2="10" />
              </svg>
            </div>
            <div className="button" id="restore-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-minimize" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e5e7eb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="5 9 9 9 9 5" />
                <line x1="3" y1="3" x2="9" y2="9" />
                <polyline points="5 15 9 15 9 19" />
                <line x1="3" y1="21" x2="9" y2="15" />
                <polyline points="19 9 15 9 15 5" />
                <line x1="15" y1="9" x2="21" y2="3" />
                <polyline points="19 15 15 15 15 19" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
            </div>
            <div className="button" id="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e5e7eb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
}
