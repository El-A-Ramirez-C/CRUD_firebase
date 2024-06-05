import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [equipo, setEquipo] = useState('')
  const [modelo, setModelo] = useState('')
  const [precio, setPrecio] = useState(0)
  const [talla, setTalla] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async(e) => {
    e.preventDefault()
    const product = doc(db, 'jerseys', id)
    const data = {equipo:equipo, modelo:modelo, precio:precio, talla:talla}
    await updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async(id) =>{
    const product = await getDoc(doc(db, 'jerseys', id))
    if(product.exists()){
      //console.log(product.data())
      setEquipo(product.data().equipo)
      setModelo(product.data().modelo)
      setPrecio(product.data().precio)
      setTalla(product.data().talla)

    }else{
      console.log('El producto no existe')
    }
  }

  useEffect( () =>{
    getProductById(id)
  }, [])

  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='text-center'>Editar Producto</h1>

          <form onSubmit={update}>

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
            <button type='submit' className='btn btn-primary'>Atualizar</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Edit
