import styles from '../styles/Home.module.css';
import Link from 'next/link';

import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from 'react-query';

const API_URL = 'https://jsonplaceholder.ir/graphql';
const graphQLClient = new GraphQLClient(API_URL);

const reactQuery = () => {

   const { data: postsData, isLoading, error } = useQuery("posts", async () => {
      return await graphQLClient.request(gql`
         query {
            posts {
               id
               title
            }
         }
      `);
   });

   if (isLoading) {
      return (
         <div>
            <span className="spinner-border"></span> Loading Post...
         </div>
      );
   }

   if (error) {
      return (
         <div className="alert alert-danger">
            Error fetching post: {error.message}
         </div>
      );
   }

   const posts = postsData.posts;
   console.log(posts);

   return (

      <div className={styles.container}>
         <Link href='/'><h1>Back</h1></Link>
         {posts.map(post => (
            <div key={post.id}>
               <p>{post.id}.- {post.title}</p>
            </div>
         ))}
      </div>

   )
}

export default reactQuery;