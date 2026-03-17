import { Tabs } from 'antd';
import ProductPage from './ProductPage';
import OrderPage from './OrderPage';

const BaiTap1: React.FC = () => {
  return (
    <Tabs defaultActiveKey="product">
      <Tabs.TabPane tab="Quản lý sản phẩm" key="product">
        <ProductPage />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Quản lý đơn hàng" key="order">
        <OrderPage />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default BaiTap1;