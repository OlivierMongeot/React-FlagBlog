import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Article from '../components/Article';

const Blog = () => {


    const [content, setContent] = React.useState('');
    const [error, setError] = React.useState(false);
    const [blogData, setBlogData] = React.useState([]);
    const[author, setAuthor] = React.useState('');

    React.useEffect(() => 
        getData(), []);

    const getData = async () => {
        axios.get('http://localhost:3004/articles')
            .then(res => {
                console.log(res);
                setBlogData(res.data);
            
            })
            .catch(err => {
                console.log(err);
            }
            );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(content);
        if (content.length < 140) {
            setError(true);
        } else {
            axios.post('http://localhost:3004/articles', {
                content: content,
                author: author,
                date: Date.now()

            })
            setError(false);
            setAuthor("");
            setContent("");
            getData();
        }
    }

    return (
        <div className="blog-container">
        <Logo />
        <Navigation />
        <h1>Blog</h1>
      
        <form onSubmit={(e) => handleSubmit(e)}>  
            <input
             type="text" 
             placeholder="Nom" 
             onChange={(e) => setAuthor(e.target.value)} 
             value={author} />
            <textarea
            style={{ border: error ? '1px solid red' : '1px solid black' }}
            placeholder="Message" 
            onChange={(e) => setContent(e.target.value)}
            value={content} 
            >
            </textarea>
            {/* Change color counter to green if lenght > 140 */}
            <p className={(content.length >= 140) ? "counter-green" : "counter"}>{content.length} /140</p>
               {/* <p>{content.length}/140</p> */}

                { error && <p>
            Veuillez ecrire un minimum de 140 caractères pour poster votre article.
        </p>}
            <input type="submit" value="Envoyer" />
        </form>
        <ul> 
            {blogData
            .sort((a, b) => b.date - a.date)
            .map(article => (
                    <Article key={article.id} article={article} />
            ))}
               </ul>
        </div>
    );
    }
export default Blog;