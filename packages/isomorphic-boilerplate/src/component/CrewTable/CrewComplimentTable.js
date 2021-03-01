import React from 'react';
import Button from '@iso/components/uielements/button';
import Input from "@iso/components/uielements/input";
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import Table from './TableStyle';



const CrewComplimentTable = ({ editableData, editTable, updateValues }) => {
  // const { invoiceList } = editableData;
  const editColumns = [
    {
      title: '#',
      dataIndex: 'key',
      rowKey: 'key',
      width: '10%',
      render: (text, row) => <span>{row.key}</span>,
    },
    {
      title: 'CREW POSITION',
      dataIndex: 'strCrewPosition',
      rowKey: 'strCrewPosition',
      width: '20%',
      render: (text, row) => (
        <Input
          placeholder=""
         value={row.strCrewPosition}
          onChange={event => {
            editableData[row.key - 1].strCrewPosition =
              event.target.value;              
              editTable(editableData);
          }}
        />
      ),
    },
    {
      title: 'NAME',
      dataIndex: 'strName',
      rowKey: 'strName',
      width: '20%',
      render: (text, row) => (
        <Input
          placeholder=""
          value={row.strName}
          onChange={event => {
            editableData[row.key - 1].strName =
              event.target.value;              
             editTable(editableData);
          }}
        />
      ),
    },
    {
      title: 'HOURS ON DUTY',
      dataIndex: 'strHoursOnDuty',
      rowKey: 'strHoursOnDuty',
      width: '20%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strHoursOnDuty}
        onChange={event => {
          editableData[row.key - 1].strHoursOnDuty =
            event.target.value;              
           editTable(editableData);
        }}
      />
      ),
    },
    {
      title: 'HOURS TOTAL',
      dataIndex: 'strHoursTotal',
      rowKey: 'strHoursTotal',
      width: '20%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strHoursTotal}
        onChange={event => {
          editableData[row.key - 1].strHoursTotal =
            event.target.value;              
           editTable(editableData);
        }}
      />
      ),
    },   
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      width: '*',
      render: (text, row) =>
      row.length === 1 ? (
          ''
        ) : (
          <Button
            onClick={() => {
              const newCrewList = [];
              editableData.forEach((item, i) => {
                if (i !== row.key - 1) {
                  newCrewList.push(item);
                }
              });
              editableData = newCrewList;
              editTable(editableData);
            }}
          >
            Delete
          </Button>
        ),
    },
  ];
  return (
    <Table columns={editColumns} dataSource={editableData} pagination={false} />
  );
};

const LogEntriesTable = ({ editableData, editTable, updateValues }) => {
  // const { invoiceList } = editableData;
  const columns = [
    // {
    //   title: '#',
    //   dataIndex: 'key',
    //   rowKey: 'key',
    //   width: '10%',
    //   render: (text, row) => <span>{row.key}</span>,
    // },
    {
      title: 'TIME',
      dataIndex: 'strTime',
      rowKey: 'strTime',
      width: '15%',
      render: (text, row) => (
        <Input
          placeholder=""
         value={row.strTime}
          onChange={event => {
            editableData[row.key - 1].strTime =
              event.target.value;              
              editTable(editableData);
          }}
        />
      ),
    },
    {
      title: 'CODE(LETTER)',
      dataIndex: 'strCode',
      rowKey: 'strCode',
      width: '20%',
      render: (text, row) => (
        <Input
          placeholder=""
          value={row.strCode}
          onChange={event => {
            editableData[row.key - 1].strCode =
              event.target.value;              
             editTable(editableData);
          }}
        />
      ),
    },
    {
      title: 'ITEM(NUMBER)',
      dataIndex: 'strItem',
      rowKey: 'strItem',
      width: '20%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strItem}
        onChange={event => {
          editableData[row.key - 1].strItem =
            event.target.value;              
           editTable(editableData);
        }}
      />
      ),
    },
    {
      title: 'EXPLAINATION OF EACH ENTRY',
      dataIndex: 'strExplanation',
      rowKey: 'strExplanation',
      width: '40%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strExplanation}
        onChange={event => {
          editableData[row.key - 1].strExplanation =
            event.target.value;              
           editTable(editableData);
        }}
      />
      ),
    },   
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      width: '*',
      render: (text, row) =>
      row.length === 1 ? (
          ''
        ) : (
          <Button
            onClick={() => {
              const newCrewList = [];
              editableData.forEach((item, i) => {
                if (i !== row.key - 1) {
                  newCrewList.push(item);
                }
              });
              editableData = newCrewList;
              editTable(editableData);
            }}
          >
            Delete
          </Button>
        ),
    },
  ];
  return (
    <Table columns={columns} dataSource={editableData} pagination={false} />
  );
};
export {  CrewComplimentTable,LogEntriesTable };
