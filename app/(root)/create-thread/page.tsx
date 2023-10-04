import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.action';
import PostThread from '@/components/form/PostThread';

async function Page() {
  const user = await currentUser();
  const userInfo = await fetchUser(user.id);

  if (!user) return null;
  // if (!userInfo?.onboarded) redirect('/onboarding');
  
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  )
}

export default Page;