export type {
  LinePlotProps,
  CommunityDataItem,
  CommunityDataArray,
  Avatars,
  MemberInfo,
};

type LinePlotProps = {
  data: {
    category: string;
    date: Date;
    count: number;
  }[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

type CommunityDataItem = {
  category?: string;
  date: Date;
  count: number;
};

type CommunityDataArray = CommunityDataItem[] & {
  tickets: Date[];
};

type Avatars = {
  id: string;
  hash: string;
};

type MemberInfo = {
  id: string;
  nickname: string;
  avatar: string;
  join_date: string;
  language: string;
  role: string;
};
