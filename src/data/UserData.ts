import axios from "axios";

export interface UserType {
    month: string;
    users: number;
  }
  export const fetchUserData = async (): Promise<UserType[]> => {
    try {
      const response = await axios.get('https://jsondummy.vercel.app/api/sales-data?type=users');
      
      // Extract user data from the response
      const userData: UserType[] = response.data.salesdata[0].sales;
  
      return userData;
    } catch (error) {
      console.error("Error fetching sales data:", error);
      return [];
    }
  };
 
  