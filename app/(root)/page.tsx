import { fetchPostThreads } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  let res = await fetchPostThreads(1, 30);
  let user = await currentUser();

  console.log(res);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {res.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
            <>
              {res.posts.map((post: any) => {
                return (
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                    />
                  )
              })}
            </>
        )}
      </section>
    </>
  );
}
