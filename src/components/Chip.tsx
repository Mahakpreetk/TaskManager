import React, { useRef } from 'react';

interface ChipProps {
  child: string | React.ReactNode,
  bgColor: string,
  onSelect?: (value: string) => void
}

const Chip: React.FC<ChipProps> = ({ child, bgColor, onSelect }) => {
  const myRef = useRef<HTMLDivElement>(null); 
  return (
    <div ref={myRef} onClick={()=>onSelect!(myRef.current?.innerText!)} className={`p-1 ${bgColor} text-center text-xs rounded-full text-white`}>
      {child}
    </div>
  )
}

export default Chip
