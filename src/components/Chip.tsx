import React from 'react';

interface ChipProps {
  child: string | React.ReactNode,
  bgColor: string
}

const Chip: React.FC<ChipProps> = ({ child, bgColor }) => {
  console.log(bgColor);
  return (
    <div className={`p-1 ${bgColor} text-center text-xs rounded-full text-white`}>
      {child}
    </div>
  )
}

export default Chip
