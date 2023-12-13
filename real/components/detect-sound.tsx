'use client';

import axios from 'axios';
import { ReactNode, useCallback, useEffect } from 'react';
import speak, { detectedLanguage } from '~/libs/sounds';

export const DetectSound = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const tooltipEvent = useCallback(async (e: MouseEvent) => {
    const root = document.querySelector('body') as HTMLBodyElement;

    const tooltipRoot = document.createElement('div');
    tooltipRoot.classList.add('tooltip');
    root.appendChild(tooltipRoot);

    const selectedText = (window.getSelection() as Selection).toString();

    if (
      selectedText.replace(/\s/g, '') &&
      detectedLanguage(selectedText) !== 'kor'
    ) {
      const range = (window.getSelection() as Selection).getRangeAt(0);
      const rect = range.getBoundingClientRect();

      tooltipRoot.style.position = 'absolute';
      tooltipRoot.style.top = `${rect.bottom + window.scrollY}px`;
      tooltipRoot.style.left = `${rect.left + window.scrollX}px`;

      tooltipRoot.style.backgroundColor = 'black';
      tooltipRoot.style.color = '#fff';
      tooltipRoot.style.fontSize = '0.8rem';
      tooltipRoot.style.padding = '3px 7px';
      tooltipRoot.style.borderRadius = '3px';

      /** cors 에러로 서버생성 및 우회해서 요청 보냄 -예림 */
      tooltipRoot.innerText =
        ((await axios
          .post('/api/trans', JSON.stringify(selectedText), {
            headers: {
              'Content-Type': `application/json`,
            },
          })
          .then((res) => {
            return res.data.res;
          })) as string) || '-';
    }
    const removeTooltip = () => {
      root.removeChild(tooltipRoot);
      window.removeEventListener('mouseup', removeTooltip);
    };

    window.addEventListener('mouseup', removeTooltip);
    return () => {
      root.removeChild(tooltipRoot);
      window.removeEventListener('mouseup', removeTooltip);
    };
  }, []);
  const detectEvent = useCallback((e: MouseEvent) => {
    speak({ text: (window.getSelection() as Selection).toString() });
    tooltipEvent(e);
  }, []);

  useEffect(() => {
    window.addEventListener('dblclick', detectEvent);
    window.addEventListener('mouseup', detectEvent);
    return () => {
      window.removeEventListener('dblclick', detectEvent);
      window.removeEventListener('mouseup', detectEvent);
    };
  }, []);

  return <>{children}</>;
};
