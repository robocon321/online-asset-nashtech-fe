import Home from '../components/home/Home';
import HomeProvider from '../contexts/providers/HomeProvider';

const HomePage = props => {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  )
}

export default HomePage;