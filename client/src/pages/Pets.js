import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql` 
query ALL_PETS {
    pets {
    name
    type
    id
    img
  }
}

`
const ADD_PET = gql`  
mutation ADD_PET ($newPet: NewPetInput!) {
  addPet(input: $newPet) {
    name
    type
    id
    img

  }
}

`

export default function Pets () {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)
  const [createPet, newPet] = useMutation(ADD_PET)

  const onSubmit = input => {
    createPet({
      variables: {
        newPet: input
      }
    })
    setModal(false)
  }

  if (loading || newPet.loading) return <Loader />

  if (error || newPet.error) return <p>an Error has occurred!</p>

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
