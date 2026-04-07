import { Layout, Tabs, Typography } from "antd"

import HomeTab from "./pages/Home/HomeTab"
import ItineraryTab from "./pages/Itinerary/ItineraryTab"
import BudgetTab from "./pages/Budget/BudgetTab"
import AdminTab from "./pages/Admin/AdminTab"

const { Header, Content } = Layout
const { TabPane } = Tabs
const { Title } = Typography

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Header style={{ background: "#1677ff" }}>
        <Title style={{ color: "white", margin: 0 }} level={3}>
          Travel Planner
        </Title>
      </Header>

      <Content style={{ padding: "24px" }}>

        <Tabs defaultActiveKey="1" type="card">

          <TabPane tab="Khám phá" key="1">
            <HomeTab />
          </TabPane>

          <TabPane tab="Lịch trình" key="2">
            <ItineraryTab />
          </TabPane>

          <TabPane tab="Ngân sách" key="3">
            <BudgetTab />
          </TabPane>

          <TabPane tab="Quản trị" key="4">
            <AdminTab />
          </TabPane>

        </Tabs>

      </Content>

    </Layout>
  )
}

export default App