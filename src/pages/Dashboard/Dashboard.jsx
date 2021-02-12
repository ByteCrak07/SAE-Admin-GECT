import { Switch, Route, Redirect } from "react-router-dom";
//Components
import Sidebar from "../../components/Sidebar/Sidebar";
//Pages
import Events from "../Events/Events";
import Gallery from "../Gallery/Gallery";
import Team from "../Team/Team";
import News from "../News/News";
import Registration from "../Registration/Registration";

function Dashboard(props) {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  return (
    <>
      <div className="bg-gray-200 h-full w-full absolute"></div>
      <Sidebar setIsLoggedIn={props.setIsLoggedIn} />
      <div
        className="relative flex flex-col ml-0 sm:ml-14 lg:ml-64 h-screen"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <div className="flex-grow bg-gray-200 pb-10">
          <Switch>
            <Route path="/events" exact component={Events} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/team" exact component={Team} />
            <Route path="/news" exact component={News} />
            <Route path="/reg" exact component={Registration} />
            <Redirect path="*" to="/events" />
          </Switch>
        </div>
        {/* Footer */}
        <div className="border-t-2 bg-gray-100">
          <h2 className="text-center p-3 text-gray-400">© 2021 SAE-GECT</h2>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
