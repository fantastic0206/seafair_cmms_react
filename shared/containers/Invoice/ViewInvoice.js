import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@iso/components/utility/box';
import Button from '@iso/components/uielements/button';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import InvoicePageWrapper from './SingleInvoice.styles';
import Invoice from './Invoice';

export default function (props) {
  const { currentInvoice, toggleView, redirectPath } = props;
  console.log(props, 'props');

  return (
    <LayoutWrapper>
      <Box style={{ padding: 20 }}>
        <InvoicePageWrapper className="InvoicePageWrapper">
          <div className="PageHeader viewMode">
            <Link to={redirectPath}>
              <Button className="isoGoInvoBtn">
                <span>Go To Invoices</span>
              </Button>
            </Link>
            <Button color="secondary" onClick={() => toggleView(true)}>
              <span>Edit Invoice</span>
            </Button>
          </div>
          <Invoice currentInvoice={currentInvoice} ref={(invoice) => invoice} />
          <div className="ButtonWrapper">
            <Button type="primary" className="mateInvoPrint">
              <span>Send Invoice</span>
            </Button>
          </div>
        </InvoicePageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
