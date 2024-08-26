import { type ReactNode, useEffect, useState } from 'react';

import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import { get } from './util/http.ts';
import fetchingImg from './assets/data-fetching.png';

// The type of the raw data fetched from the API.
type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPosts() {
      // get() is a generic function that can retata of any type we want.
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

      // Now we can use the transformed data.
      setFetchedPosts(blogPosts);
    }

    fetchPosts();
  }, []);

  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {fetchedPosts ? (
        <BlogPosts posts={fetchedPosts} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;
