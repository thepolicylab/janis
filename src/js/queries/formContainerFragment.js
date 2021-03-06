const formContainerFragment = `
  fragment formContainerInfo on FormContainerNode {
    id
    title
    slug
    description
    formUrl
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
                      text
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
    departments {
      id
      title
      slug
    }
  }
`;

export default formContainerFragment;
