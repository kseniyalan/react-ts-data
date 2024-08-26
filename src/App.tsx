import { type ReactNode, useEffect, useState } from 'react';

import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import { get } from './util/http.ts';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage.tsx'; 

// The type of the raw data fetched from the API.
type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      setError(null);
      try {
        // get() is a generic function that can return data of any type we want.
        // Here we provide the type RawDataBlogPost as the type argument -> so function will return data of this type.
        const data = await get<RawDataBlogPost[]>(
          'https://jsonplaceholder.typicode.com/posts'
        );

        // Transform the raw data of RawDataBlogPost type into BlogPost type.
        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        // If error is the instance of JavaScript Error class, set the error message.
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to fetch posts!');
        } 
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Loading...</p>;
  }

  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {content}
    </main>
  );
}

export default App;
