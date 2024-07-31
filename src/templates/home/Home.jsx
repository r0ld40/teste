import { Component } from 'react';
import { loadPosts } from '../../functions/load-posts';
import { Posts } from '../../Posts-page/Posts/posts';
import { Button } from '../../components/Button/button';
import './Home.css';
import { Input } from '../../components/TextInput/input';

export default class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 3,
    search: ''
  };

  timeOutUpDate = null;

  componentWillUnmount(){
    clearTimeout(this.timeOutUpDate) // limpa lixo
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postPerPage; // 0 4, 4 8, 8 12...
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  loadPosts = async () => {
    const { pages, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState(
      { 
        posts: postsAndPhotos.slice(pages, postPerPage), 
        allPosts: postsAndPhotos
      }
    );
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value }); 
  }

  render() {
    const { posts, page, postPerPage, allPosts, search } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!search 
    ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    })
    : 
    posts;

    return (
      <section className="container">
        <div className='search-container'>
          { !!search && (
              <h1>Resultados para: {search} </h1>
          )}

          <Input 
            handleChange = { this.handleChange }
            search = { search }
          />
        </div>

        {filteredPosts.length === 0 && (
          <p>Nenhum resultado para: {search}</p>
        )}

        {filteredPosts.length > 0 && (
          <Posts
            posts = { filteredPosts }
          />
        )}
        

        <div className='button-container'> 
          { !!search || (
            <>
              <Button           
                func = { this.loadMorePosts } 
                disabled = { noMorePosts }
              />
            </>
          )}
        </div>
      </section>
    )
  }
}