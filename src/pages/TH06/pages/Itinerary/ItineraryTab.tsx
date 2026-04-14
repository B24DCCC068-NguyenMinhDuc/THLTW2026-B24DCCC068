import { useState } from "react"
import { Row, Col, Button, Typography } from "antd"

import { destinations as mockData } from "../../data/mockData"
import { Destination } from "../../types/destination"
import { DayPlan } from "../../types/itinerary"

import DestinationSelector from "../../components/itinerary/DestinationSelector"
import DayPlanner from "../../components/itinerary/DayPlanner"
import ItinerarySummary from "../../components/itinerary/ItinerarySummary"

const { Title } = Typography

function ItineraryTab() {

  const [plans, setPlans] = useState<DayPlan[]>([
    { day: 1, destinations: [] },
    { day: 2, destinations: [] }
  ])

  const [selectedDay, setSelectedDay] = useState(1)

  const addDestination = (id: number) => {
    const destination = mockData.find(d => d.id === id)

    if (!destination) return

    const updated = plans.map((plan) => {

      if (plan.day === selectedDay) {
        return {
          ...plan,
          destinations: [...plan.destinations, destination]
        }
      }

      return plan
    })

    setPlans(updated)
  }

  const removeDestination = (id: number, day: number) => {

    const updated = plans.map((plan) => {

      if (plan.day === day) {
        return {
          ...plan,
          destinations: plan.destinations.filter(d => d.id !== id)
        }
      }

      return plan
    })

    setPlans(updated)
  }

  const addDay = () => {
    const newDay = plans.length + 1

    setPlans([
      ...plans,
      { day: newDay, destinations: [] }
    ])
  }

  const allDestinations = plans.flatMap(p => p.destinations)

  return (
    <div>

      <Title level={4}>Tạo lịch trình du lịch</Title>

      <Row gutter={20}>

        <Col xs={24} md={16}>

          <div style={{ marginBottom: 20 }}>

            <DestinationSelector
              destinations={mockData}
              onSelect={addDestination}
            />

            <Button
              style={{ marginLeft: 10 }}
              onClick={addDay}
            >
              Thêm ngày
            </Button>

          </div>

          {plans.map(plan => (
            <DayPlanner
              key={plan.day}
              day={plan.day}
              destinations={plan.destinations}
              onRemove={(id) => removeDestination(id, plan.day)}
            />
          ))}

        </Col>

        <Col xs={24} md={8}>

          <ItinerarySummary
            destinations={allDestinations}
          />

        </Col>

      </Row>

    </div>
  )
}

export default ItineraryTab