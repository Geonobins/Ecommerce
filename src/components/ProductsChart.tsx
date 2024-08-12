"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {fetchSalesData,SalesType} from "@/data/SalesData"
import ButtonComponent from "./ButtonComponent"
import { useEffect, useState } from "react"


const chartConfig = {
  livingroom: {
    label: "Living Room",
    color: "hsl(var(--chart-1))",
  },
  dining: {
    label: "Dining",
    color: "hsl(var(--chart-2))",
  },
  bedroom: {
    label: "Bed Room",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig






export function ProductsChart() {
  const[livingFilter,setLivingFilter] = useState(true)
  const[bedroomFilter,setBedroomFilter] = useState(true)
  const[diningFilter,setDiningFilter] = useState(true)
  const [salesData, setSalesData] = useState<SalesType[]>([]);


  useEffect(() => {
    const getData = async () => {
      const data = await fetchSalesData();
      setSalesData(data.slice(0,6));
    };

    getData();
    
  }, []);
  

  return (
    <Card className="min-w-[80%]">
      <CardHeader>
        <CardTitle>Sales
          <div className="flex text-sm  gap-6  justify-center"> 
            <div onClick={()=>setLivingFilter(!livingFilter)}>
            <ButtonComponent value="Living"  cl={`border border-orange-700 hover:bg-orange-300 ${livingFilter && "bg-orange-400"}`}/>
            </div>
            <div onClick={()=>setBedroomFilter(!bedroomFilter)}>
            <ButtonComponent value="Bedroom" cl={`border border-blue-700 hover:bg-blue-300 ${bedroomFilter && "bg-blue-400"}`}/>
            </div>
            <div onClick={()=>setDiningFilter(!diningFilter)}>
            <ButtonComponent value="Dining" cl={`border border-green-700 hover:blue-green-300 ${diningFilter && "bg-green-400"}`}/>
            </div>
          </div>
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={salesData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true}  content={<ChartTooltipContent />} />
            {livingFilter &&<Line
              dataKey="livingroom"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            
              
            />}
           
            {bedroomFilter && <Line
              dataKey="bedroom"
              type="monotone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              
            />}
             {diningFilter && <Line
              dataKey="dining"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              
            />}
            
            
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing sales of last year
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
