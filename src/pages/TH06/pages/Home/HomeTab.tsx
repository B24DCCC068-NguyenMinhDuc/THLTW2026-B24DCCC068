import { useState } from "react"
import { Typography } from "antd"
import { destinations as mockData } from "../../data/mockData"
import { Destination } from "../../types/destination"
import DestinationList from "../../components/destination/DestinationList"
import DestinationFilter from "../../components/destination/DestinationFilter"

const { Title } = Typography

function HomeTab() {
  const [filteredData, setFilteredData] = useState<Destination[]>(mockData)

  const handleTypeChange = (type: string) => {
    if (!type) {
      setFilteredData(mockData)
      return
    }

    const filtered = mockData.filter(d => d.type === type)
    setFilteredData(filtered)
  }

  const handleSortChange = (sortType: string) => {
    const sorted = [...filteredData]

    if (sortType === "price") {
      sorted.sort((a, b) => a.price - b.price)
    }

    if (sortType === "rating") {
      sorted.sort((a, b) => b.rating - a.rating)
    }

    setFilteredData(sorted)
  }

  return (
    <div>

      <Title level={4}>Khám phá điểm đến</Title>

      <DestinationFilter
        onTypeChange={handleTypeChange}
        onSortChange={handleSortChange}
      />

      <DestinationList destinations={filteredData} />

    </div>
  )
}

export default HomeTab