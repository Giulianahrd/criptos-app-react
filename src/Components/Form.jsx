import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import UseSelectMonedas from "../Hooks/UseSelectMonedas";
import Error from './Error'

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  &:hover {
    background-color: #7A7DFE;
  }
  cursor: pointer;
  margin-top: 30px;
`
const Form = ({ setMonedas}) => {

  const monedas = [
    { 
      id: "USD",
      nombre: "Dolar de Estados Unidos"
    },
    { 
        id: "ARG",
        nombre: "Peso Argentino"
    },
    { 
        id: "EUR",
        nombre: "Euro"
    },
    { 
        id: "GBP",
        nombre: "Libra Esterlina"
    },
  ]
  
  const [ criptos, setCriptos ] = useState([])
  const [ moneda, SelectMonedas ] = UseSelectMonedas("Elige tu moneda", monedas)
  const [ criptoMoneda, SelectCriptoMoneda ] = UseSelectMonedas("Elige tu criptomoneda", criptos)
  const [ error, setError ] = useState(false)
  

  useEffect(() => {
    const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        const arrayCriptos = resultado.Data.map( cripto => {

            const object = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return(object)
        })
        setCriptos(arrayCriptos)

    }
    consultarAPI()
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if ([ moneda, criptoMoneda ].includes("")) {
        setError(true)
    }

    setError(false)
    setMonedas({moneda, criptoMoneda})
  }

  return (
    <> 
        {error&& <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>

            <SelectMonedas/>

            <SelectCriptoMoneda/>

            <InputSubmit 
            type='submit' 
            value="Cotizar"
            />
        
        </form>
    </>
  )
}

export default Form
