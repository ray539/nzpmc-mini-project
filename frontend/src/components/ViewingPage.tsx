import { useState } from "react";
import { Candidate, StateSetter } from "../interfaces";
import { Header } from "./HeadersFooters";
import candidateService from '../services/candidates'
import './viewing-page.css'

function Warning({warning, setWarning}: {warning: Warning, setWarning: StateSetter<Warning>}) {

  const unMount = () => setWarning({
    name: '',
    deleteFunction: () => {},
    show: false
  })

  return (
    <div className="w-warning">
      <div className="warning">
        <div className="txt">{`Delete ${warning.name}?`}</div>
        <div className="w-button">
          <button onClick={e => {e.stopPropagation(); warning.deleteFunction(); unMount()}}>OK</button>
          <button onClick={e => {e.stopPropagation(); unMount()}}>Cancel</button> 
        </div>

      </div>
    </div>

  )
}

interface Warning {
  show: boolean,
  name: string,
  deleteFunction: () => void;
}

function Content({candidates, setCandidates}: {candidates: Candidate[], setCandidates: StateSetter<Candidate[]>}) {

  // const candidates_: Candidate[] = []
  // for (let i = 0; i < 5; i++) {
  //   candidates_.push({
  //     name: 'ray wang',
  //     DOB: 'DOB',
  //     id: String(i)
  //   })
  // }

  const [filterStr, setFilterStr] = useState('');
  const re = new RegExp(filterStr.toLowerCase())
  const shownCandidates: Candidate[] = candidates.filter(c => re.test(c.name.toLowerCase()))

  const deleteCandidate = (id: string) => {
    candidateService.deleteCandidate(id)
      .then(deletedCandidate => {
        setCandidates(candidates.filter(c => c.id !== deletedCandidate.id))
      })
  }

  const [warning, setWarning] = useState<Warning>({
    show: false,
    name: "",
    deleteFunction: () => {}
  })

  return (
  <div className="w-content">
    {warning.show && <Warning warning={warning} setWarning={setWarning}></Warning>}

    <div className="w-input">
      <div className="tag">Filter by name:</div>
      <input value={filterStr} onChange={e => setFilterStr(e.target.value)}></input>
    </div>

    <div className="w-list">
      {
        shownCandidates.length > 0 ?
        shownCandidates.map((c) => (
          <div className="item" key={c.id}>
            <div className="info">
              <div> <b>Name:</b> {c.name}</div>
              <div> <b>DOB:</b>  {c.DOB}</div>
            </div>
            <button className="b" onClick={() => {
              setWarning({
                name: c.name,
                show: true,
                deleteFunction: () => deleteCandidate(c.id)
              })
            }}>remove candidate</button>
          </div>
        )) :
        filterStr === '' ?
        <div style={{margin: 10}}> {`No results found`} </div> :
        <div style={{margin: 10}}> {`No results matching '${filterStr}'`} </div>

        
        
      }
      {}
    </div>
  </div>


  )
}

function ViewingPage({
  candidates,
  setCandidates,
  showRegPage,
  setShowRegPage,
}: {
  candidates: Candidate[],
  setCandidates: StateSetter<Candidate[]>,
  showRegPage: boolean,
  setShowRegPage: StateSetter<boolean>;
}) {

  return (
    <>
      <div className="w-vmain">
        <Header showRegPage={showRegPage} setShowRegPage={setShowRegPage}></Header>
        <div className="spacer-2"></div>
        <Content candidates={candidates} setCandidates={setCandidates} />
      </div>

      {/* <button onClick={() => setShowRegPage(true)}>
        go back to registration page
      </button> */}
    </>
  );
}

export {ViewingPage}