export interface NFT {
    tokenId?:string;
    name?: string;
    description?: string;
    external_url?: string;
    image?: string;
    logo?: string;
    attributes?: any[]; // You can define a more specific type if you know the structure
    owner?: string;
    media_type?:string;
  }

  export interface ListedNFT {
    tokenId?:string;
    name?: string;
    description?: string;
    external_url?: string;
    image?: string;
    logo?: string;
    attributes?: any[]; // You can define a more specific type if you know the structure
    owner?: string;
    media_type?:string;
    price?: number;
  }
