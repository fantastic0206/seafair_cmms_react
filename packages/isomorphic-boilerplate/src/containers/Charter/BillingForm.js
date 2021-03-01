import React from 'react';
import Input from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Checkbox from '@iso/components/uielements/checkbox';
import InputBox from './InputBox';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import DatePicker from '@iso/components/uielements/datePicker';

const Option = SelectOption;

export default function() {
  const handleOnChange = checkedValues => {};

  return (
    <BillingFormWrapper className="isoBillingForm">
      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Charter/Trip</label>
          <Select size="large" defaultValue="charter">
            <Option value="charter">Charter</Option>
            <Option value="trip">Trip</Option>
          </Select>
        </InputBoxWrapper>
        <InputBox label="Reference" />
      </div>

      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Charter Status</label>
          <Select size="large" defaultValue="live">
            <Option value="live">Live</Option>
            <Option value="onHold">On Hold</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </InputBoxWrapper>
        <InputBoxWrapper className="isoInputBox">
          <label>Client Status</label>
          <Select size="large" defaultValue="none">
            <Option value="none">None</Option>
            <Option value="initialEnquiry">Initial Enquiry</Option>
            <Option value="cvSent">Cv Sent</Option>
            <Option value="contractIssued">Contract Issued</Option>
            <Option value="booked">Booked</Option>
            <Option value="declined">Declined</Option>
          </Select>
        </InputBoxWrapper>
        <InputBoxWrapper className="isoInputBox">
          <label>Owner Status</label>
          <Select size="large" defaultValue="none">
            <Option value="none">None</Option>
            <Option value="awaitingApproval">Awaiting Approval</Option>
            <Option value="approved">Approved</Option>
            <Option value="declined">Declined</Option>
            <Option value="scheduleClash">Schedule Clash</Option>
          </Select>
        </InputBoxWrapper>
      </div>

      <div className="isoInputFieldset">
        <InputBox label="Booking Company" />
        <InputBox label="Booking Broker" />
      </div>

      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Start Date</label>
          <DatePicker style={{height: '42px', borderRadius: 'unset'}} />
        </InputBoxWrapper>
        <InputBoxWrapper className="isoInputBox">
          <label>Finish Date</label>
          <DatePicker style={{height: '42px', borderRadius: 'unset'}} />
        </InputBoxWrapper>
      </div>

      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Cruising Area</label>
          <Select size="large" defaultValue="unitedstate">
            <Option value="argentina">Argentina</Option>
            <Option value="australia">Australia</Option>
            <Option value="brazil">Brazil</Option>
            <Option value="france">France</Option>
            <Option value="germany">Germany</Option>
            <Option value="southafrica">South Africa</Option>
            <Option value="spain">Spain</Option>
            <Option value="unitedstate">United State</Option>
            <Option value="unitedkingdom">United Kingdom</Option>
          </Select>
        </InputBoxWrapper>

        <InputBox label="Pickup Port" />
        <InputBox label="Drop Off Port" />
      </div>

      <div className="isoInputFieldset">
        <InputBox label="Vessel Entry" />
        <InputBox label="Slip Number" />
        <InputBox label="Marina Contact" />
      </div>

      <div className="isoInputFieldset">
        <InputBox label="Rate" />
        <InputBox label="Commission" />
        <InputBox label="Net To Owner" />
      </div>

      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Currency</label>
          <Select size="large" defaultValue="euros">
            <Option value="euros">Euros</Option>
            <Option value="usDollar">Us Dollar</Option>
            <Option value="britishPound">British Pound</Option>
            <Option value="australianDollar">Australian Dollar</Option>
            <Option value="canadianDollar">Canadian Dollar</Option>
            <Option value="costaRicanColon">Costa Rican Colón</Option>
            <Option value="danishKrone">Danish Krone</Option>
            <Option value="emiratiDirham">Emirati Dirham</Option>
            <Option value="hongkongDollar">Hong Kong Dollar</Option>
            <Option value="indonesianRupiah">Indonesian rupiah</Option>
            <Option value="newZealandDollar">New Zealand Dollar</Option>
            <Option value="norwegianKrone">Norwegian Krone</Option>
            <Option value="qatariRiyal">Qatari Riyal</Option>
            <Option value="seychellesRupee">Seychelles Rupee</Option>
            <Option value="swedishKrona">Swedish Krona</Option>
            <Option value="swissFranc">Swiss Franc</Option>
            <Option value="thaiBaht">Thai Baht</Option>
          </Select>
        </InputBoxWrapper>

        <InputBox label="Number Of Guests" />

        <InputBoxWrapper className="isoInputBox">
          <label>Type Of Guests</label>
          <Select size="large" defaultValue="corporate">
            <Option value="corporate">Corporate</Option>
            <Option value="couples">Couples</Option>
            <Option value="family">Family</Option>
            <Option value="group">Group</Option>
            <Option value="other">Other</Option>
          </Select>
        </InputBoxWrapper>
      </div>

      <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
          <label>Previous Charter</label>
          <Select size="large" defaultValue="unknown">
            <Option value="unknown">Unknown</Option>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </InputBoxWrapper>
        <InputBoxWrapper className="isoInputBox">
          <label>Owners Charter</label>
          <Select size="large" defaultValue="unknown">
            <Option value="unknown">Unknown</Option>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </InputBoxWrapper>
        <InputBoxWrapper className="isoInputBox">
          <label>References</label>
          <Select size="large" defaultValue="unknown">
            <Option value="unknown">Unknown</Option>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </InputBoxWrapper>
      </div>
    </BillingFormWrapper>
  );
}
