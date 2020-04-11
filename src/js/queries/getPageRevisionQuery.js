import servicePageFragment from './servicePageFragment';
import departmentPageFragment from './departmentPageFragment';
import eventPageFragment from './eventPageFragment';
import formContainerFragment from './formContainerFragment';
import guidePageFragment from './guidePageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import officialDocumentPageFragment from './officialDocumentPageFragment';
import topicCollectionFragment from './topicCollectionFragment';
import topicFragment from './topicFragment';

const getPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asServicePage {
        ...servicePageInfo
      }
      asDepartmentPage {
        ...departmentPageInfo
      }
      asEventPage {
        ...eventPageInfo
      }
      asFormContainer {
        ...formContainerInfo
      }
      asGuidePage {
        ...guidePageInfo
      }
      asInformationPage {
        ...informationPageInfo
      }
      asLocationPage {
        ...locationPageInfo
      }
      asOfficialDocumentPage {
        ...officialDocumentPageInfo
      }
      asTopicCollectionPage {
        ...topicCollectionInfo
      }
      asTopicPage {
        ...topicInfo
      }
      previewJanisInstance {
        url
        parent {
          url
          title
        }
        grandparent {
          url
          title
        }
      }
    }
  }
  ${servicePageFragment}
  ${departmentPageFragment}
  ${eventPageFragment}
  ${formContainerFragment}
  ${guidePageFragment}
  ${informationPageFragment}
  ${locationPageFragment}
  ${officialDocumentPageFragment}
  ${topicCollectionFragment}
  ${topicFragment}
`;

export default getPageRevisionQuery;