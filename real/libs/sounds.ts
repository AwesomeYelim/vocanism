import { franc } from 'franc';

function speak({
  text,
  opt_prop: opt_prop = { rate: 1, pitch: 1, lang: 'en-US' },
  momentWorking: { endFn, startFn } = {},
}: {
  text: string;
  opt_prop?: {
    rate: number;
    pitch: number;
    // lang: selectLang.options[selectLang.selectedIndex].value,
    lang: string;
  };
  momentWorking?: { startFn?: () => void; endFn?: () => void };
}) {
  if (
    typeof SpeechSynthesisUtterance === 'undefined' ||
    typeof window.speechSynthesis === 'undefined'
  ) {
    alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
    return;
  }
  window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

  const prop = opt_prop || {};

  const speechMsg = new SpeechSynthesisUtterance();
  speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
  speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
  speechMsg.lang = prop.lang || 'ko-KR';
  speechMsg.text = text;

  const detectedLanguage = franc(text, { minLength: 1 });

  speechMsg.onstart = () => {
    return startFn?.();
  };

  if (detectedLanguage !== 'kor') window.speechSynthesis.speak(speechMsg);

  speechMsg.onend = () => {
    endFn?.();
    return () => (startFn as () => void)();
  };
}

export default speak;
