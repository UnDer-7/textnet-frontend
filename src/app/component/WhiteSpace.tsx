import React, { CSSProperties, ReactElement } from 'react';
import Verify from '../utils/Verify';

interface WhiteSpaceProps {
  spaceBottom?: number;
  spaceTop?: number;
}

export default function WhiteSpace({ spaceBottom, spaceTop }: WhiteSpaceProps): ReactElement<WhiteSpaceProps> {
  const style: CSSProperties = {
    width: '100%',
    marginBottom: `${spaceBottom}px`,
    marginTop: `${spaceTop}px`,
  };

  if (Verify.isNullOrUndefined(spaceBottom)) delete style.marginBottom;
  if (Verify.isNullOrUndefined(spaceTop)) delete style.marginTop;

  return (<div style={style}/>);
}
