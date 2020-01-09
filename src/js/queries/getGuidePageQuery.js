const allGuidePagesQuery = `
  query getGuidePage($id: ID) {
    allGuidePages(id: $id) {
      edges {
        node {
          id
          title
          description
          slug
          contacts {
            edges {
              node {
                contact {
                  name
                  email
                  phoneNumber {
                    edges {
                      node {
                        id
                        phoneDescription
                        phoneNumber
                      }
                    }
                  }
                  socialMedia
                  hours {
                    edges {
                      node {
                        dayOfWeek
                        startTime
                        endTime
                      }
                    }
                  }
                  location {
                    name
                    street
                    city
                    state
                    zip
                    country
                  }
                }
              }
            }
          }
          image {
            id
            filename
            title
          }
          relatedDepartments {
            edges {
              node {
                relatedDepartment {
                  id
                  title
                  slug
                }
              }
            }
          }
          sections {
            heading
            pages {
              url
              servicePage {
                title
                shortDescription
                additionalContent
                steps {
                  value
                  stepType
                  locations {
                    locationPage {
                      id
                      slug
                      title
                      physicalStreet
                      physicalUnit
                      physicalCity
                      physicalState
                      physicalZip
                    }
                  }
                }
                slug
              }
              informationPage {
                title
                description
                additionalContent
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export default allGuidePagesQuery;
