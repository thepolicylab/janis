import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';

// TODO: clean these up/remove them
import allThemesQuery from 'js/queries/allThemesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import all311Query from 'js/queries/all311Query';

// Shiny ✨ new queries!
import siteStructureQuery from 'js/queries/siteStructureQuery';
import getTopicCollectionPageQuery from 'js/queries/getTopicCollectionPageQuery';
import getTopicPageQuery from 'js/queries/getTopicPageQuery';
import getInformationPageQuery from 'js/queries/getInformationPageQuery';
import getServicePageQuery from 'js/queries/getServicePageQuery';
import getDepartmentPageQuery from 'js/queries/getDepartmentPageQuery';
import getOfficialDocumentPageQuery from 'js/queries/getOfficialDocumentPageQuery';

import {
  cleanLinks,
  cleanDepartments,
  cleanTopics,
  cleanTopicCollections,
  cleanThemes,
  cleanServices,
  cleanInformationPages,
  clean311,
  cleanNavigation,
  cleanOfficialDocumentPages,
  cleanGuidePages,
} from 'js/helpers/cleanData';

const makeAllPages = async langCode => {
  const path = `/${!!langCode ? langCode : ''}`;
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);

  console.log(`📡 Requesting site structure`);
  const siteStructure = await client.request(siteStructureQuery);
  const parsedStructure = JSON.parse(siteStructure.siteStructure.structureJson);
  console.log(`🎉 Site structure acquired`);

  const topicCollectionPages = parsedStructure.filter(
    p => p.type === 'topic collection',
  );
  const topicCollectionData = topicCollectionPages.map(topicCollectionPage => ({
    path: topicCollectionPage.url,
    component: 'src/components/Pages/TopicCollection',
    getData: async () => {
      console.log(`📡 Requesting page data for ${topicCollectionPage.url}`);
      const { allTopicCollections } = await client.request(
        getTopicCollectionPageQuery,
        { id: topicCollectionPage.id },
      );

      let cleanedTopicCollections = cleanTopicCollections(allTopicCollections);

      cleanedTopicCollections[0].topics.push({
        slug: 'no-topics',
        title: 'No topics selected',
        topiccollection: {
          theme: {
            slug: 'blarg',
          },
          slug: 'blarg',
        },
      });

      console.log(`🎉 Completed building page at ${topicCollectionPage.url}`);
      return { tc: cleanedTopicCollections[0] };
    },
  }));

  const topicPages = parsedStructure.filter(p => p.type === 'topic');
  const topicData = topicPages.map(topicPage => ({
    path: topicPage.url,
    component: 'src/components/Pages/Topic',
    getData: async () => {
      console.log(`📡 Requesting page data for ${topicPage.url}`);
      const { allTopics } = await client.request(getTopicPageQuery, {
        id: topicPage.id,
      });

      let cleanedTopics = cleanTopics(allTopics);

      cleanedTopics[0].topiccollection = {
        theme: {
          slug: 'blarg',
        },
        topics: [
          {
            id: 'blarg',
          },
        ],
        slug: 'blarg',
      };

      console.log(`🎉 Completed building page at ${topicPage.url}`);
      return { topic: cleanedTopics[0] };
    },
  }));

  const departmentPages = parsedStructure.filter(p => p.type === 'department');
  const departmentPageData = departmentPages.map(departmentPage => {
    return {
      path: departmentPage.url,
      component: 'src/components/Pages/Department',
      getData: async () => {
        console.log(`📡 Requesting page data for ${departmentPage.url}`);

        const { allDepartmentPages } = await client.request(
          getDepartmentPageQuery,
          {
            id: departmentPage.id,
          },
        );

        let cleanedDepartmentPages = cleanDepartments(allDepartmentPages);

        console.log(`🎉 Completed building page at ${departmentPage.url}`);
        return { department: cleanedDepartmentPages[0] };
      },
    };
  });

  const informationPages = parsedStructure.filter(
    p => p.type === 'information page',
  );
  const informationPageData = informationPages.map(informationPage => {
    return {
      path: informationPage.url,
      component: 'src/components/Pages/Information',
      getData: async () => {
        console.log(`📡 Requesting page data for ${informationPage.url}`);
        const { allInformationPages } = await client.request(
          getInformationPageQuery,
          { id: informationPage.id },
        );

        let cleanedInformationPages = cleanInformationPages(
          allInformationPages,
        );

        if (
          cleanedInformationPages &&
          cleanedInformationPages[0] &&
          cleanedInformationPages[0].topic
        ) {
          cleanedInformationPages[0].topic.topiccollection = {
            theme: {
              slug: 'blarg',
            },
            topics: [
              {
                id: 'blarg',
              },
            ],
            slug: 'blarg',
          };
        }

        console.log(`🎉 Completed building page at ${informationPage.url}`);
        return { informationPage: cleanedInformationPages[0] };
      },
    };
  });

  const servicePages = parsedStructure.filter(p => p.type === 'service page');
  const servicePageData = servicePages.map(servicePage => {
    return {
      path: servicePage.url,
      component: 'src/components/Pages/Service',
      getData: async () => {
        console.log(`📡 Requesting page data for ${servicePage.url}`);

        const { allServicePages } = await client.request(getServicePageQuery, {
          id: servicePage.id,
        });

        let cleanedServicePages = cleanServices(allServicePages);

        if (cleanedServicePages[0].topic) {
          cleanedServicePages[0].topic.topiccollection = {
            theme: {
              slug: 'blarg',
            },
            topics: [
              {
                id: 'blarg',
              },
            ],
            slug: 'blarg',
          };
        }

        console.log(`🎉 Completed building page at ${servicePage.url}`);
        return { service: cleanedServicePages[0] };
      },
    };
  });

  const officialDocumentPages = parsedStructure.filter(
    p => p.type === 'official document page',
  );
  const officialDocumentPageData = officialDocumentPages.map(
    officialDocumentPage => {
      return {
        path: officialDocumentPage.url,
        component: 'src/components/Pages/OfficialDocumentList',
        getData: async () => {
          console.log(
            `📡 Requesting page data for ${officialDocumentPage.url}`,
          );

          const { allOfficialDocumentPages } = await client.request(
            getOfficialDocumentPageQuery,
            {
              id: officialDocumentPage.id,
            },
          );

          let cleanedOfficialDocumentPages = cleanServices(
            allOfficialDocumentPages,
          );

          if (cleanedOfficialDocumentPages[0].topic) {
            cleanedOfficialDocumentPages[0].topic.topiccollection = {
              theme: {
                slug: 'blarg',
              },
              topics: [
                {
                  id: 'blarg',
                },
              ],
              slug: 'blarg',
            };
          }

          console.log(
            `🎉 Completed building page at ${officialDocumentPage.url}`,
          );
          return { officialDocumentPage: cleanedOfficialDocumentPages[0] };
        },
      };
    },
  );

  const data = {
    path: path,
    component: 'src/components/Pages/Home',
    children: topicCollectionData
      .concat(topicData)
      .concat(departmentPageData)
      .concat(informationPageData)
      .concat(servicePageData)
      .concat(officialDocumentPageData),
    getData: async () => {
      const { allServicePages } = await client.request(topServicesQuery);
      let services = cleanLinks(allServicePages, 'service');

      // Make sure we don't have any dupes in top services
      services = services.filter(
        (service, index) =>
          index === services.findIndex(s => s.id === service.id),
      );

      const topServices = services.map(s => ({
        type: !!langCode ? langCode : 'en',
        url: s.url,
        title: s.title,
      }));

      return {
        topServices,
        image: {
          file: 'tomek-baginski-593896-unsplash',
          title: 'Lady Bird Lake',
        },
      };
    },
  };

  return data;
};

