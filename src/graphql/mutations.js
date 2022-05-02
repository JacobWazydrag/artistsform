/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArtwork = /* GraphQL */ `
  mutation CreateArtwork(
    $input: CreateArtworkInput!
    $condition: ModelArtworkConditionInput
  ) {
    createArtwork(input: $input, condition: $condition) {
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
export const updateArtwork = /* GraphQL */ `
  mutation UpdateArtwork(
    $input: UpdateArtworkInput!
    $condition: ModelArtworkConditionInput
  ) {
    updateArtwork(input: $input, condition: $condition) {
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
export const deleteArtwork = /* GraphQL */ `
  mutation DeleteArtwork(
    $input: DeleteArtworkInput!
    $condition: ModelArtworkConditionInput
  ) {
    deleteArtwork(input: $input, condition: $condition) {
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
