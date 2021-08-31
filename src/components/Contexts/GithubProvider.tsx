import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { ReactNode } from 'react-markdown';

export type GithubStateType = {
    token: string,
    reponame: string,
    push: boolean,
    visibility: 'public' | 'private';
}

type GithubContextType = {
    github: GithubStateType,
    setGithub: (github: GithubStateType) => void
}

const initialState: GithubStateType = {
    token: '',
    reponame: '',
    push: false,
    visibility: 'public'
}

const githubContext = createContext<GithubContextType>(null);

export const GithubProvider = ({ children }: { children: ReactNode}) => {
    const [github, setGithub] = useState<GithubStateType>(initialState);

    return (
        <githubContext.Provider value={{github, setGithub}}>
            { children }
        </githubContext.Provider>
    )
}

export const useGithub = () => {
    const { github, setGithub } = useContext(githubContext);
    return { github, setGithub };
}