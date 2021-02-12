import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import TeamCard from "../../components/Cards/TeamCard";
import TeamForm from "../../components/Forms/TeamForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Team() {
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/team/")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        if (data) {
          let sortedData = Object.fromEntries(
            Object.entries(data).sort((a, b) => a[1].priority - b[1].priority)
          );
          setData(Object.values(sortedData));
          setKeys(Object.keys(sortedData));
        } else {
          setData(null);
          setKeys(null);
          setAlert({
            type: "danger",
            title: "No data present in database!",
            content: "",
          });
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-10">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Team</div>
      </div>
      <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
        <Alert
          type={alert.type}
          title={alert.title}
          content={alert.content}
          setAlert={setAlert}
        />
        <div className="w-full p-6 pb-0">
          {!addNew ? (
            <button
              className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
              onClick={() => setAddNew(true)}
            >
              <i className="fas fa-plus"></i> Add Member
            </button>
          ) : (
            <TeamForm
              setAddNew={setAddNew}
              setAlert={setAlert}
              fetchData={fetchData}
            />
          )}
        </div>
        {isLoading ? <Loader /> : ""}
        {data
          ? keys
            ? data.map((data, i) => (
                <div className="mx-auto px-4 pt-8 max-w-md mt-5" key={i}>
                  <TeamCard
                    Key={keys[i]}
                    name={data.name}
                    position={data.position}
                    priority={data.priority}
                    imageUrl={data.imageUrl}
                    fileName={data.fileName}
                    fetchData={fetchData}
                    setAlert={setAlert}
                  />
                </div>
              ))
            : ""
          : ""}
      </div>
    </>
  );
}

export default Team;
