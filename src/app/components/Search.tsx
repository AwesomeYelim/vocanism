"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "./Search.scss";

interface Props {
  data?: number;
}

export const Search = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm();
  //
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      ref={formRef}>
      <label htmlFor="name">{/* <img src={Logo} alt="logo" /> */}</label>
      <div className="input_wrap">
        <input
          type="text"
          {...register("input", {
            required: { value: true, message: "is required" },
          })}
          required
          placeholder="검색어를 입력하세요."
        />
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
