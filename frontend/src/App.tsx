import { useEffect, useState } from "react";
import { Candidate } from "./interfaces";
import candidateService from "./services/candidates";
import { RegistrationPage } from "./components/RegistrationPage";
import { ViewingPage } from "./components/ViewingPage";


function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    candidateService
      .getAllCandidates()
      .then((allCandidates) => setCandidates(allCandidates));
  }, []);

  const [showRegPage, setShowRegPage] = useState(true);

  return (
    <>
      {showRegPage ? (
        <RegistrationPage
          candidates={candidates}
          setCandidates={setCandidates}
          setShowRegPage={setShowRegPage} showRegPage={showRegPage}        />
      ) : (
        <ViewingPage candidates={candidates} setCandidates={setCandidates} setShowRegPage={setShowRegPage} showRegPage={showRegPage} />
      )}
    </>
  );
}

export default App;
