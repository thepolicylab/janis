import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { callToAction as i18n1, misc as i18n2, pageType as i18n3 } from 'js/i18n/definitions';

import WorkInProgress from 'components/WorkInProgress';
import SecondaryContentBanner from 'components/SecondaryContentBanner';
import HeroHome from 'components/HeroHome';
import ExternalLink from 'components/ExternalLink';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import { cleanLinks } from 'js/helpers/cleanData';

const Home = ({ topServices, image, intl }) => {
  //TODO: clean data where sourced
  const serviceLinks = cleanLinks(topServices, '/services');

  return (
    <div>
      <HeroHome
        imageUrl={`${process.env.CMS_MEDIA}/${image.file}`}
        imageTitle={image.title}
        preheader={intl.formatMessage(i18n2.welcomeTo)}
      />
      <SecondaryContentBanner>
          <WorkInProgress />
      </SecondaryContentBanner>
      <div className="wrapper container-fluid">
        <TileGroup
          title={intl.formatMessage(i18n1.checkOutServices)}
          tiles={serviceLinks}
          tag={intl.formatMessage(i18n3.service)}
        />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Home));
