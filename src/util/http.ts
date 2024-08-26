export async function get(url: string) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
  
    // The type of data is unknown, not any. It is more type-safe.  
    const data = await response.json() as unknown; 
    return data;
  }