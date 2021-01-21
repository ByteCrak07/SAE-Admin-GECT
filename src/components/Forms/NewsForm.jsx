import { useState } from "react";

function NewsForm(props) {
  const [state, setState] = useState({
    title: "",
    date: new Date().toISOString().substr(0, 10),
    content: "",
    image: "",
  });

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    setState({ ...state, image: URL.createObjectURL(e.dataTransfer.files[0]) });
  };

  const formHandler = (e) => {
    if (e.target.id === "image-upload") {
      setState({ ...state, image: URL.createObjectURL(e.target.files[0]) });
    } else {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
    props.setAddNew(false);
  };

  const formCancel = (e) => {
    e.preventDefault();
    console.log("Cancelled");
    props.setAddNew(false);
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Title"
                    autoComplete="off"
                    value={state.title}
                    onChange={formHandler}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="focus:border-gray-800 flex-1 block w-full bg-white rounded-md sm:text-sm border-gray-300 border p-3"
                    value={state.date}
                    onChange={formHandler}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows="3"
                  className="shadow-sm focus:border-gray-800 mt-1 block w-full sm:text-sm border-gray-300 border rounded-md p-3"
                  placeholder="Enter news content"
                  value={state.content}
                  onChange={formHandler}
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover photo
                {state.image ? (
                  <span className="font-thin italic text-gray-500 pl-2">
                    Added!!
                  </span>
                ) : (
                  ""
                )}
              </label>
              <div
                className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
              >
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        onChange={formHandler}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              className="inline-flex justify-center py-2 px-4 mr-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              onClick={(e) => formCancel(e)}
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={(e) => formSubmit(e)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;