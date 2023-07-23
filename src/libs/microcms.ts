import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
 } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  customFetch: (input, init) => {
    if (typeof input === 'string') {
      const newInput = new URL(input)
      const time = new Date()
      newInput.searchParams.set('cacheclearparam', `${time.getMinutes()}`)
      return fetch(newInput.href, init)
    }
    return fetch(input, init)
  },
});

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  body: string;
  eyecatch?: MicroCMSImage;
 } & MicroCMSDate;

 // ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
   endpoint: "blogs",
   queries,
  });
 
  return listData;
 };

  // ブログ詳細を取得
export const getObject = async (contentId: string, queries?: MicroCMSQueries) => {

  const objectData = await client.get({
   endpoint: "blogs",
   contentId: contentId,
   queries,
  })
  .then((res) => {
    // console.log(res)
    return res;
  })
  .catch((res) => {
    return {
      notFound: true,
    };
  });
 
  return objectData;
 };