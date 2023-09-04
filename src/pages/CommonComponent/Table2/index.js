import React, { useEffect } from "react"

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useState } from "react"
import CommonTable from "../CommonTable/CommonTable"
import { useSelector, useDispatch } from "react-redux"
import { getCommonData } from "../../../store/actions"
const Table2 = () => {
  //meta title
  const [changeDelay, setChangeDelay] = useState([])
  const [allData, setAllData] = useState(
    useSelector(state => state.CommonData.commonData)
  )
  const [paginationData, setpaginationData] = useState([])
  const dispatch = useDispatch()
  const sourceData = useSelector(state => state.CommonData.commonData)

  let tableHeading = [
    "Company",
    "Last Trade",
    "Trade Time",
    "Change",
    "Prev Close",
    "Open",
    "Bid",
    "Ask",
    "1y Target Est",
    "Action",
  ]
  let tableValue = [
    "Company",
    "LastTrade",
    "TradeTime",
    "Change",
    "PrevClose",
    "Open",
    "Bid",
    "Ask",
    "TargetEst",
  ]
  useEffect(() => {
    setAllData([])
  }, [])
  useEffect(() => {
    setAllData(sourceData)
  }, [changeDelay])

  useEffect(() => {
    setTimeout(() => {
      setChangeDelay(!changeDelay)
    }, 200)
  }, [])

  document.title = "Responsive Table | Skote - React Admin & Dashboard Template"

  useEffect(() => {
    dispatch(getCommonData("Table2Data"))
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Responsive Table" />

          <Row>
            <Col>
              <Card>
                {/* <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div> */}
                <CommonTable
                  tableHeading={tableHeading}
                  tableValue={tableValue}
                  currentPageData={paginationData}
                  setCurrentpagData={setpaginationData}
                  TotleData={allData}
                  firstColumnName="Company"
                  objectUniqId="Company"
                  sourceData={sourceData}
                  setTotleData={setAllData}
                  deleteIdArrayStorageName={"Table2Data"}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Table2
