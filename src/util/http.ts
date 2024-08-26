// Here get() is a generic function that accepts the expected return value type as a type argument
export async function get<T>(url: string) {
    const response = await fetch(url);
   
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
   
    // First, we fetch the data as an unknown type: we don't know what the data type is.
    const data = await response.json() as unknown;
    // Then, we return the data as the type T, which is the type argument of the function.
    return data as T;
}