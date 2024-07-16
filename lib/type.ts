export type { LinePlotProps, CommunityDataItem, CommunityDataArray };

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
} 

type CommunityDataArray = CommunityDataItem[] & {
  tickets: Date[]
}