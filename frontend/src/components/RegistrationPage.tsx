import { useState } from "react";
import { Candidate, CandidateNoId, StateSetter } from "../interfaces";
import candidateService from '../services/candidates'
import './registration-page.css'
import './all.css'
import { Footer, Header } from "./HeadersFooters";

interface Notification {
  show: boolean,
  text: string
}

function ErrorMsg({errorMsg}: {errorMsg: Notification}) {
  return (
    <div className="err">
      {`${errorMsg.text}`}
    </div>
  )
}

function SuccessMsg({successMsg}: {successMsg: Notification}) {
  return (
    <div className="success">
      {`${successMsg.text}`}
    </div>
  )
}

function Form({
  candidates,
  setCandidates
}: {
  candidates: Candidate[];
  setCandidates: StateSetter<Candidate[]>;
}) {

  const [newName, setNewName] = useState("");
  const [newDOB, setNewDOB] = useState("");
  const [errorMsg, setErrorMsg] = useState<Notification>({
    show: false,
    text: ''
  })
  const [successMsg, setSuccessMsg] = useState<Notification>({
    show: false,
    text: ''
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName) {
      setErrorMsg({
        show: true,
        text: `Error: name must not be empty`
      })
      return;
    }
    if (!newDOB) {
      setErrorMsg({
        show: true,
        text: `Error: DOB must not be empty`
      })
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

    setSuccessMsg({
      show: true,
      text: `Success: ${newName} is registered`
    })
  }

  return (
    <div className="w1">
      <form onSubmit={onSubmit} onFocus={() => {setErrorMsg({show: false, text: ''}); setSuccessMsg({show: false, text: ''})}}>
        <div className="h1">Register new candidate</div>

        <div className="inp1">
          <div className="t1">Name: </div>
          <input onChange={(e) => setNewName(e.target.value)} value={newName} placeholder="John Doe" />
        </div>

        <div className="inp1">
          <div  className="t1">DOB: </div>
          <input
            type="date"
            onChange={(e) => setNewDOB(e.target.value)}
            value={newDOB}
          />
        </div>
        {errorMsg.show && <ErrorMsg errorMsg={errorMsg}/>}
        {successMsg.show && <SuccessMsg successMsg={successMsg}/>}
        <div>
          <button className="b1" type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}



function RegistrationPage({
  candidates,
  setCandidates,
  showRegPage,
  setShowRegPage,
}: {
  candidates: Candidate[];
  setCandidates: StateSetter<Candidate[]>;
  showRegPage: boolean,
  setShowRegPage: StateSetter<boolean>;
}) {

  return (
    <>
      <div className="w-main">
        <Header showRegPage={showRegPage} setShowRegPage={setShowRegPage}></Header>
        <div className="spacer"></div>
        <Form candidates={candidates} setCandidates={setCandidates}></Form>
        <div>
        </div>
        <Footer></Footer>
      </div>

    </>
  );
}

export {RegistrationPage}