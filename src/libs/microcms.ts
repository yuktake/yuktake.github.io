import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
 } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
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
 
  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(listData)
 
  return listData;
 };