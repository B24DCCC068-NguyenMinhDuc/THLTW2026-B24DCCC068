import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

interface Props {
  food: number
  hotel: number
  transport: number
}

function BudgetChart({ food, hotel, transport }: Props) {

  const series = [food, hotel, transport]

  const options: ApexOptions = {
    chart: {
      type: "pie"
    },
    labels: ["Food", "Hotel", "Transport"],
    legend: {
      position: "bottom"
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return val.toFixed(1) + "%"
      }
    }
  }

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="100%"
    />
  )
}

export default BudgetChart