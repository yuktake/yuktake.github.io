import { getList } from "../libs/microcms";

export default async function Home() {
  const { contents } = await getList();

  return (
    <main className="flex flex-col items-center justify-start p-6 w-full">
      <div className="place-items-center z-10 w-full max-w-5xl items-center justify-center font-mono flex">
        <p className="text-2xl font-bold font-mono flex w-full justify-center border-b border-gray-300 w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
          Yuk&apos;s Blog
        </p>
      </div>

      <div className="flex flex-col items-start justify-start sm:w-full md:w-5/6 lg:w-1/2">
        {contents.map((blog) => (
          <div key={blog.id} className="mb-5 mt-5">
            <a href={"/post/"+blog.id} className="text-2xl font-bold font-mono">{blog.title}</a>
            <div className="mt-2" dangerouslySetInnerHTML={{__html: blog.body ?? ""}}/>
            <span>--------</span>
          </div>
        ))}
      </div>
        
    </main>
  )
}