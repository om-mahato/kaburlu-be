import type * as CSS from 'csstype';
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

export type ArticleBlock = {
  h1: {
    text: string;
    styles: CSS.Properties;
  };
  h2: {
    text: string;
    styles: CSS.Properties;
  };
  h3: {
    text: string;
    styles: CSS.Properties;
  };
  list: {
    items: string[];
    styles: CSS.Properties;
  };
};

type ExtraUserInfo = {
  fatherName: string;
};

type ReporterRankInfo = {
  beureauInCharge?: string;
  staffReporter?: string;
  rcInCharge?: string;
};

type InfoByRole =
  | {
      level: 'beaureau';
      rank?: never;
    }
  | {
      level: 'staff';
      rank: Require<ReporterRankInfo, 'beureauInCharge'>;
    }
  | {
      level: 'rc';
      rank: Require<ReporterRankInfo, 'beureauInCharge' | 'staffReporter'>;
    }
  | {
      level: 'mandal';
      rank: Require<
        ReporterRankInfo,
        'beureauInCharge' | 'staffReporter' | 'rcInCharge'
      >;
    }
  | {
      level?: never;
      rank?: never;
    };

export type UserInfo = InfoByRole & ExtraUserInfo;
