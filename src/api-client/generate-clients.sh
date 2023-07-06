docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i /local/openapi.yml \
    -g 	typescript-axios \
    -o /local/src/api-client/generated
