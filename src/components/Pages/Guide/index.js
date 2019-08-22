import React, { Component } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import ReactDOM from 'react-dom';
import Stickyfill from 'stickyfilljs';
import { sortBy } from 'lodash';

import ContextualNav from 'components/PageSections/ContextualNav';
import GuideSectionWrapper from 'components/Pages/Guide/GuideSectionWrapper';
import GuideContactInformation from 'components/Pages/Guide/GuideContactInformation';
import GuideSectionList from 'components/Pages/Guide/GuideSectionList';
import GuideBannerImage from 'components/Pages/Guide/GuideBannerImage';
import GuideSidebar from 'components/Pages/Guide/GuideSidebar';

// TODO: make this not break with broken data

class Guide extends Component {
  constructor(props) {
    super(props);
    this.mainContent = React.createRef();
    this.mainContentOffsetTop = null;
    this.state = {
      currentSection: null
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.registerSection = this.registerSection.bind(this);
    this.sectionLocations = [];
  }

  registerSection(offsetTop, anchorTag) {
    /**
      Need to subtract 1 from fullOffsetTop.
      This makes sidebar highlighting work when you navigate to a section by clicking on it from the sidebar.
    **/
    this.sectionLocations.push({
      offsetTop,
      anchorTag
    })
    this.sectionLocations = sortBy(this.sectionLocations, 'fullOffsetTop')
    console.log("secitonLocations::", this.sectionLocations)
  }

  handleScroll(e) {
    /**
      If the window's vertical distance from the top of the page
        (window.scrollY)
      is less than a GuideSection's vertical distance from the top of page
        (
          the sum of the mainContent container's distance from the top (mainContentOffsetTop)
          plus the GuideSection's distance from the top of its mainContent parent container (offsetTop)
          minus 1 (without it, the sidebar highlighting won't work when you navigate to a GuideSection by clicking on it from the sidebar)
        ),
      then we know that the window is positioned at the section right before that GuideSection.
      That's why we i-- at the end.
      We want the GuideSection right before the first GuideSection that is past the window's position.
    **/
    let i = 0;
    while (i < this.sectionLocations.length) {
      if (window.scrollY < (this.mainContentOffsetTop + this.sectionLocations[i].offsetTop - 1)) {
        break;
      } else {
        i++
      }
    }
    i--;

    const currentSection = this.sectionLocations[i];
    if (currentSection) {
      console.log("window @ ", window.scrollY)
      this.setState({currentSection: currentSection.anchorTag})
    } else {
      this.setState({currentSection: null})
    }
  }

  componentDidMount(){
    // add listener for scroll events
    this.mainContentOffsetTop = this.mainContent.current.offsetTop;
    window.addEventListener('scroll', this.handleScroll);

    // Implement sticky polyfill for browsers that don't natively allow {position: sticky}
    const node = ReactDOM.findDOMNode(this); // Prefer React.createRef() in v16.3.0+
    const stickyElements = node.querySelectorAll('.sticky');
    Stickyfill.add(stickyElements);
  }

  render() {
    let {
      id,
      title,
      description,
      slug,
      topic,
      topics,
      theme,
      department,
      relatedDepartments,
      sections,
      image,
      contacts,
    } = this.props.guidePage;
    let {intl} = this.props;
    let { currentSection } = this.state;

    let contact = null;
    if (contacts && contacts.edges && contacts.edges.length) {
      contact = contacts.edges[0].node.contact;
    }

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <ContextualNav
          topic={topic}
          topics={topics}
          topiccollection={topic && topic.topiccollection}
          theme={theme}
          department={department}
          relatedDepartments={relatedDepartments}
        />
        <div>
          <div className="wrapper container-fluid">
            <GuideBannerImage image={image} />
          </div>
          <div className="coa-GuidePage-header--container">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="coa-GuidePage__content-container">
            <div className="wrapper container-fluid">
              <div className="row">
                <GuideSidebar
                  sections={sections}
                  currentSection={currentSection}
                />
                <div className="coa-GuidePage__main-content" ref={this.mainContent}>
                  <GuideSectionWrapper
                    anchorTag="Contact-information"
                    registerSection={this.registerSection}
                  >
                    <GuideContactInformation contact={contact}/>
                  </GuideSectionWrapper>
                  {sections.map((section, index) => (
                    <GuideSectionList
                      section={section}
                      registerSection={this.registerSection}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouteData(injectIntl(Guide));
