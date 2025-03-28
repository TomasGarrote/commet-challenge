export interface StandardDeal {
    id: string;
    salesperson: string;
    amount: number;
    date: string;
  }
 
// modelo de CRM A (JSON)
interface RawDealA {
    deal_id: string;
    total?: number;
    amount?: number;
    rep_name: string;
    sold_at?: string;
    created_on?: string;
  }

// modelo de CRM B (CSV)
interface RawDealB {
    opportunity_id: string;
    amount: number;
    seller: string;
    deal_date: string;
  }

export const transformDealsA = (deals: RawDealA[]): StandardDeal[] => {
    return deals.map(deal => ({
        id: deal.deal_id,
        salesperson: deal.rep_name,
        amount: deal.total ?? deal.amount ?? 0, // varificamos que amount no sea undefined o null
        date: deal.sold_at ? new Date(deal.sold_at).toISOString() : 
        deal.created_on ? new Date(deal.created_on).toISOString() : "",  // verificamos, tomamos la fecha y la convertimos en un ISOString
    }));
};

export const transformDealsB = (deals: RawDealB[]): StandardDeal[] => {
    return deals.map(deal => ({
      id: deal.opportunity_id,
      salesperson: deal.seller,
      amount: deal.amount,
      date: deal.deal_date ? new Date(deal.deal_date).toISOString() : "", // Toma la fecha y la convierte en un ISOString
    }));
};

export const transformDealsAPI = (deals: StandardDeal[]): StandardDeal[] => { 
        return deals.map(deal => ({
        id: deal.id,
        salesperson: deal.salesperson,
        amount: deal.amount,
        date: deal.date, 
      }));
};