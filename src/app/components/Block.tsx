"use client";

import axios from "axios";
import "./Block.scss";

interface Props {
  data?: number;
}

export const Block = (): JSX.Element => {
  const arr = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65)); // 알파벳
  return (
    <div className="block_wrapper">
      {arr.map((el) => {
        return (
          <div
            key={el}
            className="block"
            onClick={async (e) => {
              await axios.get(`/api/word`, { data: e.currentTarget.innerText }).then((res) => {
                console.log(res);
              });
            }}>
            {el}
          </div>
        );
      })}
    </div>
  );
};
