"use client";

import { useFetchSupNerdsMemberInfoData } from "@/utils/d3-fetch";
import type { MemberInfo } from "@/lib/type";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

export default function SupNerds() {
  const data = useFetchSupNerdsMemberInfoData("Support-Nerd.csv") as
    | MemberInfo[]
    | undefined;

  if (data)
    return (
      <div className="my-8 mx-auto w-full max-w-[928px] px-4 py-8 shadow-md hover:shadow-xl">
        <table className="w-full table-auto">
          <caption className="caption-top font-semibold">
            Support Nerds Team
          </caption>
          <thead>
            <tr className="text-gray-400">
              <th className="py-4 text-left">Name</th>
              <th className="hidden text-left md:table-cell">Join Date</th>
              <th className="hidden text-left md:table-cell">Language</th>
              <th className="text-left">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((each: MemberInfo) => (
              <tr
                key={each.id}
                className="border-t-2 border-solid border-gray-75 text-gray-500 duration-200 hover:translate-x-4 hover:bg-gray-100 hover:text-gray-700 hover:shadow-md"
              >
                <td className="flex flex-row items-start gap-4 p-2 py-4">
                  <img
                    src={each.avatar}
                    alt="avatar picture"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{each.nickname}</div>
                    <div className="text-xs">ID: {each.id}</div>
                  </div>
                </td>
                <td className="hidden p-2 py-4 md:table-cell">
                  {each.join_date}
                </td>
                <td className="hidden p-2 py-4 md:table-cell">
                  {each.language}
                </td>
                <td className="p-2 py-4">{each.role}</td>
                <td>
                  <button className="p-2 py-4">
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
