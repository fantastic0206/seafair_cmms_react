import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { TableTabsStyle } from "./Asset.styles";

// const TabPane = Tabs.TabPane;
const Option = SelectOption;

function callback(key) {}

const operations = <Button>Extra Action</Button>;

export default function () {
  const [state, setState] = React.useState({  
  });

 
  return (
    <LayoutContentWrapper>
      {/* <PageHeader>{<IntlMessages id="forms.Tabs.header" />}</PageHeader> */}
      <TableTabsStyle className="isoLayoutContent">
        <Tabs defaultActiveKey="1" className="isoTableDisplayTab" onChange={callback}>
          <TabPane tab="Simpe Table" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Sortable Table" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Search Text" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </TableTabsStyle>     
    </LayoutContentWrapper>
  );
}
