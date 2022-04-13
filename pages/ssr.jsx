import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
   uri: "https://jsonplaceholder.ir/graphql",
   cache: new InMemoryCache(),
});

const getPosts = async () => {

   const getPostQuery = gql`
      query {
         posts {
            id
            title
         }
      }
   `;

   return await client.query({query: getPostQuery})
}

const ssr = ({ posts }) => {

   return (
      <div className={styles.container}>
         <Link href='/'><h1>Back</h1></Link>
         {
            posts.map(post => (
               <div key={post.id}>
                  <p>{post.id}.- {post.title}</p>
               </div>
            ))
         }
      </div>
   )
}

export default ssr;

export const getStaticProps = async () => {

	const {data} = await getPosts();
   const posts = data.posts
	return {
		props: {
			posts
		}
	}
}