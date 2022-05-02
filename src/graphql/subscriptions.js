/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArtwork = /* GraphQL */ `
  subscription OnCreateArtwork($owner: String) {
    onCreateArtwork(owner: $owner) {
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
export const onUpdateArtwork = /* GraphQL */ `
  subscription OnUpdateArtwork($owner: String) {
    onUpdateArtwork(owner: $owner) {
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
export const onDeleteArtwork = /* GraphQL */ `
  subscription OnDeleteArtwork($owner: String) {
    onDeleteArtwork(owner: $owner) {
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
