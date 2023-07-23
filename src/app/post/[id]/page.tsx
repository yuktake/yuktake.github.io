import { getObject, getList, Blog } from "../../../libs/microcms";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getList();

  return posts.contents.map((post:Blog) => ({
    id: post.id,
  }))
}

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const blog = await getObject(id);
  // console.log(blog)

  if(blog.id == undefined) {
    notFound();
  }

  return <div className="m-4 font-bold">Post ID: {blog.id}</div>;
};