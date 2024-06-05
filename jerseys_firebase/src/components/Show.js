import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);

const Show = () => {
    const [products, setProducts] = useState([]);

    const productsCollection = collection(db, "jerseys");

    const getProducts = async () => {
        const data = await getDocs(productsCollection);
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //console.log(products);
    };

    const deleteProduct = async (id) => {
        const productDoc = doc(db, "jerseys", id);
        await deleteDoc(productDoc);
        getProducts();
    };

    const confirmDeletem = (id) =>{
        MySwal.fire({
            title: "¿Estas Seguro?",
            text: "El Producto será eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, Eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
              Swal.fire({
                title: "Eliminado!",
                text: "El producto a sido borrado",
                icon: "success"
              });
            }
          });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <h1 className='text-center'>CRUD con Firebase</h1>
                            <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
                        </div>

                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Equipo</th>
                                    <th>Modelo</th>
                                    <th>Precio</th>
                                    <th>Talla</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.equipo}</td>
                                        <td>{product.modelo}</td>
                                        <td>{product.precio}</td>
                                        <td>{product.talla}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className='btn btn-light'>
                                                <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button onClick={() => { confirmDeletem(product.id) }} className='btn btn-danger'>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Show;
