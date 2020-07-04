import React, { PropsWithChildren, ReactElement } from 'react';

export default function DefaultPadding({ children }: PropsWithChildren<any>): ReactElement<PropsWithChildren<any>> {
  return (
    <div style={{
      padding: '10px'
    }}>
      {children}
    </div>
  )
}
