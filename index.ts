import axios from "axios";

const key = process.env.DICTIONARY_KEY;

const options = {
  method: "GET",
  url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/over?key=${key}`,
};

const excute = async () => {
  try {
    const response = await axios.request(options);
    // console.log(
    //   response.data.filter((el: { [key: string]: any }) => el.fl === "prefix")
    //   // .map((el: { [key: string]: any }) => el.def)
    // );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

excute();
