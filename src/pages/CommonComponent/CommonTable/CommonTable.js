import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import * as Yup from "yup"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Pagination from "./Pagination/Pagination"
import ".././tableData.css"
import { use } from "i18next"
import { useFormik } from "formik"
const CommonTable = ({
  tableHeading,
  currentPageData,
  TotleData,
  setCurrentpagData,
  firstColumnName,
  setFilterData,
  objectUniqId,
  tableValue,
  sourceData,
  setTotleData,
  deleteIdArrayStorageName,
  setChangeDelay,
  changeDelay,
}) => {
  const [filters, setFilters] = useState([])
  const [currentFilterKey, setCurrentFilterKey] = useState()
  const [autoSuggetion, setAutoSuggetion] = useState([])
  const [deleteButton, setDeleteButton] = useState(false)
  const [modal, setModal] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  // console.log("CommonTable", TotleData)
  const handleChange = e => {
    const { name, checked } = e.target
    if (name === "allSelect") {
      let tempData = currentPageData.map(object => {
        return { ...object, isChecked: !checked }
      })
      setCurrentpagData(tempData)

      let check = 0
      for (let i of tempData) {
        if (i.isChecked === true) {
          check += 1
        }
        check >= 1 ? setDeleteButton(true) : setDeleteButton(false)
      }
    } else {
      console.log(name, checked)
      let tempData = currentPageData.map(object =>
        object[objectUniqId] === name
          ? { ...object, isChecked: !checked }
          : object
      )

      setCurrentpagData(tempData)
      let check = 0
      for (let i of tempData) {
        if (i.isChecked === true) {
          console.log(i.Model, "====>")
          check += 1
        }
        check >= 1 ? setDeleteButton(true) : setDeleteButton(false)
      }
    }
  }

  const FilterSet = e => {
    console.log(
      e.target.name,
      TotleData.map(i => i["state"])
    )
    setCurrentFilterKey(e.target.name)
    // setAutoSuggetion(
    //   TotleData.map(i => i[e.target.name]).filter(i =>
    //     `${i.toLowerCase()}`.includes(e.target.value)
    //   )
    // )
    // setAutoSuggetion(TotleData.map(i => i[e.target.name]))
    for (let i of tableValue) {
      if (i === tableValue[+e.target.id]) {
        for (let p in filters) {
          if (
            Object.keys(filters[p])[0] === i ||
            Object.keys(filters[p])[0] === i[0]
          ) {
            setFilters(filters.filter((i, index2) => index2 != p))
            setFilters(prev => [...prev, { [i]: e.target.value }])
          }
        }
      }
    }
  }

  useEffect(() => {
    function filterObjectsByKeywords(objectArray, filterKeywords) {
      return objectArray.filter(object => {
        for (let filterObj of filterKeywords) {
          const field = Object.keys(filterObj)[0]
          const keyword = filterObj[field]

          if (
            !String(object[field]).toLowerCase().includes(keyword.toLowerCase())
          ) {
            return false
          }
        }
        return true
      })
    }

    // Filter objects based on keywords
    const filteredObjects = filterObjectsByKeywords(sourceData, filters)
    setTotleData(filteredObjects)
  }, [filters])

  useEffect(() => {
    for (let i of tableValue) {
      setFilters(prev => [...prev, { [i]: "" }])
    }
  }, [])

  const DeleteData = data => {
    const deletedIdArray = JSON.parse(
      localStorage.getItem(deleteIdArrayStorageName)
    )
      ? JSON.parse(localStorage.getItem(deleteIdArrayStorageName))
      : []
    console.log(deletedIdArray)
    deletedIdArray.push(data.id)
    setTotleData(TotleData.filter(i => i.id != data.id))
    localStorage.setItem(
      deleteIdArrayStorageName,
      JSON.stringify(deletedIdArray)
    )
  }

  const deleteAll = () => {
    const deletedIdArray = JSON.parse(
      localStorage.getItem(deleteIdArrayStorageName)
    )
      ? JSON.parse(localStorage.getItem(deleteIdArrayStorageName))
      : []

    for (let i of currentPageData) {
      if (i.isChecked === true) {
        deletedIdArray.push(i.id)
      }
    }
    setTotleData(TotleData.filter(p => !deletedIdArray.includes(p.id)))
    localStorage.setItem(
      deleteIdArrayStorageName,
      JSON.stringify(deletedIdArray)
    )
    setDeleteButton(false)
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (customer && customer.username) || "",
      phone: (customer && customer.phone) || "",
      email: (customer && customer.email) || "",
      address: (customer && customer.address) || "",
      rating: (customer && customer.rating) || "",
      walletBalance: (customer && customer.walletBalance) || "",
      joiningDate: (customer && customer.joiningDate) || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
      rating: Yup.string().required("Please Enter Your Rating"),
      walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          username: values.username,
          phone: values.phone,
          email: values.email,
          address: values.address,
          rating: values.rating,
          walletBalance: values.walletBalance,
          joiningDate: values.joiningDate,
        }
        // update customer
        dispatch(onUpdateCustomer(updateCustomer))
        validation.resetForm()
      } else {
        const newCustomer = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          username: values["username"],
          phone: values["phone"],
          email: values["email"],
          address: values["address"],
          rating: values["rating"],
          walletBalance: values["walletBalance"],
          joiningDate: values["joiningDate"],
        }

        const toggle = () => {
          if (modal) {
            setModal(false)
            setCustomer(null)
          } else {
            setModal(true)
          }
        }
        // save new customer
        dispatch(onAddNewCustomer(newCustomer))
        validation.resetForm()
      }
      toggle()
    },
  })

  const toggle = () => {
    if (modal) {
      setModal(false)
      setCustomer(null)
    } else {
      setModal(true)
    }
  } 
  return (
    <>
      <CardBody>
        <div className="FlexBt">
          <div>
            <CardTitle>Example </CardTitle>
            <CardSubtitle className="mb-3">
              This is an experimental awesome solution for responsive tables
              with complex data.
            </CardSubtitle>
          </div>
          <div className="FlexBt ActionButtonDiv">
            {deleteButton ? (
              <button className="btn btn-danger" onClick={deleteAll}>
                Delete
              </button>
            ) : (
              ""
            )}
            <button className="btn btn-success" onClick={() => setModal(true)}>
              Add
            </button>{" "}
          </div>
        </div>

        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <Thead>
                <Tr>
                  {tableHeading?.map((i, index) => {
                    return (
                      <>
                        {i === `${firstColumnName}` ? (
                          <Th>
                            {" "}
                            <div className="FlexCol">
                              <span>
                                {" "}
                                <span>
                                  <input
                                    type="checkbox"
                                    name="allSelect"
                                    checked={
                                      !currentPageData.some(
                                        object => object?.isChecked !== true
                                      )
                                    }
                                    onClick={handleChange}
                                  />
                                </span>{" "}
                                <span>{i}</span>
                              </span>
                              <input
                                type="text"
                                name={i}
                                id={index}
                                // onChange={setFilterData}
                                onChange={FilterSet}
                                placeholder="Search..."
                              />
                            </div>
                          </Th>
                        ) : (
                          <Th data-priority="6" key={index}>
                            <div className="FlexCol relative">
                              <span className="relative">{i}</span>
                              {i === `Action` ? (
                                ""
                              ) : (
                                <input
                                  className="relative"
                                  type="text"
                                  id={index}
                                  name={i}
                                  // onChange={setFilterData}
                                  onChange={FilterSet}
                                  placeholder="Search..."
                                />
                              )}

                              <div className="relative">
                                {`${i}`.toLowerCase() ===
                                `${currentFilterKey}`.toLowerCase() ? (
                                  <div className="autoSelect">
                                    {autoSuggetion.map(i => {
                                      return (
                                        <>
                                          <div>{i}</div>
                                        </>
                                      )
                                    })}
                                    {/* <div>option</div>
                                    <div>option</div>
                                    <div>option</div>
                                    <div>option</div> */}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Th>
                        )}
                      </>
                    )
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData.map((i, index) => {
                  return (
                    <>
                      <Tr id={index} key={index}>
                        {Object.entries(i).map((v, id) => {
                          return (
                            <>
                              {v[0] === `${firstColumnName}` ? (
                                <>
                                  <Td>
                                    <span>
                                      <input
                                        type="checkbox"
                                        name={v[1]}
                                        checked={i?.isChecked || false}
                                        onClick={handleChange}
                                      />
                                    </span>{" "}
                                    <span>{v[1]}</span>
                                  </Td>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  {v[0] === "id" || v[0] === "isChecked" ? (
                                    ""
                                  ) : (
                                    <Td
                                      onClick={() => console.log(v[0])}
                                      key={id}
                                    >
                                      {v[1]}{" "}
                                    </Td>
                                  )}
                                </>
                              )}
                            </>
                          )
                        })}
                        <Td className="curser" onClick={() => DeleteData(i)}>
                          {" "}
                          ❌{" "}
                        </Td>
                      </Tr>
                    </>
                  )
                })}
              </Tbody>
            </Table>

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? "Edit Customer" : "Add Customer"}
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row form>
                    <Col className="col-12">
                      {tableValue.map(f => {
                        return (
                          <>
                            <div className="mb-3">
                              {/* <Label className="form-label">{f}</Label> */}
                              <Label className="form-label">
                                {tableHeading.filter(i => i.match(f))[0] || f}
                              </Label>
                              <Input
                                name={f}
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
                                invalid={
                                  validation.touched.username &&
                                  validation.errors.username
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.username &&
                              validation.errors.username ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.username}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </>
                        )
                      })}

                      {/* <div className="mb-3">
                        <Label className="form-label">Phone No</Label>
                        <Input
                          name="phone"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email Id</Label>
                        <Input
                          name="email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Address</Label>
                        <Input
                          name="address"
                          type="textarea"
                          rows="3"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address || ""}
                          invalid={
                            validation.touched.address &&
                            validation.errors.address
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address &&
                        validation.errors.address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.address}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Rating</Label>
                        <Input
                          name="rating"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.rating || ""}
                          invalid={
                            validation.touched.rating &&
                            validation.errors.rating
                              ? true
                              : false
                          }
                        />
                        {validation.touched.rating &&
                        validation.errors.rating ? (
                          <FormFeedback type="invalid">
                            {validation.errors.rating}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Wallet Balance</Label>
                        <Input
                          name="walletBalance"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.walletBalance || ""}
                          invalid={
                            validation.touched.walletBalance &&
                            validation.errors.walletBalance
                              ? true
                              : false
                          }
                        />
                        {validation.touched.walletBalance &&
                        validation.errors.walletBalance ? (
                          <FormFeedback type="invalid">
                            {validation.errors.walletBalance}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Joining Date</Label>
                        <Input
                          name="joiningDate"
                          type="date"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.joiningDate || ""}
                          invalid={
                            validation.touched.joiningDate &&
                            validation.errors.joiningDate
                              ? true
                              : false
                          }
                        />
                        {validation.touched.joiningDate &&
                        validation.errors.joiningDate ? (
                          <FormFeedback type="invalid">
                            {validation.errors.joiningDate}
                          </FormFeedback>
                        ) : null}
                      </div> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-success save-customer"
                        >
                          Save
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>

        <div>
          <Pagination
            data={TotleData}
            onClick={paginationData => setCurrentpagData(paginationData)}
          />
        </div>
      </CardBody>
    </>
  )
}

export default CommonTable
