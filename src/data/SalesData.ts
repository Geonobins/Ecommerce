import axios from 'axios';

export interface SalesType {
  month: string;
  livingroom: number;
  dining: number;
  bedroom: number;
}

export const fetchSalesData = async (): Promise<SalesType[]> => {
  try {
    const response = await axios.get('https://jsondummy.vercel.app/api/sales-data?type=furniture');
    
    // Extract sales data from the response
    const salesData: SalesType[] = response.data.salesdata[0].sales;

    return salesData;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};
