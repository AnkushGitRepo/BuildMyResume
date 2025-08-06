import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className="w-full bg-blue-50 h-1 overflow-hidden rounded-[2px]">
      <div
        className="h-1 bg-linear-to-r from-blue-500/85 to-blue-700 transition-all rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default StepProgress