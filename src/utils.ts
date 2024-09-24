export const getParams = (
  query: string,
  queryParams: Partial<{
    [key: string]: string | string[]
  }>,
) => {
  let conditions: string[] = []
  let params: any[] = []

  // Loop through each query parameter and build conditions dynamically
  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      conditions.push(`${key} LIKE  '%' || ? || '%'`)
      params.push(queryParams[key])
    }
  }
  let newQuery = query

  // If there are conditions, append them to the query
  if (conditions.length > 0) {
    newQuery += ' WHERE ' + conditions.join(' AND ')
  }

  return { params, newQuery }
}
