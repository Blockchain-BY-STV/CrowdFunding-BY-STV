import { useState, useEffect } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "./particles.js";
// Components
import Navbar from "./components/Navbar";
import styles from "./index.css";

//operation
import { ContributeFundOperation, endFund } from "./utils/operation";

//tzkt
import { fetchStorage } from "./utils/tzkt";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [total_fund, setAmount] = useState(0);
  // const [goal,setGoal]=useState(100);
  const [contributor, setContributors] = useState([]);
  const [currency, setCurrency] = useState(0);
  const [loadingContribution, setLoadingContribution] = useState(false);


  
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  
  const particlesLoaded = (container) => {
    console.log(container);
  };
  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchStorage();
      setContributors(Object.values(storage.contributors));
      setAmount(storage.total_amount);
      // setGoal(storage.goal);
    })();
  }, []);

  const onEndGame = async () => {
    try {
      setLoading(true);
      // await endGameOperation();
      await endFund();
      alert("GAME ENDED!");
    } catch (err) {
      alert("Failed to end!");
    }
    setLoading(false);
  };
  const onContribute = async () => {
    try {
      // setLoading(true);
      setLoadingContribution(true);
      // await ContributeFundOperation();
      await ContributeFundOperation(currency);
      alert("CONTRIBUTED!");
    } catch (err) {
      alert("Failed to contribute!");
    }
    // setLoading(false);
    setLoadingContribution(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The amount you entered: ${currency}`);
  };

  return (
    <div className="h-100">
      <Navbar />
      {/* <h1>Crowdfunding Daap</h1> */}
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        {/* <div className="py-1">Tickets remaining: {tickets}</div> */}
        <div className={styles.py-1}>FUND ACHIEVED: {total_fund}</div>

        <form onSubmit={handleSubmit}>
          <label>
            Enter the amount you want to contribute in standard currency:
            <input
              type="number"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </label>
          {/* <input type="submit" /> */}
          <input type="submit" value="Update amount" />
        </form>

        {/* <MyForm /> Include the MyForm component here */}
        {/* Action Buttons */}
        {/* {total_fund <= goal ? ( */}
        <button onClick={onContribute} className="btn btn-primary btn-lg">
          {/* TODO 7.b - Call onBuyTicket on click */}
          {/* TODO 7.c - Show "loading..." when buying operation is pending */}
          {/* {loading===true ?"Loading..":"Contribute"} */}
          {loadingContribution ? "Loading..." : "Contribute"}
        </button>
        {/* ) : ( */}
        {/* <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
        {/* TODO 11.c - Show "loading..." when buying operation is pending */}
        {/* {loading===true ?"Loading..":"End Game"} */}
        {/* </button> */}
        {/* )} */}
        {/* List of Players */}
        <div className="mt-2">
          {contributor.map((cont, index) => (
            <div key={index}>
              <b>Contributor {index}:</b> {cont}
            </div>
          ))}
          <section>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesConfig}
            loaded={particlesLoaded}
          />
        </section>
        </div>
      </div>
    </div>
  );
};

export default App;
