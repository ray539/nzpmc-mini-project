import { MouseEventHandler } from "react";

export interface Candidate {
  name: string,
  DOB: string,
  id: string
}

export interface CandidateNoId {
  name: string,
  DOB: string,
}

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type ButtonHandler = MouseEventHandler<HTMLDivElement>; 