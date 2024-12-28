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

      <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-center justify-start max-w-880">
        {contents.map((blog) => (
          <div key={blog.id} className="mb-5 mt-5 w-full">
            <a href={"/post/"+blog.id} className="text-2xl font-bold font-mono break-all">{blog.title}</a>
            <div className="mt-2" dangerouslySetInnerHTML={{__html: blog.body ?? ""}}/>
            <span>--------</span>
          </div>
        ))}
      </div>
        
    </main>
  )
}