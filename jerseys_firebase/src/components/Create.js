import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [equipo, setEquipo] = useState('')
  const [modelo, setModelo] = useState('')
  const [precio, setPrecio] = useState(0)
  const [talla, setTalla] = useState('')
  const navigate = useNavigate()

  const productsCollection = collection(db, 'jerseys')

  const store = async (e) =>{
    e.preventDefault()
    await addDoc(productsCollection, {equipo:equipo, modelo:modelo, precio:precio, talla:talla})
    navigate('/')
  }
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='text-center'>Crear Producto</h1>

          <form onSubmit={store}>

            <div className='mb-3'>
              <label className='form-label'>Equipo</label>
              <input
                  value={equipo}
                  onChange={ (e)=> setEquipo(e.target.value)}
                  type='text'
                  className='form-control'
                  />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Modelo</label>
              <input
                  value={modelo}
                  onChange={ (e)=> setModelo(e.target.value)}
                  type='text'
                  className='form-control'
                  />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Precio</label>
              <input
                  value={precio}
                  onChange={ (e)=> setPrecio(e.target.value)}
                  type='number'
                  className='form-control'
                  />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Talla</label>
              <input
                  value={talla}
                  onChange={ (e)=> setTalla(e.target.value)}
                  type='text'
                  className='form-control'
                  />
            </div>
            <button type='submit' className='btn btn-primary'>Crear</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Create
