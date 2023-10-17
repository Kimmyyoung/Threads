'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { Input } from "../ui/input";
import { useRouter } from 'next/navigation';

interface Props {
  routerType : string
}

const SearchBar = ({ routerType } : Props) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        router.push(`/${routerType}?q=` + search)
      } else {
        router.push(`/${routerType}`)
      }
    }, 300);
  }, [search, routerType]);
  

  return (
    <div className="searchbar">
      <Image src="/assets/search-gray.svg" alt="search" width={24} height={24} className="object-contain" />
      <Input id='text' value={search} onChange={(e) => (setSearch(e.target.value))} placeholder={`${
          routerType !== "/search" ? "Search communities" : "Search creators"
        }`}
      className="no-focus searchbar_input" />
    </div>
  )
}

export default SearchBar;
