import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';

import PageHeader from 'js/modules/PageHeader';
import TileGroup from 'js/modules/TileGroup';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

import { cleanLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
const services311 = get(jsonFileData, "services311", null);

const Topics = ({ allTopics }) => {
  const links = cleanLinks(allTopics, '/topics');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={"All Topics"} />
      </div>
      <div className="wrapper">
        <TileGroup tiles={links} tag="topic" />
      </div>
      <ThreeOneOne services311={services311} />
    </div>
  )
}

export default withRouteData(Topics);
