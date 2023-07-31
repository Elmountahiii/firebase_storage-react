import { useRef } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, uploadString } from "firebase/storage";

import "./App.css";

import { useFilePicker } from "use-file-picker";

const firebaseConfig = {
  apiKey: "AIzaSyC-hIYB-_WpDnD-wggsLiGF2KS-0Ejycn8",
  authDomain: "twitter-colne-ssh.firebaseapp.com",
  projectId: "twitter-colne-ssh",
  storageBucket: "twitter-colne-ssh.appspot.com",
  messagingSenderId: "124126310258",
  appId: "1:124126310258:web:d16e6f4af7c72ddbaeb7eb",
  measurementId: "G-GMRCNT9DB4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const fileInput = useRef(null);
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    multiple: true,
    readAs: "DataURL",
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      // this callback is always called, even if there are errors
      upload(filesContent[0]);
    },
  });

  const handleClick = () => {
    openFileSelector();
  };

  const upload = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `Uploades/${file.name}`);
    uploadString(storageRef, file.content, "data_url").then((snapshot) => {
      alert("Uploaded");
    });
  };

  return (
    <div className="main-container">
      <input type="file" ref={fileInput} style={{ display: "none" }} />

      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
        </div>
      ))}

      <span className="span" onClick={handleClick}>
        Open File
      </span>
    </div>
  );
}

export default App;
