import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import WorkInProgress from 'components/WorkInProgress';
import PageNotificationBanner from 'components/PageNotificationBanner';
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
        imageUrl={`${process.env.CMS_MEDIA}/images/${image.file}.original.jpg`}
        imageTitle={image.title}
        preheader={intl.formatMessage(i18n2.welcomeTo)}
      />
      <PageNotificationBanner>
        <WorkInProgress />
      </PageNotificationBanner>
      <div className="wrapper container-fluid">
        <TileGroup
          title={intl.formatMessage(i18n3.checkOutServices)}
          tiles={serviceLinks}
          tag={intl.formatMessage(i18n3.service)}
        />
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Home));
