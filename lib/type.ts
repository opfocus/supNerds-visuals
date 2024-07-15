export type { LinePlotProps, CommunityData };

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

type CommunityData = {
  category?: string;
  date: Date;
  count: number;
};
