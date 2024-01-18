import { useEffect, useState } from "react";
import { Candidate, CandidateNoId, StateSetter } from "./interfaces";
import candidateService from "./services/candidates";

function RegistrationPage({
  candidates,
  setCandidates,
  setShowRegPage,
}: {
  candidates: Candidate[];
  setCandidates: StateSetter<Candidate[]>;
  setShowRegPage: StateSetter<boolean>;
}) {
  const [newName, setNewName] = useState("");
  const [newDOB, setNewDOB] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newDOB || !newName) {
            return;
          }
          const newCandidate: CandidateNoId = {
            name: newName,
            DOB: newDOB,
          };
          
          candidateService.postNewCandidate(newCandidate)
            .then(savedCandidate => setCandidates(candidates.concat(savedCandidate)))
          
          setNewDOB("");
          setNewName("");
        }}
      >
        <h1>Register new candidate</h1>
        <div>
          Name
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          DOB
          <input
            type="date"
            onChange={(e) => setNewDOB(e.target.value)}
            value={newDOB}
          />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <div>
        <button onClick={() => setShowRegPage(false)}>
          go to viewing page
        </button>
      </div>
    </>
  );
}

function ViewingPage({
  candidates,
  setShowRegPage,
}: {
  candidates: Candidate[];
  setShowRegPage: StateSetter<boolean>;
}) {
  return (
    <>
      <h1>Viewing Page</h1>
      <ul>
        {candidates.map((c) => (
          <li key={c.id}>
            <div>Name: {c.name}</div>
            <div>DOB: {c.DOB}</div>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowRegPage(true)}>
        go back to registration page
      </button>
    </>
  );
}

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
          setShowRegPage={setShowRegPage}
        />
      ) : (
        <ViewingPage candidates={candidates} setShowRegPage={setShowRegPage} />
      )}
    </>
  );
}

export default App;
