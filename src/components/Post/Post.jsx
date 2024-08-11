import { PostData } from "../PostCard"

export const Post = ({ posts = [] }) => {
    return(
        <div className="posts">
            {posts.map(post => (
                <PostData 
                    key={ post.id }
                    title={ post.title }
                    body={ post.body }
                    id={ post.id }
                    cover={ post.cover }
                />
            ))}
        </div>
    )
}