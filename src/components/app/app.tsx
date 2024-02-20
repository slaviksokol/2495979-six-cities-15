import MainPage from '../../pages/main/main';

type Offers = {
  count: number;
};

export function App({count}: Offers) {
  return (
    <MainPage count={count}/>
  );
}

export default App;
