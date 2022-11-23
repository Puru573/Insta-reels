import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Component/Feed.css'
import '../Component/Profile.css'
import '../Component/Post.css'
import '../Component/Comments.css'
import AuthWrapper from '../Context/auth';

function MyApp({ Component, pageProps }) {
  return (
  <AuthWrapper>
    return <Component {...pageProps} />
  </AuthWrapper>
  )
 
 
}

export default MyApp
