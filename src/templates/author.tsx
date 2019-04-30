import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { User } from "../types"
// import SEO from "../components/seo"

interface UserPageProps {
  data: {
    strapiUser: User
  }
  location: {
    pathname: string
  }
}

const UserPage = ({
  data: { strapiUser: author },
  location,
}: UserPageProps) => {
  return (
    <Layout pathname={location.pathname}>
      {author.fullName} - {author.email}
    </Layout>
  )
}

export default UserPage

export const query = graphql`
  query($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      email
      fullName
    }
  }
`
