//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

//componentes
import PostDetail from '../../components/PostDetail'


import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div>
        <h2>Search</h2>
        <div>
        {posts && posts.map((post) => <PostDetail key={post.uid} post={post}/>)}
        {posts && posts.length === 0 && (
            <>
                <p>Não foram encontrado posts a partir da sua busca...</p>
                <Link to='/' className='btn btn-dark'>
                    Voltar
                </Link>
            </>
        )}
        </div>
    </div>
  )
}

export default Search;