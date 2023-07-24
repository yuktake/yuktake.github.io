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

  if(blog.id == undefined) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="place-items-center z-10 w-full max-w-5xl items-center justify-center font-mono flex">
        <h1 className="text-2xl font-bold font-mono flex w-full justify-center border-b border-gray-300 w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
          {blog.title}
        </h1>
      </div>
      <div className="mt-2">
        <p>{blog.revisedAt}</p>
      </div>

      <div className="py-5" dangerouslySetInnerHTML={{__html: blog.body ?? ""}}/>
    </main>
  );
};