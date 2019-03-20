import { findKey } from 'lodash';
import { WEEKDAY_MAP } from 'js/helpers/constants';

export const cleanContacts = contacts => {
  if (!contacts || !contacts.edges) return null;

  const dateSeed = 'Oct 18 1982 00:00:00 GMT-0500 (CDT)';

  const getWeekday = day => WEEKDAY_MAP[day.toUpperCase()];

  const getTimestamp = hours => {
    const splitHours = hours.split(':');
    let timestamp = new Date(dateSeed);
    timestamp.setHours(splitHours[0]);
    timestamp.setMinutes(splitHours[1]);
    return timestamp.getTime();
  };

  return contacts.edges.map(({ node: contact }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, contact.contact);

    if (cleaned.phone) {
      cleaned.phone = JSON.parse(cleaned.phone);
    }
    if (cleaned.hours && cleaned.hours.edges) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => ({
        dayOfWeek: hours.dayOfWeek.toLowerCase(),
        dayOfWeekNumeric: getWeekday(hours.dayOfWeek),
        startTime: getTimestamp(hours.startTime),
        endTime: getTimestamp(hours.endTime),
      }));
    }
    return cleaned;
  });
};

export const cleanRelatedServiceLinks = links => {
  if (!links) return null;

  return links.map(link => {
    return {
      url: `/services/${link.slug}`,
      text: link.title,
    };
  });
};

export const cleanLinks = (links, pageType) => {
  if (!links || !links.edges) return null;

  return links.edges.map(({ node: link }) => {
    // Instead of using a prefix, we need to generate urls based on page type
    var pathPrefix = '';
    if (pageType === 'service') {
      // Service page links are always theme/topic based
      pathPrefix = `${link.topic.theme.slug}/${link.topic.slug}`
    }

    link.slug = link.slug || link.sortOrder;
    link.url = `${pathPrefix || ''}/${link.slug}`;
    link.text = link.text || link.title;
    return link;
  });
};

export const cleanProcesses = allProcesses => {
  if (!allProcesses || !allProcesses.edges) return null;

  let cleanedProcesses = cleanLinks(allProcesses, '/processes');
  cleanedProcesses.map(process => {
    process.contacts = cleanContacts(process.contacts);
    process.processSteps = cleanLinks(process.processSteps, process.url);

    //build step details for overview page
    process.stepDetailGroup = process.processSteps.map(
      ({ title, sortOrder, linkTitle, url, overviewSteps }) => ({
        title: `${sortOrder}. ${title}`,
        link: { text: linkTitle, url: url },
        content: overviewSteps,
      }),
    );

    //build badges for process and processStep pages
    process.badges = process.processSteps.map(
      ({ shortTitle, url, sortOrder }) => ({
        text: shortTitle,
        url: url,
        symbol: sortOrder,
      }),
    );
    process.processSteps.map(processStep => {
      processStep.processTitle = process.title;
      processStep.processUrl = process.url;
      processStep.badges = process.badges;
      processStep.topic = process.topic;
      processStep.contact = process.contact;
    });
  });
  return cleanedProcesses;
};

export const cleanServices = allServices => {
  if (!allServices || !allServices.edges) return null;

  let cleanedServices = cleanLinks(allServices, '/services');
  cleanedServices.map(service => {
    service.contacts = cleanContacts(service.contacts);
    service.related = cleanRelatedServiceLinks(service.related);

    //TODO: mapblock data should include contact data when sent via joplin
    const tempkey = findKey(service.dynamicContent, { type: 'map_block' });
    if (tempkey)
      service.dynamicContent[tempkey].value['contact'] = service.contacts.length
        ? service.contacts[0]
        : null;
  });
  return cleanedServices;
};

export const cleanInformationPages = allInformationPages => {
  if (!allInformationPages || !allInformationPages.edges) return null;

  let cleanedInformationPages = cleanLinks(allInformationPages, '/information');
  cleanedInformationPages.map(informationPage => {
    informationPage.contacts = cleanContacts(informationPage.contacts);
  });
  return cleanedInformationPages;
};

export const cleanDepartmentDirectors = directors => {
  if (!directors || !directors.edges) return null;

  return directors.edges.map(({ node: director }) => {
    // Yes, it's `contact.contact` because of the way the API returns data
    let cleaned = Object.assign({}, director);

    return cleaned;
  });
};

export const cleanDepartments = allDepartments => {
  if (!allDepartments || !allDepartments.edges) return null;

  return allDepartments.edges.map(({ node: department }) => {
    department.url = `/departments/${department.slug}`;
    department.text = department.title;
    department.contacts = cleanContacts(department.contacts);
    department.directors = cleanDepartmentDirectors(
      department.departmentDirectors,
    );
    return department;
  });
};

export const cleanTopics = allTopics => {
  if (!allTopics || !allTopics.edges) return null;

  let cleanedTopics = cleanLinks(allTopics, '/topics');
  cleanedTopics.map(topic => {
    topic.services = cleanLinks(topic.servicepageSet, '/services'); //for navigation
    topic.tiles = topic.services; //for theme page
  });
  return cleanedTopics;
};

export const cleanThemes = allThemes => {
  if (!allThemes || !allThemes.edges) return null;

  let cleanedThemes = cleanLinks(allThemes, '/themes');
  cleanedThemes.map(theme => {
    theme.topics = cleanTopics(theme.topics);
  });

  return cleanedThemes;
};

export const cleanNavigation = navigation => {
  const { allThemes } = navigation;

  if (!allThemes || !allThemes.edges) return null;

  let cleanedNavigation = cleanLinks(allThemes, '/themes');
  cleanedNavigation.map(theme => {
    theme.topics = cleanTopics(theme.topics);
  });

  return cleanedNavigation;
};

export const clean311 = threeoneone => {
  const { all311 } = threeoneone;

  if (!all311 || !all311.edges) return null;

  return all311.edges.map(({ node: link }) => {
    const { title, url } = link;
    return {
      url: url,
      text: title,
    };
  });
};
