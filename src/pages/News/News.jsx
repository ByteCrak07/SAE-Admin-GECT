import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import NewsCard from "../../components/Cards/NewsCard";
import NewsForm from "../../components/Forms/NewsForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";
import DeleteModal from "../../components/Modals/DeleteModal";

function News() {
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/news/")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        if (data) {
          let sortedData = Object.fromEntries(
            Object.entries(data).sort(
              (a, b) => new Date(b[1].date) - new Date(a[1].date)
            )
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

  const deleteAllCards = () => {
    setShowModal(false);

    data.map((data, i) => {
      let fileName = data.fileName;
      let Key = keys[i];

      firebase
        .storage()
        .ref("/news/" + fileName)
        .delete()
        .then(() => {
          firebase
            .database()
            .ref("/news/" + Key)
            .remove()
            .then(() => {
              fetchData();
            })
            .catch((err) => console.error(err));
        })
        .catch(() =>
          setAlert({
            type: "danger",
            title: "Error!",
            content: "Sorry, you don't have access",
          })
        );

      return null;
    });
  };

  return (
    <>
      {showModal ? (
        <DeleteModal
          message="Are you sure you want to delete all news?"
          deleteCard={deleteAllCards}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-20">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">News</div>
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
            <>
              <button
                className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
                onClick={() => setAddNew(true)}
              >
                <i className="fas fa-plus"></i> Add News
              </button>
              {data ? (
                keys ? (
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-5 rounded focus:outline-none ml-1"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete All
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="p-4 mx-auto" style={{ maxWidth: "35rem" }}>
              <NewsForm
                setAddNew={setAddNew}
                setAlert={setAlert}
                fetchData={fetchData}
              />
            </div>
          )}
        </div>
        {isLoading ? <Loader /> : ""}

        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {data
            ? keys
              ? data.map((data, i) => (
                  <div key={i}>
                    <NewsCard
                      Key={keys[i]}
                      title={data.title}
                      date={data.date}
                      content={data.content}
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
      </div>
    </>
  );
}

export default News;
