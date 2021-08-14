import React from "react"
import Helmet from "react-helmet"
import Contributions from "./Contributions"
import OpenIssues from "./OpenIssues"

const Dashboard = () => (
  <>
    <Helmet title="Maintainer Dashboard" />
    <Contributions />
    <OpenIssues />
  </>
)

export default Dashboard
