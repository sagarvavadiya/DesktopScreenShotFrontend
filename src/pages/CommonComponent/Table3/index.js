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
const Table3 = () => {
  //meta title
  const [allData, setAllData] = useState(
    useSelector(state => state.CommonData.commonData)
  )
  const [changeDelay, setChangeDelay] = useState([])
  const [paginationData, setpaginationData] = useState([])
  const sourceData = useSelector(state => state.CommonData.commonData)
  const dispatch = useDispatch()

  let tableHeading = [
    "Model",
    "Showroom Price",
    "Body Style",
    "Dimensions",
    "Seats",
    "Action",
  ]
  let tableValue = [
    "Model",
    "showroomPrice",
    "bodyStyle",
    "dimensions",
    "seats",
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
    dispatch(getCommonData("Table3Data"))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Responsive Table" />

          <Row>
            <Col>
              <Card>
                <CommonTable
                  tableHeading={tableHeading}
                  tableValue={tableValue}
                  currentPageData={paginationData}
                  setCurrentpagData={setpaginationData}
                  TotleData={allData}
                  firstColumnName="Model"
                  objectUniqId="Model"
                  sourceData={sourceData}
                  setTotleData={setAllData}
                  deleteIdArrayStorageName={"Table3Data"}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Table3
