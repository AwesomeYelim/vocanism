import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", override: true });

const translate = async (cont: string) => {
  // 서버실행 이전에 env path -> 개발환경으로 설정, env file 을 호출
  // dotEnv.config({ path: ".env.local", override: true });

  const config = {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    },
  };

  await axios
    .post("https://openapi.naver.com/v1/papago/n2mt", { source: "en", target: "ko", text: cont }, config)
    .then((res) => {
      console.log(res.data);

      return res;
    })
    .catch((err) => {
      console.log({ err });
    });
};

const excute = async () => {
  try {
    const key = process.env.DICTIONARY_KEY;

    const options = {
      method: "GET",
      url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/abba?key=${key}`,
    };
    const response = await axios.request(options);

    console.log(response.data);
    translate("abba");
  } catch (error) {
    console.error(error);
  }
};

excute();
