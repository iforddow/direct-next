/* 
A method to fetch data from Directus. Uses the Fetch API
rather than Directus SDK to use NextJS caching capabilities.

Note that this fetch will only get publicly accessible data.
Anything not publicly accessible will return a 403 Forbidden error.

@author IFD
@since 2025-08-13
*/
export async function fetchFromDirectus(endpoint: string) {
  // Get base url of directus
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

  // Fetch the data from Directus
  const response = await fetch(`${baseUrl}${endpoint}`);

  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  // Return the JSON response
  return response.json();
}
