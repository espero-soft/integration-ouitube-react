export interface Video {
  _id?: string;
  name: string;
  description: string;
  uniqueCode: string;
  posterFiles?: any[],
  created_at?: Date;
  updated_at?: Date;
}
