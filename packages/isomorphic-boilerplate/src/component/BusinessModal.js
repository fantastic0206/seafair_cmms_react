import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import './table.css';

import businessActions from '../redux/business/actions';

const { getData } = businessActions;

export default function (props) {
  const { business } = useSelector((state) => state.Business);
  const { visible, title, group } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectBusiness(row);
  };

  return (
    <Modal
      visible={visible}
      onCancel={props.onCancel}
      title={title}
      width={700}
    >
      <div style={{ marginTop: '3px', height: '170px', overflow: 'auto' }}>
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th>
                <span className="listHeaderLabel35">Business</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Address</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Classification</span>
              </th>
              <th>
                <span className="listHeaderLabel35">City</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Fax</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Phone</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Postal Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Contact</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Currency</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Primary Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Secondary Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Website</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {business ? (
              <tr
                className="listRow"
                onClick={() => {
                  onRowClick(business);
                }}
              >
                <td className="column">
                  <p className="context">{business.strName}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strAddress}</p>
                </td>
                <td className="column">
                  <p className="context">
                    {business.strBusinessClassification}
                  </p>
                </td>
                <td className="column">
                  <p className="context">{business.strCity}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strCode}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strFax}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strPhone}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strPostalCode}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strPrimaryContact}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strPrimaryCurrency}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strPrimaryCurrency}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strSecondaryEmail}</p>
                </td>
                <td className="column">
                  <p className="context">{business.strWebSite}</p>
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  style={{ textAlign: 'center', fontSize: '14px' }}
                  colSpan="2"
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
