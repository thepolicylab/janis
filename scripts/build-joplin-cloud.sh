#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'

if [ "$HEAD" == '2497-title-for-topic-and-tc' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

if [ "$HEAD" == '2599-guide-pages' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
elif [ "$HEAD" == '2783-mobile-guide-nav' ]; then
  export CMS_API='https://joplin-pr-2783-mobile-guide-na.herokuapp.com/api/graphql'
fi

if [ "$HEAD" == '2666-hacky-janis-step-apps' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

# if [ "$HEAD" == '2662-service-step-styling' ]; then
#   export CMS_API='https://joplin-pr-2662-service-step-st.herokuapp.com/api/graphql'
# fi

yarn npm-run-all build-css build-js
