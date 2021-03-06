import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
//Components
import LogOutModal from "../Modals/LogOutModal";
//Images
import logo from "../../assets/logo192.png";

function Sidebar(props) {
  const history = useHistory();
  const [route, setRoute] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [collapse, setCollapse] = useState(true);

  useEffect(() => setRoute(window.location.pathname), []);

  useEffect(() => {
    const sidebar = document.getElementsByClassName("sliding-sidebar")[0];
    const menu = [...document.getElementsByClassName("menu-btn")];
    const checkclick = (e) => {
      menu.map((btn) => {
        if (!collapse && btn.contains(e.target)) {
          setCollapse(true);
        }
        return 0;
      });
      if (!collapse && !sidebar.contains(e.target)) {
        setCollapse(true);
      }
    };
    document.addEventListener("click", checkclick);

    return () => document.removeEventListener("click", checkclick);
  }, [collapse]);

  let selected = "bg-gray-700 text-gray-100 border-r-4 border-gray-100";
  let unselected =
    "text-gray-400 border-r-4 border-gray-800 sm:hover:bg-gray-700 sm:hover:text-gray-100 sm:hover:border-gray-100";

  const mouseEnterHandler = () => {
    if (window.innerWidth < 1024) {
      setCollapse(false);
    }
  };

  const mouseLeaveHandler = () => {
    if (window.innerWidth >= 640) {
      setCollapse(true);
    }
  };

  const logoutHandler = () => {
    let loader = document.getElementById("loading-spinner");
    loader.style.opacity = "100";
    loader.style.display = "block";
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
        props.setIsLoggedIn(false);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {showModal ? (
        <LogOutModal
          setShowModal={setShowModal}
          logoutHandler={logoutHandler}
        />
      ) : (
        ""
      )}

      {/* horizontal navbar */}
      <div className="sm:hidden bg-gray-900 left-0 top-0 right-0 shadow fixed z-10">
        <div className="flex pt-2 pb-1">
          <button
            className="text-gray-100 text-2xl p-2 px-3 -mt-1 mx-2 rounded-md focus:outline-none sm:hover:bg-gray-700"
            onClick={() => setCollapse(false)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <img className="w-12 h-12" src={logo} alt="Logo" />
          <h1 className="text-gray-100 text-2xl pt-1 pl-2 block">Admin</h1>
        </div>
      </div>

      {/* actual sidebar */}
      <div
        className="w-14 lg:w-64 h-screen bg-gray-900 fixed top-0 left-0 overflow-auto hidden sm:block"
        onMouseEnter={() => mouseEnterHandler()}
      >
        <div className="flex items-center justify-center mt-10">
          <img className="w-9 lg:w-12 py-1.5 lg:py-0" src={logo} alt="Logo" />
          <h1 className="text-gray-100 text-2xl mb-2 ml-2 lg:block hidden">
            Admin
          </h1>
        </div>

        <nav className="mt-10">
          <button
            className={
              "flex items-center py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/events" ? selected : unselected)
            }
            onClick={() => {
              history.push("/events");
              setRoute("/events");
            }}
          >
            <i className="far fa-calendar-alt px-0.5"></i>
            <span className="mx-4 font-medium lg:block hidden">Events</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/gallery" ? selected : unselected)
            }
            onClick={() => {
              history.push("/gallery");
              setRoute("/gallery");
            }}
          >
            <i className="far fa-images"></i>
            <span className="mx-4 font-medium lg:block hidden">Gallery</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/achievements" ? selected : unselected)
            }
            onClick={() => {
              history.push("/achievements");
              setRoute("/achievements");
            }}
          >
            <i className="fas fa-trophy"></i>
            <span className="mx-4 font-medium lg:block hidden">
              Achievements
            </span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/execom" ? selected : unselected)
            }
            onClick={() => {
              history.push("/execom");
              setRoute("/execom");
            }}
          >
            <i className="fas fa-users"></i>
            <span className="mx-4 font-medium lg:block hidden">Execom</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/news" ? selected : unselected)
            }
            onClick={() => {
              history.push("/news");
              setRoute("/news");
            }}
          >
            <i className="far fa-newspaper"></i>
            <span className="mx-4 font-medium lg:block hidden">News</span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/registration" ? selected : unselected)
            }
            onClick={() => {
              history.push("/registration");
              setRoute("/registration");
            }}
          >
            <i className="far fa-address-card"></i>
            <span className="mx-4 font-medium lg:block hidden">
              Registration
            </span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/announcement" ? selected : unselected)
            }
            onClick={() => {
              history.push("/announcement");
              setRoute("/announcement");
            }}
          >
            <i className="fas fa-bullhorn"></i>
            <span className="mx-4 font-medium lg:block hidden">
              Announcement
            </span>
          </button>

          <button
            className={
              "flex items-center mt-5 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              (route === "/contact" ? selected : unselected)
            }
            onClick={() => {
              history.push("/contact");
              setRoute("/contact");
            }}
          >
            <i className="fas fa-phone-alt"></i>
            <span className="mx-4 font-medium lg:block hidden">Contact us</span>
          </button>

          <button
            className={
              "flex items-center mt-5 mb-6 py-3 lg:py-2 px-4 lg:px-8 w-full focus:outline-none " +
              unselected
            }
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-power-off"></i>
            <span className="mx-4 font-medium lg:block hidden">Log Out</span>
          </button>
        </nav>
      </div>

      {/* sliding sidebar */}
      <div
        className={
          "sliding-sidebar w-56 sm:w-64 bg-gray-900 fixed top-0 bottom-0 overflow-auto z-30 transition duration-500 lg:hidden transform " +
          (collapse ? "-translate-x-64" : "")
        }
        onMouseLeave={() => mouseLeaveHandler()}
      >
        <div className="flex items-center justify-center mt-10">
          <img className="w-12" src={logo} alt="Logo" />
          <h1 className="text-gray-100 text-2xl mb-2 ml-2 block">Admin</h1>
        </div>

        <nav className="mt-10">
          <button
            className={
              "menu-btn flex items-center py-2 px-8 w-full focus:outline-none " +
              (route === "/events" ? selected : unselected)
            }
            onClick={() => {
              history.push("/events");
              setRoute("/events");
            }}
          >
            <i className="far fa-calendar-alt px-0.5"></i>
            <span className="mx-4 font-medium block">Events</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/gallery" ? selected : unselected)
            }
            onClick={() => {
              history.push("/gallery");
              setRoute("/gallery");
            }}
          >
            <i className="far fa-images"></i>
            <span className="mx-4 font-medium block">Gallery</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/achievements" ? selected : unselected)
            }
            onClick={() => {
              history.push("/achievements");
              setRoute("/achievements");
            }}
          >
            <i className="fas fa-trophy"></i>
            <span className="mx-4 font-medium block">Achievements</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/execom" ? selected : unselected)
            }
            onClick={() => {
              history.push("/execom");
              setRoute("/execom");
            }}
          >
            <i className="fas fa-users"></i>
            <span className="mx-4 font-medium block">Execom</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/news" ? selected : unselected)
            }
            onClick={() => {
              history.push("/news");
              setRoute("/news");
            }}
          >
            <i className="far fa-newspaper"></i>
            <span className="mx-4 font-medium block">News</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/registration" ? selected : unselected)
            }
            onClick={() => {
              history.push("/registration");
              setRoute("/registration");
            }}
          >
            <i className="far fa-address-card"></i>
            <span className="mx-4 font-medium block">Registration</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/announcement" ? selected : unselected)
            }
            onClick={() => {
              history.push("/announcement");
              setRoute("/announcement");
            }}
          >
            <i className="fas fa-bullhorn"></i>
            <span className="mx-4 font-medium block">Announcement</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 py-2 px-8 w-full focus:outline-none " +
              (route === "/contact" ? selected : unselected)
            }
            onClick={() => {
              history.push("/contact");
              setRoute("/contact");
            }}
          >
            <i className="fas fa-phone-alt"></i>
            <span className="mx-4 font-medium block">Contact us</span>
          </button>

          <button
            className={
              "menu-btn flex items-center mt-5 mb-6 py-2 px-8 w-full focus:outline-none " +
              unselected
            }
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-power-off"></i>
            <span className="mx-4 font-medium block">Log Out</span>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
