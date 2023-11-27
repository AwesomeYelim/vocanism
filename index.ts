import axios from "axios";

const key = "87a86d65-05b0-4250-b2f3-c757c7bce66a";
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
