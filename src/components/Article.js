import React from 'react';
import axios from 'axios';

const Article = ({ article }) => {

    const [isEditing, setIsEditing] = React.useState(false);
    const [editContent, setEditContent] = React.useState(article.content);

    const dateFormater = (date) => {
        const dateObject = new Date(date);
        const dateString = dateObject.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        return dateString;
    }
    const handleEdit = () => {
        
        const data = {
            content: editContent ? editContent : article.content,
            author: article.author,
            date: article.date,
            updatedAt: Date.now()
        }

        axios.put('http://localhost:3004/articles/' + article.id, data)
            .then(res => {
                console.log(res);
                setIsEditing(false);
            })
    }   

    const handleDelete = (articleId) => {
        axios.delete('http://localhost:3004/articles/' + articleId)
            .then(res => {
                console.log(res);
            }
            )
        window.location.reload();
    }
            
    return (
        <div className="article">
            <div className="card-header">
                <h4>{article.author}</h4>
                <em>Posté le {dateFormater(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea
                    defaultValue={ editContent ? editContent: article.content}
                    autoFocus
                    onChange={(e) => setEditContent(e.target.value)}
                >
                </textarea>
            ) : (
                <p>{ editContent ? editContent : article.content}</p>
            )}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={handleEdit}>Enregistrer</button>
                ) : (
                <button onClick={() => setIsEditing(true)}>Editer</button>
                )}
                <button  
                onClick={() => {
                    if(window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
                    handleDelete(article.id);
                    }
                }
            }
                >Supprimer</button>
            </div>
        </div>
    );
}

export default Article;