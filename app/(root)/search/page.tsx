
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUserPosts, fetchUsers } from "@/lib/actions/user.action";

import { profileTabs } from "@/constants";
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';


import UserCard from '@/components/cards/UserCard';

async function Page() {   
  
  const user = currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25
  });

  return (
    <section>
      <h1 className="head-text">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
            <>
              {result.users.map((person) => {
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  imgUrl={person.image}
                  personType='User'
                />
              })}
            </>
        )}
      </div>
    </section>
  )
};

export default Page;
