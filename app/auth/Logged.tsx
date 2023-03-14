"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

type User = {
  image: string;
};

const Logged = ({ image }: User) => {
  return (
    <li className="list-none flex gap-8 items-center">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          className="w-14 rounded-full"
          src={image}
          alt=""
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
