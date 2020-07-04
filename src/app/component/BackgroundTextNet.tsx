import React, { PropsWithChildren, ReactElement } from 'react';
import Background from '../../assets/background.jpg';
import { DefaultPadding } from './index';

interface BackgroundProps {
  withDefaultPadding: boolean;
}

export default function BackgroundTextNet({ children, withDefaultPadding }: PropsWithChildren<BackgroundProps>): ReactElement<PropsWithChildren<BackgroundProps>> {
  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      {withDefaultPadding
        ? <DefaultPadding>{children}</DefaultPadding>
        : {children}}
    </div>
  );
}
BackgroundTextNet.defaultProps = {
  withDefaultPadding: true,
}
