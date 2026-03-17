import { Tabs } from 'antd';
import Keo_Bua_Bao from './keo_bua_bao';

const TH02: React.FC = () => {
    return(
        <Tabs defaultActiveKey="game">
            <Tabs.TabPane tab="Oẳn tù tì" key="game">
                <Keo_Bua_Bao />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default TH02;