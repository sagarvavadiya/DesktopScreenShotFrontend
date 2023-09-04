import React, { useEffect } from "react"

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useState } from "react"
import CommonTable from "../CommonTable/CommonTable"
import { useSelector, useDispatch } from "react-redux"
import { getCommonData } from "../../../store/actions"
const Table1 = () => {
  //meta title
  const [allData, setAllData] = useState(
    useSelector(state => state.CommonData.commonData)
  )

  const [changeDelay, setChangeDelay] = useState([])
  const [paginationData, setpaginationData] = useState([])
  const sourceData = useSelector(state => state.CommonData.commonData)
  const dispatch = useDispatch()

  let tableHeading = ["City Name", "Population", "State", "Country", "Action"]
  let tableValue = [["City Name"], "Population", "state", "country"]

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
    dispatch(getCommonData("Table1Data"))
  }, [changeDelay])

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
                  firstColumnName="City Name"
                  objectUniqId="City Name"
                  sourceData={sourceData}
                  setTotleData={setAllData}
                  deleteIdArrayStorageName={"Table1Data"}
                  changeDelay={changeDelay}
                  setChangeDelay={setChangeDelay}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Table1
