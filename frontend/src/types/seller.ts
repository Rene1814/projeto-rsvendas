export type SellerLevel = 'JUNIOR' | 'PLENO' | 'SENIOR';

export type Seller = {
    id: number;
    name: string;
    email: string | null;
    sellerLevel: SellerLevel | null;
}