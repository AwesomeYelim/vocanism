import axios from "axios";
import cheerio, { AnyNode, BasicAcceptedElems } from "cheerio";

const getHtml = async () => {
  try {
    // 1
    const html = await axios.get("https://softca.tistory.com/471");
    let ulList: {} = [];

    // 2
    const $ = cheerio.load(html.data);

    // const wordsList = $("div.tt_article_useless_p_margin table tbody");
    const wordsList = $("table tbody tr");
    let from = "";
    wordsList.map((i, element) => {
      if ($(element).find("td:first-child").text() && i) {
        (ulList as any)[i] = {
          rank: i + 1,
          root: $(element).find("td:first-child").text(),
          meaning: $(element).find("td:nth-child(2)").text().replace(/\s+/g, "").split(","),
          origin: $(element)
            .find("td:nth-child(3)")
            .text()
            .replace(/\s+/g, "")
            .split(",")
            .map((el) => {
              if (el.includes("from")) {
                const [w, f] = el.split("from");
                from = f;
                return w;
              }
              return el;
            }),
          from,
          ex: $(element)
            .find("td:nth-child(4)")
            .text()
            .replace(/\s/g, "")
            .split(",")
            .map((el) => {
              const [en, ko] = el.split("(");
              return { [en]: ko?.replace(")", "") };
            }),
        };
      }
    });
    console.log("bodyList : ", ulList);
  } catch (error) {
    console.error(error);
  }
};

getHtml();
