import { useEffect, useState, useCallback } from 'react';
// import { Component } from 'react';
import { loadPost } from '../functions/load-posts';
import { Post } from '../components/Post/Post';
import Button from '../components/Button/index';
import './Home.css';
import { Input } from '../components/TextInput/input';

const Home = () => {
  const [ posts, setPosts ] = useState([])
  const [ allPosts, setAllPosts ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ postPerPage ] = useState(3)
  const [ search, setSearch ] = useState('')

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filteredPosts = !!search 
  ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(search.toLowerCase());
  })
  : 
  posts;

  const loadMorePosts = () => {
    const nextPage = page + postPerPage; // 0 4, 4 8, 8 12...
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    posts.push(...nextPosts);

    setPosts(posts)
    setPage(nextPage)
  }

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPost();
    
    setPosts(postsAndPhotos.slice(page, postPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [ handleLoadPosts, postPerPage ])
  
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value)
  }

  return (
    <section className="container">
      <div className='search-container'>
        { !!search && (
            <h1>Resultados para: { search } </h1>
        )}

        <Input 
          handleChange = { handleChange }
          search = { search }
        />
      </div>

      {filteredPosts.length === 0 && (
        <p>Nenhum resultado para: { search }</p>
      )}

      {filteredPosts.length > 0 && (
        <Post
          posts = { filteredPosts }
        />
      )}
      
      <div className='button-container'> 
        { !!search || (
          <>
            <Button           
              text = "Load more"
              onClick = { loadMorePosts } 
              disabled = { noMorePosts }
            />
          </>
        )}
      </div>
    </section>
  )
}

export default Home;

// export default class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postPerPage: 3,
//     search: ''
//   };

//   timeOutUpDate = null;

//   componentWillUnmount(){
//     clearTimeout(this.timeOutUpDate) // limpa lixo
//   }

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postPerPage; // 0 4, 4 8, 8 12...
//     const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   }

//   loadPosts = async () => {
//     const { pages, postPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();

//     this.setState(
//       { 
//         posts: postsAndPhotos.slice(pages, postPerPage), 
//         allPosts: postsAndPhotos
//       }
//     );
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ search: value }); 
//   }

//   render() {
//     const { posts, page, postPerPage, allPosts, search } = this.state;
//     const noMorePosts = page + postPerPage >= allPosts.length;

//     const filteredPosts = !!search 
//     ?
//     allPosts.filter(post => {
//       return post.title.toLowerCase().includes(search.toLowerCase());
//     })
//     : 
//     posts;

//     return (
//       <section className="container">
//         <div className='search-container'>
//           { !!search && (
//               <h1>Resultados para: {search} </h1>
//           )}

//           <Input 
//             handleChange = { this.handleChange }
//             search = { search }
//           />
//         </div>

//         {filteredPosts.length === 0 && (
//           <p>Nenhum resultado para: {search}</p>
//         )}

//         {filteredPosts.length > 0 && (
//           <Posts
//             posts = { filteredPosts }
//           />
//         )}
        

//         <div className='button-container'> 
//           { !!search || (
//             <>
//               <Button           
//                 func = { this.loadMorePosts } 
//                 disabled = { noMorePosts }
//               />
//             </>
//           )}
//         </div>
//       </section>
//     )
//   }
// }