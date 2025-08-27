import React from 'react'

interface TInputWrapperProps {
  children: React.ReactNode
  className?: string
}

export const InputWrapper: React.FC<TInputWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-50 border border-gray-300 rounded-lg p-3 min-h-12 ${className}`}>
      {children}
    </div>
  )
}

InputWrapper.displayName = 'InputWrapper'
