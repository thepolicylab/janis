#!/usr/bin/env bash

AWSKID="$(echo $AWS_ACCESS_KEY_ID | cut -c1-6)[...]"

echo "----------------------------------------------------------------"
echo "-- Entrypoint Executed (docker-janis-entrypoint.sh)"
echo "--"
echo "--    DEPLOYMENT_MODE:    ${DEPLOYMENT_MODE}"
echo "--    GOOGLE_ANALYTICS:   ${GOOGLE_ANALYTICS}"
echo "--    FEEDBACK_API:       ${FEEDBACK_API}"
echo "--    CMS_API:            ${CMS_API}"
echo "--    CMS_MEDIA:          ${CMS_MEDIA}"
echo "--    NODE_PATH:          ${NODE_PATH}"
echo "--    JANIS_REPO:         ${JANIS_REPO}"
echo "----------------------------------------------------------------"
echo "--    AWS_ACCESS_KEY_ID:  ${AWSKID}"
echo "----------------------------------------------------------------"
echo ""
echo ""
exec "$@"
