import React from "react";
import { Table, Card } from "antd";

interface Appointment {
  key: number;
  date: string;
  staff: string;
  customer: string;
  service: string;
  status: "pending" | "confirmed" | "done" | "cancel";
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface ReportTabProps {
  appointments?: Appointment[];
  services?: Service[];
}

const ReportTab: React.FC<ReportTabProps> = ({ appointments = [], services = [] }) => {

  const doneAppointments = appointments.filter(a => a.status === "done");

  const getPrice = (serviceName: string) => {
    const service = services.find(s => s.name === serviceName);
    return service ? service.price : 0;
  };

  const appointmentsWithPrice = doneAppointments.map(a => ({
    ...a,
    price: getPrice(a.service)
  }));

  const totalRevenue = appointmentsWithPrice.reduce(
    (sum, a) => sum + a.price,
    0
  );

  const byDay = Object.values(
    appointmentsWithPrice.reduce((acc: any, a) => {
      const day = a.date.split(" ")[0];
      if (!acc[day]) acc[day] = { key: day, date: day, total: 0 };
      acc[day].total += 1;
      return acc;
    }, {})
  ) as object[];

  const byMonth = Object.values(
    appointmentsWithPrice.reduce((acc: any, a) => {
      const month = a.date.slice(0, 7);
      if (!acc[month]) acc[month] = { key: month, month, total: 0 };
      acc[month].total += 1;
      return acc;
    }, {})
  ) as object[];

  const revenueByService = Object.values(
    appointmentsWithPrice.reduce((acc: any, a) => {
      if (!acc[a.service]) {
        acc[a.service] = { key: a.service, service: a.service, revenue: 0 };
      }
      acc[a.service].revenue += a.price;
      return acc;
    }, {})
  ) as object[];

  const revenueByStaff = Object.values(
    appointmentsWithPrice.reduce((acc: any, a) => {
      if (!acc[a.staff]) {
        acc[a.staff] = { key: a.staff, staff: a.staff, revenue: 0 };
      }
      acc[a.staff].revenue += a.price;
      return acc;
    }, {})
  ) as object[];

  return (
    <>
      <Card title="Doanh thu theo lịch hẹn">
        <Table
          rowKey="key"
          dataSource={appointmentsWithPrice}
          columns={[
            { title: "Thời gian", dataIndex: "date" },
            { title: "Nhân viên", dataIndex: "staff" },
            { title: "Dịch vụ", dataIndex: "service" },
            {
              title: "Doanh thu",
              dataIndex: "price",
              render: (v: number) => v.toLocaleString() + " VND"
            }
          ]}
        />
      </Card>

      <Card title="Số lịch hẹn theo ngày" style={{ marginTop: 20 }}>
        <Table
          pagination={false}
          dataSource={byDay}
          columns={[
            { title: "Ngày", dataIndex: "date" },
            { title: "Số lịch", dataIndex: "total" }
          ]}
        />
      </Card>

      <Card title="Số lịch hẹn theo tháng" style={{ marginTop: 20 }}>
        <Table
          pagination={false}
          dataSource={byMonth}
          columns={[
            { title: "Tháng", dataIndex: "month" },
            { title: "Số lịch", dataIndex: "total" }
          ]}
        />
      </Card>

      <Card title="Doanh thu theo dịch vụ" style={{ marginTop: 20 }}>
        <Table
          pagination={false}
          dataSource={revenueByService}
          columns={[
            { title: "Dịch vụ", dataIndex: "service" },
            {
              title: "Doanh thu",
              dataIndex: "revenue",
              render: (v: number) => v.toLocaleString() + " VND"
            }
          ]}
        />
      </Card>

      <Card title="Doanh thu theo nhân viên" style={{ marginTop: 20 }}>
        <Table
          pagination={false}
          dataSource={revenueByStaff}
          columns={[
            { title: "Nhân viên", dataIndex: "staff" },
            {
              title: "Doanh thu",
              dataIndex: "revenue",
              render: (v: number) => v.toLocaleString() + " VND"
            }
          ]}
        />
      </Card>

      <Card title="Tổng doanh thu" style={{ marginTop: 20 }}>
        <h2>{totalRevenue.toLocaleString()} VND</h2>
      </Card>
    </>
  );
};

export default ReportTab;