/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArtwork = /* GraphQL */ `
  query GetArtwork($id: ID!) {
    getArtwork(id: $id) {
      id
      title
      description
      status
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listArtworks = /* GraphQL */ `
  query ListArtworks(
    $filter: ModelArtworkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArtworks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
