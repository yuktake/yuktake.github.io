import { getObject, getList, Blog } from "../../../libs/microcms";
import { notFound } from "next/navigation";
import { marked } from 'marked';

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
    <main className="flex min-h-screen flex-col items-center justify-start p-6 w-full">
      <div className="w-full place-items-center z-10 max-w-5xl justify-center font-mono flex">
        <p className="w-full break-all text-2xl font-bold font-mono flex justify-center border-b border-gray-300 w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
          {blog.title}
        </p>
      </div>

      <div className="flex flex-col items-center justify-start ">
        <div className="mt-2">
          <p>{blog.revisedAt}</p>
        </div>
      </div>

      <div className="w-full sm:w-full md:w-5/6 lg:w-1/2">
        <div className="prose">
          <div className="py-5" dangerouslySetInnerHTML={{__html: marked(blog.markdown ?? "", {mangle:false})}}/>
        </div>
      </div>
    </main>
  );
};