import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Account from './routes/Account';
import axios from 'axios';
import CoinPage from './routes/CoinPage';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const [coins, setCoins] = useState([]);

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data)
    });
  }, [url]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Switch>
          <Route exact path='/' ><Home coins={coins}></Home></Route>
          <Route path='/signin' ><Signin></Signin></Route>
          <Route path='/signup'><Signup></Signup></Route>
          <Route path='/account' ><Account></Account></Route>
          <Route path='/coin/:coinId' ><CoinPage><Route path=':coinId' /></CoinPage>
          </Route>
        </Switch>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;