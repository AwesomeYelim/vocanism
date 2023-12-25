import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

const config = {
  baseURL: proxyUrl + apiUrl,
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  },
};

export const translate = async (text: string) => {
  try {
    const res = await axios.post(
      proxyUrl + apiUrl,
      { source: 'en', target: 'ko', text },
      config,
    );
    return res.data.message.result.translatedText;

    // const res = await fetch(proxyUrl + apiUrl, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    //     'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    //   } as HeadersInit,
    // }).then((response) => response.json());

    // return res.json().data.message.result.translatedText;
  } catch (error) {
    console.log({ error });
  }
};
