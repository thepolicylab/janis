const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    slug
    topic {
      id
      slug
      text
      theme {
        id
        slug
        text
      }
    }
    steps
    dynamicContent
    additionalContent
    related {
      slug
      title
      topic {
        slug
        theme {
          slug
        }
      }
    }
    image {
      id
      filename
      title
    }
    contacts {
      edges {
        node {
          contact {
            name
            email
            phone
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
  }
`;

export default servicePageFragment;
