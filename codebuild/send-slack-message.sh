#!/bin/bash

# exit immediately if there are any errors
set -e

# Variables have to be exported in order to be available in the jq context
export DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export JQ_SLACK_CHANNEL=$SLACK_CHANNEL
export JQ_PROJECT=$PROJECT
export JQ_CODEBUILD_URL=$(printf "${CODEBUILD_URL}" $CODEBUILD_BUILD_ID)
export GITHUB_PR_URL="https://github.com/Science37/%s/pulls/%s"

if [ "$CODEBUILD_BUILD_SUCCEEDING" = "0" ]; then
  export JQ_TITLE=$FAILURE_TITLE
  export JQ_COLOR='danger'
else
  export JQ_TITLE=$SUCCESS_TITLE
  export JQ_COLOR='good'
fi

json=$(jq -c '.channel=env.JQ_SLACK_CHANNEL |
              .attachments[0].color=env.JQ_COLOR |
              .attachments[0].fallback=env.JQ_MESSAGE |
              .attachments[0].title=env.JQ_TITLE |
              .attachments[0].fields[0].value=env.JQ_PROJECT |
              .attachments[0].fields[1].value=env.JQ_CODEBUILD_URL' \
              < $DIR/slack-template.json)

if ((${#PULL_REQUEST_ID[@]})); then
  export JQ_PULL_REQUEST_URL=$(printf "${GITHUB_PR_URL}" $JQ_PROJECT $PULL_REQUEST_ID)
  json=$(echo $json | jq '.attachments[0].fields += [{"title": "Pull Request", "value": env.JQ_PULL_REQUEST_URL, "short": false}]')
fi
#
# if ((${#TEST_DOCUMENTATION_URL[@]})); then
#   export JQ_TEST_DOCUMENTATION_URL=$TEST_DOCUMENTATION_URL
#   json=$(echo $json | jq '.attachments[0].fields += [{"title": "Test Documentation", "value": env.JQ_TEST_DOCUMENTATION_URL, "short": true}]')
# fi

curl -s -X POST -H 'Content-type: application/json' --data "$json" "$SLACK_WEBHOOK"
