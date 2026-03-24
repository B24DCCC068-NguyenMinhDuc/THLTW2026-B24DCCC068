import React, { useState } from 'react';
import { Tabs } from 'antd';
import FieldConfigTab from './modules/fieldConfig/FieldConfigTab';
import DecisionTab from './modules/decision/DecisionTab';
import DiplomaBookTab from './modules/diplomaBook/DiplomaBookTab';
import DiplomaTab from './modules/diploma/DiplomaTab';
import SearchTab from './modules/search/SearchTab';
import { mockFieldConfigs, mockDecisions, mockDiplomaBooks } from './data/mockData';
import { FieldConfig } from './types/fieldConfig';
import { Decision } from './types/decision';
import { DiplomaBook} from './types/diplomaBooks';
import { Diploma } from './types/diploma';

function App() {
	const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>(mockFieldConfigs);
  const [decisions, setDecisions] = useState<Decision[]>(mockDecisions);
  const [diplomaBooks, setDiplomaBooks] = useState<DiplomaBook[]>(mockDiplomaBooks);
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);

	return (
		<Tabs defaultActiveKey = '1'>
			<Tabs.TabPane key='1' tab='Biểu mẫu'>
				<FieldConfigTab data={fieldConfigs} setData={setFieldConfigs} />
			</Tabs.TabPane>
      <Tabs.TabPane key='2' tab='Quyết định'>
        <DecisionTab data={decisions} setData={setDecisions} diplomaBooks={diplomaBooks} />
      </Tabs.TabPane>
      <Tabs.TabPane key='3' tab='Sổ văn bằng'>
        <DiplomaBookTab data={diplomaBooks} setData={setDiplomaBooks} />
      </Tabs.TabPane>
      <Tabs.TabPane key='4' tab='Văn bằng'>
        <DiplomaTab data={diplomas} setData={setDiplomas} diplomaBooks={diplomaBooks} decisions={decisions} fieldConfigs={fieldConfigs} setDiplomaBooks={setDiplomaBooks} />
      </Tabs.TabPane>
      <Tabs.TabPane key='5' tab='Tra cứu'>
        <SearchTab diplomas={diplomas} decisions={decisions} setDecisions={setDecisions} />
      </Tabs.TabPane>
		</Tabs>
	);
}

export default App;
