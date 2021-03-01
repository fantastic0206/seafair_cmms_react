import styled from 'styled-components';
import { palette } from 'styled-theme';
import { borderRadius } from '@iso/lib/helpers/style_utils';

const Modals = ComponentName => styled(ComponentName)`
  .ant-modal-header {
    padding: 13px 16px;
    background: ${palette('grayscale', 5)};
    color: ${palette('text', 0)};
    border-bottom: 1px solid ${palette('border', 0)};
    ${borderRadius('4px 4px 0 0')};
  }
  div.contentPaneFrameModal{
    padding: 4px;
    background: white;
  }
  div.AssetTypeSelectContainer{
    float: left;
    width: 450px;
    // padding: 30px;
    margin: 0;
    height: 166px;    
  }
  div.AssetCategorySelectContainer{
    float: left;
    width: 450px;
    // padding: 30px;
    margin: 0;
    height: 166px;   
  }
  div.AssetItemContainer{
    float: left;
    cursor: pointer;
    width: 198px;
    height: 75px;
    margin: collapse;
    background: url(../images/select_asset_type_background.png) top left no-repeat;
    padding-left: 15px;
    margin: 5px;
  }
  .LocationsFacilities{
    float: left;
    margin: collapse;
    background: url(../images/facilities-48.png) top left no-repeat;
    width: 48px;
    height: 48px;
    margin: 10px;
  }
  .Equipment{
    float: left;
    margin: collapse;
    background: url(../images/equipment-48.png) top left no-repeat;
    width: 48px;
    height: 48px;
    margin: 10px;
  }
  .Tools{
    float: left;
    margin: collapse;
    background: url(../images/tools-48.png) top left no-repeat;
    width: 48px;
    height: 48px;
    margin: 13px 10px 10px 10px;
  }
  .AssetItemContainer p {
    float: left;
    font-size: 12px;
    color: #757575;
    font-face: arial;
    font-weight: bold;
    padding: 20px 0 0 10px;
    height: 45px;
    text-align: left;
  }
  .ant-modal-title {
    margin: 0;
    font-size: 15px;
    line-height: 21px;
    font-weight: 500;
    color: ${palette('text', 0)};
  }

  .ant-modal-close {
    right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .ant-modal-body {
    height: 210px;
    width: 450px;
    // padding: 16px;
    // font-size: 13px;
    // color: ${palette('text', 3)};
    // line-height: 1.5;
  }

  .ant-modal-footer {
    border-top: 1px solid ${palette('border', 0)};
    padding: 10px 16px 10px 10px;
    text-align: right;
    ${borderRadius('0 0 4px 4px')};

    .ant-btn-lg {
      padding: 0 35px;
      font-size: 14px;
      height: 42px;
    }

    button + button {
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 8px 0 0' : '0 0 0 8px'};
    }
  }

  .ant-confirm {
    .ant-modal-body {
      padding: 30px 35px;
    }
  }

  .ant-confirm-body {
    .ant-confirm-title {
      color: ${palette('text', 0)};
      font-weight: 700;
      font-size: 15px;
    }

    .ant-confirm-content {
      //margin-left: 42px;
      font-size: 13px;
      color: ${palette('text', 3)};
      margin-top: 8px;
    }
	
  }
`;

const ModalContent = styled.div`
  p {
    font-size: 13px;
    color: ${palette('text', 3)};
    line-height: 1.5;
  } 
`;

export default Modals;
export { ModalContent };
