// project import
import ScrollTop from 'components/ScrollTop';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import './index.css';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
