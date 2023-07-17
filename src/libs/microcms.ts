import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
 } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
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
  content: string;
  eyecatch?: MicroCMSImage;
 } & MicroCMSDate;

 // ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
   endpoint: "blog",
   queries,
  });
 
  return listData;
 };