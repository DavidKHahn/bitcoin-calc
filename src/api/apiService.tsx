import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/calculate';

interface MiningInput {
  initial_investment: number;
  hash_rate: number;
  power_consumption: number;
  electricity_cost: number;
}

interface MiningResult {
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  dailyRevenueUSD: number;
  yearlyRevenueUSD: number;
  monthlyRevenueUSD: number;
  dailyProfitUSD: number;
  dailyRevenueBTC: number;
  monthlyRevenueBTC: number;
  yearlyRevenueBTC: number;
  monthlyProfitUSD: number;
  yearlyProfitUSD: number;
  breakevenTimeline: number;
  costToMine: number;
}

export const calculateMining = async (data: MiningInput): Promise<MiningResult> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
