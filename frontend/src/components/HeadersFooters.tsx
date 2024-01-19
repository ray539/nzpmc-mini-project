import { StateSetter } from '../interfaces'
import './headers-footers.css'

function Header({showRegPage, setShowRegPage}: {showRegPage:boolean, setShowRegPage: StateSetter<boolean>;}) {

  const c1: string = showRegPage ?  'item' : 'item highlight'
  const c2: string = showRegPage ?  'item highlight' : 'item'

  return (
    <div className="header">
      <div className="w">
        <div className={c1} onClick={() => setShowRegPage(false)}>View candidates</div>
        <div className={c2} onClick={() => setShowRegPage(true)}>Register New</div>
      </div>
    </div>
  )
}

function Footer() {

  return (
    <div className="bottom">
      <div className="w">
        <div className="item"> <a href="http://google.com" target="_blank">link 1</a></div>
        <div className="item"> <a href="http://google.com" target="_blank">link 2</a></div>
      </div>
    </div>
  )
}

export {Header, Footer}

