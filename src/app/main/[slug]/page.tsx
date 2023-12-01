import { getPost } from "@/service/words";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export default async function page({ params }: Props) {
  const { slug } = params;
  const res = await getPost(slug);
  console.log(res);

  return <></>;
}
