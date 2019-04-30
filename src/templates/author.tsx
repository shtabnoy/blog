import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import SEO from "../components/seo"

interface StrapiUser {
  id: string
  username: string
  email: string
  fullName: string
}

interface UserPageProps {
  data: {
    strapiUser: StrapiUser
  }
}

const UserPage = ({ data: { strapiUser: author } }: UserPageProps) => {
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
