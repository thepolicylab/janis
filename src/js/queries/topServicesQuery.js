const topServicesQuery = `
  query topServices {
    allServicePages(live:true, first:4) {
      edges {
        node {
          id
          title
          slug
          coaGlobal
          departments {
            id
            title
            slug
          }
          topics {
            edges {
              node {
                topic {
                  id,
                  slug,
                  title,
                  description,
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default topServicesQuery;
