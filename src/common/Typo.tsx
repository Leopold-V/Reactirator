import React from 'react'

export const Title = ({ title, className } : { title: string, className?: string }) => {
  return (
    <h3 className={`${className && className} block font-bold text-black text-center py-2`}>{title}</h3>
  )
};
