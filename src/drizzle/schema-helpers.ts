import { z } from 'zod';

export type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type Location = {
  lat: number;
  lng: number;
} & Partial<Address>;

export type Pic = {
  url: string;
};

export type Vid = {
  url: string;
};

export type SeoInfo = {
  title: string;
  description: string;
  keywords: string[];
};

const domainSchema = z.string().url();
export type Domain = z.infer<typeof domainSchema>;

export type Require<T, K extends keyof T> = T & { [P in K]-?: T[P] };
