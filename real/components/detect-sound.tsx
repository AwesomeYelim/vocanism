'use client';

import { ReactNode, useEffect } from 'react';
import speak from '~/app/libs/functions/sounds';

interface Props {
  data?: number;
}

export const DetectSound = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  useEffect(() => {
    window.addEventListener('dblclick', () => {
      return speak({ text: (window.getSelection() as Selection).toString() });
    });
  }, [speak]);

  return <>{children}</>;
};
