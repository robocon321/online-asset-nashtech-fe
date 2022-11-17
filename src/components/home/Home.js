import { useContext } from "react";
import { HomeContext } from "../../contexts/providers/HomeProvider";
const Home = props => {
  const { homeState, changeTitle } = useContext(HomeContext);
  return (
    <main>
      <h1>{homeState.title}</h1>
      <button onClick={changeTitle}>Change title</button>
    </main>
  )
}

export default Home;