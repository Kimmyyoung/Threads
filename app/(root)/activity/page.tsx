import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from '@/lib/actions/user.action';
import Image from 'next/image';
import Link from 'next/link'


const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  //get Activity
  const activity = await getActivity(userInfo._id);


  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((act : any) => (
              <Link key={act._id} href={`/thread/${act.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={act.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p>
                    <span className="mr-1 text-primary-500">
                      {act.author.name}
                    </span> {" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ): <p className="!text-base-regular text-light-3">No activity yet</p>}
      </section>
    </section>
  )
};

export default Page;