export default {
  // siteRoot: 'https://alpha.austin.gov',
  //basePath // Do not alter this line if you want a working PR
  basePath: process.env.BASE_PATH_PR ? process.env.BASE_PATH_PR : '/',
  stagingSiteRoot: 'https://janis-staging.herokuapp.com/',
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getSiteData: async () => {
    const queries = [
      {
        query: allThemesQuery,
        dataKey: 'navigation',
        middleware: cleanNavigation,
      },
      {
        query: all311Query,
        dataKey: 'threeoneone',
        middleware: clean311,
      },
    ];
    const requests = [];
    const data = {};
    SUPPORTED_LANG_CODES.map(langCode => {
      const client = createGraphQLClientsByLang(langCode);
      queries.map(query => {
        requests.push(client.request(query.query));
        data[query.dataKey] = data[query.dataKey] || {};
        data[query.dataKey][langCode] = null;
      });
    });

    (await Promise.all(requests)).forEach((response, i) => {
      const queryIndex = i % queries.length;
      const langIndex = (i - queryIndex) / queries.length;
      data[queries[queryIndex].dataKey][SUPPORTED_LANG_CODES[langIndex]] =
        typeof queries[queryIndex].middleware === 'function'
          ? queries[queryIndex].middleware(
              response,
              SUPPORTED_LANG_CODES[langIndex],
            )
          : response;
    });

    return data;
  },
  getRoutes: async () => {
    const routes = [
      {
        path: '/search',
        component: 'src/components/Pages/Search', //TODO: update search page to be conscious of all languages
      },
      {
        is404: true,
        component: 'src/components/Pages/404', //TODO: update 404 page to be conscious of all languages
      },
    ];

    const allLangs = Array.from(SUPPORTED_LANG_CODES);
    allLangs.unshift(undefined);
    const translatedRoutes = await Promise.all(
      allLangs.map(langCode => makeAllPages(langCode)),
    );
    const allRoutes = routes.concat(translatedRoutes);

    return allRoutes;
  },
  webpack: (config, { stage }) => {
    // Include babel poyfill for IE 11 and below
    // https://github.com/nozzle/react-static/blob/811ebe1b5a5b8e24fffec99fcdb3375818383711/docs/concepts.md#browser-support
    if (stage === 'prod') {
      config.entry = ['babel-polyfill', config.entry];
    } else if (stage === 'dev') {
      config.entry = ['babel-polyfill', ...config.entry];
    }
    return config;
  },
};
