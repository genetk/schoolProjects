export type Pagination = {
    "docs": [
      {
        "_id": string,
        "title": string,
        "description":string
      }
    ],
    "totalDocs": number,
    "limit": number,
    "totalPages": number,
    "page": number,
    "pagingCounter": number,
    "hasPrevPage": boolean,
    "hasNextPage": boolean,
    "prevPage": null,
    "nextPage": number
  }