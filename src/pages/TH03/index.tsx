import React, { useState } from "react";
import { Tabs } from "antd";

import StaffServiceTab from "./components/StaffServiceTab";
import AppointmentTab from "./components/AppointmentTab";
import ReviewTab from "./components/ReviewTab";
import ReportTab from "./components/ReportTab";

interface Staff {
    id: number;
    name: string;
    workingHours: string;
    maxCustomers: number;
}

interface Service {
    id: number;
    name: string;
    price: number;
    duration: number;
}

interface Appointment {
    key: number;
    date: string;
    staff: string;
    customer: string;
    service: string;
    status: "pending" | "confirmed" | "done" | "cancel";
}

interface Review {
    key: number;
    datetime: string;
    staff: string;
    customer: string;
    service: string;
    rating?: number;
    feedback?: string;
    staffReply?: string;
}

const App: React.FC = () => {
    const [staffs, setStaffs] = useState<Staff[]>([
        { id: 1, name: "Nguyễn Văn An", workingHours: "08:00-16:00", maxCustomers: 8 },
        { id: 2, name: "Trần Thị Bình", workingHours: "09:00-17:00", maxCustomers: 10 },
        { id: 3, name: "Lê Minh Khôi", workingHours: "10:00-18:00", maxCustomers: 7 },
        { id: 4, name: "Phạm Thu Hà", workingHours: "08:30-16:30", maxCustomers: 9 },
    ]);

    const [services, setServices] = useState<Service[]>([
        { id: 1, name: "Cắt tóc nam", price: 120000, duration: 30 },
        { id: 2, name: "Cắt + gội + sấy", price: 180000, duration: 45 },
        { id: 3, name: "Uốn tóc", price: 450000, duration: 120 },
        { id: 4, name: "Nhuộm tóc", price: 400000, duration: 90 },
    ]);

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [reviews, setReviews] = useState<Review[]>([
        {
            key: 1,
            datetime: "2026-03-10 09:00",
            staff: "Nguyễn Văn An",
            customer: "Nguyễn Minh Anh",
            service: "Cắt tóc nam",
            rating: 5,
            feedback: "Cắt tóc rất gọn gàng",
            staffReply: "Cảm ơn bạn đã ủng hộ!",
        },
    ]);

    const addStaff = (staff: Staff) => setStaffs(prev => [...prev, staff]);
    const addService = (service: Service) => setServices(prev => [...prev, service]);
    const addAppointment = (appt: Appointment) => setAppointments(prev => [...prev, appt]);

    const updateAppointmentStatus = (key: number, status: Appointment["status"]) => {
        setAppointments(prev => {
            const next = prev.map(a => (a.key === key ? { ...a, status } : a));
            const appointment = next.find(a => a.key === key);
            if (appointment && status === "done") {
                setReviews(current => {
                    const exists = current.find(r => r.key === appointment.key);
                    if (exists) return current;
                    return [
                        ...current,
                        {
                            key: appointment.key,
                            datetime: appointment.date,
                            staff: appointment.staff,
                            customer: appointment.customer,
                            service: appointment.service,
                        },
                    ];
                });
            }
            return next;
        });
    };

    const updateReview = (updated: Review) => {
        setReviews(prev => prev.map(r => (r.key === updated.key ? { ...r, ...updated } : r)));
    };

    return (
        <Tabs>
            <Tabs.TabPane key="1" tab="Nhân viên & dịch vụ">
                <StaffServiceTab
                    staffs={staffs}
                    services={services}
                    onAddStaff={addStaff}
                    onAddService={addService}
                />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Lịch hẹn">
                <AppointmentTab
                    staffs={staffs}
                    services={services}
                    appointments={appointments}
                    onAddAppointment={addAppointment}
                    onUpdateStatus={updateAppointmentStatus}
                />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab="Đánh giá">
                <ReviewTab reviews={reviews} onSaveReview={updateReview} />
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab="Thống kê">
                <ReportTab appointments={appointments} services={services} />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default App;
