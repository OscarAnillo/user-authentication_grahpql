import { AuthContext } from '../Context/auth-context';
import { useContext } from 'react';
import PropTypes from 'prop-types';


export const HomePage = ({ messages, loading }) => {
  const { user } = useContext(AuthContext)
  console.log(messages);
    return (
        <div style={{textAlign:"center", paddingTop:"2em"}}>
            <h1>This is the Home Page</h1>
            { user ? 
              <>
                <h2>Logged in email: {user.email}</h2>
                
                {loading ? <h1>Loading</h1> : messages.map((item) => (
                  <div key={item.text} style={{margin:".7em 0"}}>
                    <ul>
                      <li><strong>Text: </strong>{item.text}</li>
                      <li><strong>Time: </strong>{item.createdAt}</li>
                      <li><strong>Username: </strong>{item.createdBy}</li>
                    </ul>
                  </div>
                ))}
              </> 
              : 
              <>
                <h2>No user data</h2>
              </> 
            }
        </div>
    )
}

HomePage.propTypes = {
  messages: PropTypes.array,
  loading: PropTypes.bool
}