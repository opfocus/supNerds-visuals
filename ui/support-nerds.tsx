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
  <div className=" p-4 w-full">
      <table className="mx-auto mt-8 w-full max-w-[928px] table-auto">
        <caption className="caption-top font-semibold">Support Nerds Team</caption>
        <thead>
          <tr className=" text-gray-400">
            <th className="py-4 text-left">Name</th>
            <th className="text-left">Join Date</th>
            <th className="text-left">Language</th>
            <th className="text-left">Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((each: MemberInfo) => (
            <tr key={each.id} className="border-t-2 border-solid border-gray-200">
              <td className="flex flex-row items-start gap-4 p-2 py-4">
                <img
                  src={each.avatar}
                  alt="avatar picture"
                  className="h-12 w-12 rounded-full"
                ></img>
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-gray-500">{each.nickname}</div>
                  <div className=" text-xs text-gray-500">
                    ID: {each.id}
                  </div>
                </div>
              </td>
              <td className="text-gray-500">{each.join_date}</td>
              <td className=" text-gray-500">{each.language}</td>
              <td className=" text-gray-500">{each.role}</td>
              <td>
                <button className=" ">
                  <EllipsisHorizontalIcon className=" w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
}
