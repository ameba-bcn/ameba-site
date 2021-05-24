import React from 'react';
import LogComponent from './../components/user/LogComponent'
import LettersMove from './../components/layout/LettersMove'

export default function LogSession() {

  return (<>
    <LogComponent/>
    <LettersMove
      className="lettersMoveDiv"
      sentence="FES-TE SOCI/A "
      color="#EB5E3E"
    />
  </>
  )
}
