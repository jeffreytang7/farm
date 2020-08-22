import React from 'react';
import { Route } from 'react-router-dom';
import Labour from './components/Form/Labour/Labour';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import ForgotPassword from './components/Form/ForgotPassword/ForgotPassword';
import SignOut from './components/signOut/SignOut';
//import YieldTrack from "./components/YieldTrack/Yieldtrack";
import MaterialUse from "./components/MaterialUse/Materialuse";
import FDashboard from "./components/FinancialDashboard/Dashboard/Dashboard";
import Payment from "./components/FinancialDashboard/Payment/Payment";
import AccountInfo from "./components/FinancialDashboard/AccountInfo/AccountInfo";
import InputWages from "./components/FinancialDashboard/InputWages/InputWages";
import Toolcheckout from "./components/Toolcheckout/ToolCheckout";
import FarmPack from "./components/FarmPack/FarmPack";
import Infrastructure from "./components/Infrastructure/Infrastructure";
import InfrastructureCharts from "./components/Infrastructure/InfrastructureCharts/InfrastructureRentChart";
import InfraChartsMain from "./components/Infrastructure/InfrastructureCharts/InfraChartsMain";
//import YieldTrackOwner from "./components/YieldTrack/YieldTrackOwner";
import FarmManagerYieldTracking from "./components/YieldTrack/FarmManagerYieldTracking";
import YieldChartsMain from "./components/YieldTrack/InfrastructureCharts/InfraChartsMain";
import YieldTrackMain from "./components/YieldTrack/YieldTrackMain";
import YieldTrackFarmViewChart from "./components/YieldTrack/FarmChartMain";


function App() {
  
  return (
    <React.Fragment>

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/labour" component={Labour} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" component={SignOut} />
      <Route exact path="/Materialuse" component={MaterialUse}/>
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/accountinfo" component={AccountInfo} />
      <Route exact path="/inputwages" component={InputWages}/>
      <Route exact path="/toolcheckout" component={Toolcheckout}/>
      <Route exact path="/farmpack" component={FarmPack}/>
      <Route exact path="/infrastructure" component={Infrastructure}/>
      <Route exact path="/infrastructureCharts" component={InfraChartsMain}/>
      <Route exact path="/yieldtrack" component={YieldTrackMain}/>
      <Route exact path="/yieldCharts" component={YieldChartsMain}/>
      <Route exact path="/yieldtrack/SectorView" component={FarmManagerYieldTracking}/>
      <Route exact path="/yieldtrack/FarmViewCharts" component={YieldTrackFarmViewChart}/>




      
    </React.Fragment>

    
  );


}

export default App;













  
