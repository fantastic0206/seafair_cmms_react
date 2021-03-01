import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import siteConfig from "@iso/config/site.config";
import moment from "moment";
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
// import OrderStatus from '@iso/components/Invoice/OrderStatus';
// import { CrewTable } from '../../component/CrewTable/CrewTable';
// import notification from '@iso/components/Notification';
import Button from "@iso/components/uielements/button";
// import Input, { Textarea } from '@iso/components/uielements/input';
// import DatePicker from '@iso/components/uielements/datePicker';
import Box from "@iso/components/utility/box";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageWrapper from "./SinglePage.styles";
import { stringToPosetiveInt } from "@iso/lib/helpers/utility";
import Pdf from "react-to-pdf";
// import { orderStatusOptions } from './config';
import EntriesCrewAction from "../../redux/EntriesCrew/actions";

const ref = React.createRef();
const { getById } = EntriesCrewAction;

export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { crewLists, crewList } = useSelector((state) => state.EntriesCrew);
  const [orderDate, setOrderDate] = React.useState("");
  // const [orderStatus,setOrderStatus]=React.useState("Draft");

  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    if (Object.keys(crewList).length !== 0) {
      setOrderDate(
        moment(crewList.orderDate).format("MM/DD/YYYY ") + "    "
      );
    }
  }, [crewList]);
  const trList = () => {
    let tr_array = [];
    for (let i = crewLists.length + 1; i < 15; i++) {
      tr_array.push(
        <tr style={{ height: "0.45in" }} key={i}>
          <td
            width="204px"
            style={{
              width: "152.75pt",
              border: "solid windowtext 1.0pt",
              borderTop: "none",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              style={{
                textAlign: "left",
                marginTop: "0in",
                marginRight: "0in",
                marginBottom: "0in",
                marginLeft: "13.5pt",
                textIndent: "-13.5pt",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              >
                {i}.<span style={{ fontSize: "7.0pt" }}>&nbsp;&nbsp; </span>
              </span>
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              ></span>
            </p>
          </td>
          <td
            width="84px"
            style={{
              width: "63.0pt",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              ></span>
            </p>
          </td>
          <td
            width="83px"
            style={{
              width: "61.9pt",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              ></span>
            </p>
          </td>
          <td
            width="133px"
            style={{
              width: "100.1pt",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              ></span>
            </p>
          </td>
          <td
            width="84px"
            style={{
              width: "63.0pt",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              >
                &nbsp;
              </span>
            </p>
          </td>
          <td
            width="72px"
            style={{
              width: "0.75in",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              >
                &nbsp;
              </span>
            </p>
          </td>
          <td
            width="60px"
            style={{
              width: "44.75pt",
              borderTop: "none",
              borderLeft: "none",
              borderBottom: "solid windowtext 1.0pt",
              borderRight: "solid windowtext 1.0pt",
              padding: "0in 5.4pt 0in 5.4pt",
              height: "0.45in",
            }}
          >
            <p
              align="center"
              style={{
                marginBottom: "0in",
                textAlign: "center",
                lineHeight: "normal",
              }}
            >
              <span
                style={{ fontSize: "12.0pt", fontFamily: "Times New Roman" }}
              >
                &nbsp;
              </span>
            </p>
          </td>
        </tr>
      );
    }
    return tr_array;
  };
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/entries_crew/edit/${id}`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Pdf
              targetRef={ref}
              filename="LIST OF CREW & REPORT OF CHARACTER.pdf"
            >
              {({ toPdf }) => (
                <Button
                  type="primary"
                  className="saveBtn"
                  style={{ marginLeft: "20px" }}
                  onClick={toPdf}
                >
                  <span>Download</span>
                </Button>
              )}
            </Pdf>
          </PageWrapper>
          <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
            <div
              style={{
                width: "795px",
                height: "100%",
                // border: "1px solid red",
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "35px",
              }}
              align="center"
              ref={ref}
            >
              <p style={{ textAlign: "center" }}>
                <img
                  style={{ width: "75px", height: "75px" }}
                  src={`${siteConfig.apiUrl}/image001.png`}
                ></img>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "24.0pt",
                    lineHeight: "107%",
                    fontWeight: "bold",
                    fontFamily: "BankGothic Md BT",
                  }}
                >
                  M/V GRAND LUXE
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ marginBottom: "12.0pt", textAlign: "center" }}>
                <b>
                  <span style={{ fontFamily: "Times New Roman" }}>
                    LIST OF CREW & REPORT OF CHARACTER
                  </span>
                </b>
              </p>
              <table
                border="1"
                cellSpacing="0"
                cellPadding="0"
                width="720px"
                style={{
                  width: "7.5in",
                  margin: "0 auto",
                  borderCollapse: "collapse",
                  border: "none",
                }}
              >
                <tbody>
                  <tr style={{ height: "13.8pt", verticalAlign: "middle" }}>
                    <td
                      width="120px"
                      rowSpan="2"
                      style={{
                        width: "1.25in",
                        border: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "13.8pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{ marginBottom: "0in", textAlign: "center" }}
                      >
                        <span
                          style={{
                            fontSize: "12.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          NAME OF SEAMAN
                        </span>
                      </p>
                      {/* <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}>&nbsp;</span></p> */}
                    </td>
                    <td
                      width="84px"
                      rowSpan="2"
                      style={{
                        width: "63.0pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{
                          marginBottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontsize: "10.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          LICENSED
                        </span>
                      </p>
                      <p
                        align="center"
                        style={{
                          marginbottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          YES OR NO
                        </span>
                      </p>
                    </td>
                    <td
                      width="83px"
                      rowSpan="2"
                      style={{
                        width: "61.9pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{
                          marginBottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          MMD#
                        </span>
                      </p>
                    </td>
                    <td
                      width="133px"
                      rowSpan="2"
                      style={{
                        width: "100.1pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{
                          marginBottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          CAPACITY ENGAGED
                        </span>
                      </p>
                    </td>
                    <td
                      width="156px"
                      colSpan="2"
                      style={{
                        width: "117.0pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        borderRight: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{
                          marginBottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          REPORT OF CHARACTER
                          <span
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "107%",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            [1]
                          </span>
                        </span>
                      </p>
                    </td>
                    <td
                      width="60px"
                      rowSpan="2"
                      style={{
                        width: "48.75pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none;padding:0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p
                        align="center"
                        style={{
                          marginBottom: "0in",
                          textAlign: "center",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          SEE PAGE
                          <span
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "107%",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            [2]
                          </span>
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: "middle" }}>
                    <td
                      width="84px"
                      valign="top"
                      style={{
                        width: "63.0pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p style={{ marginBottom: "0in", lineHeight: "normal" }}>
                        <span
                          style={{
                            fontSize: "10.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          CONDUCT
                        </span>
                      </p>
                    </td>
                    <td
                      width="72px"
                      valign="top"
                      style={{
                        width: "0.75in",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      <p style={{ marginBottom: "0in", lineHeight: "normal" }}>
                        <span
                          style={{
                            fontSize: "10.0pt",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          ABILITY
                        </span>
                      </p>
                    </td>
                  </tr>
                  {crewLists.map((row, index) => {
                    return (
                      <tr
                        style={{ height: "0.45in", verticalAlign: "middle" }}
                        key={index}
                      >
                        <td
                          width="204px"
                          style={{
                            width: "152.75pt",
                            border: "solid windowtext 1.0pt",
                            borderTop: "none",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            style={{
                              textAlign: "left",
                              marginTop: "0in",
                              marginRight: "0in",
                              marginBottom: "0in",
                              marginLeft: "13.5pt",
                              textIndent: "-13.5pt",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {++index}.
                              <span style={{ fontSize: "7.0pt" }}>
                                &nbsp;&nbsp;{" "}
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strNameSeaman}
                            </span>
                          </p>
                        </td>
                        <td
                          width="84px"
                          style={{
                            width: "63.0pt",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strLicensed}
                            </span>
                          </p>
                        </td>
                        <td
                          width="83px"
                          style={{
                            width: "61.9pt",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strMMD}
                            </span>
                          </p>
                        </td>
                        <td
                          width="133px"
                          style={{
                            width: "100.1pt",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strCapacityEngaged}
                            </span>
                          </p>
                        </td>
                        <td
                          width="84px"
                          style={{
                            width: "63.0pt",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strConduct}
                            </span>
                          </p>
                        </td>
                        <td
                          width="72px"
                          style={{
                            width: "0.75in",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strAbility}
                            </span>
                          </p>
                        </td>
                        <td
                          width="60px"
                          style={{
                            width: "44.75pt",
                            borderTop: "none",
                            borderLeft: "none",
                            borderBottom: "solid windowtext 1.0pt",
                            borderRight: "solid windowtext 1.0pt",
                            padding: "0in 5.4pt 0in 5.4pt",
                            height: "0.45in",
                          }}
                        >
                          <p
                            align="center"
                            style={{
                              marginBottom: "0in",
                              textAlign: "center",
                              lineHeight: "normal",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.0pt",
                                fontFamily: "Times New Roman",
                              }}
                            >
                              {row.strSeaPage}
                            </span>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                  {trList()}
                </tbody>
              </table>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>
                <span
                  style={{ fontFamily: "Times New Roman", fontSize: "11.0pt" }}
                >
                  Revision #:________________
                </span>
                
                <span
                  style={{ fontFamily: "Times New Roman", fontSize: "11.0pt" }}
                >
                            Revision Date:</span><span style={{ textDecoration: "underline" }}>
                    {orderDate}
                </span><span>               Master’s
                  Signature: ________________  
                </span>
              </p>

              <div style={{ margin: "0 20px auto" }}>
                <br clear="all"></br>
                <p>&nbsp;</p>
                <hr align="left" size="1" width="33%"></hr>

                <div id="ftn1">
                  <p>
                    <span
                      style={{
                        fontSize: "10.0pt",
                        lineHeight: "107%",
                        fontFamily: "Calibri",
                      }}
                    >
                      [1]&nbsp;
                    </span>
                    VG for Very Good, G for Good, M for Middling, I for
                    Indifferent. The master may also insert particulars of
                    ability or conduct or performance of duties. If he declines
                    to give any opinion, he must so state opposite the crew
                    member’s name
                  </p>
                </div>

                <div id="ftn2">
                  <p>
                    <span
                      style={{
                        fontSize: "10.0pt",
                        lineHeight: "107%",
                        fontFamily: "Calibri",
                      }}
                    >
                      [2]&nbsp;
                    </span>
                    If there is any entry in the Ship’s Log relating in any way
                    to a member of the crew, the page number where the entry
                    appears should be written in the column opposite the crew
                    member’s name.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    </div>
  );
}
