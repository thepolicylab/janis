import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';
import LocationInfo from 'components/Pages/Location/LocationInfo';
import LocationServiceList from 'components/Pages/Location/LocationServiceList';
import LocationGettingHere from 'components/Pages/Location/LocationGettingHere';
import UserFeedback from 'components/UserFeedback';

import 'components/Pages/Location/_Location.scss';

const LocationPage = ({ locationPage }) => {
  const {
    locationPage: {
      title,
      contact: { phone, email },
      location,
      image,
      hours,
      services,
      gettingHere: { buses },
    },
  } = locationPage ? { locationPage } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i className="material-icons coa-LocationPage__header-icon">place</i>
          <h1 className="coa-LocationPage__header-title">{title}</h1>
        </div>
        <LocationInfo
          phone={phone}
          email={email}
          location={location}
          image={image}
          hours={hours}
        />
        {!!services && !!services.length && (
          <LocationServiceList services={services} locationHours={hours} />
        )}
        {!!buses && !!buses.length && <LocationGettingHere buses={buses} />}
      </div>
      <UserFeedback />
    </div>
  );
};

export default LocationPage;
