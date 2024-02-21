import { useState, useEffect } from 'react'
import styled from "@emotion/styled";
import ImgCripto from "./assets/imagen-criptos.png";
import Form from "./Components/Form";
import Result from "./Components/Result";

const Heading = styled.h1`
  color: #FFF ;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
`
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  };
`
const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ result, setResult ] = useState({})

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {

      const cotizarCripto = async () => {

         const { moneda, criptoMoneda }= monedas
         const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
         const response = await fetch(url)
         const result =  await response.json()
        
         setResult(result.DISPLAY[criptoMoneda][moneda])

      }

      cotizarCripto()
    }

  }, [monedas])

  return (
    <Container>

      <Img
       src={ImgCripto}
       alt='Imagen criptomonedas'
      />
      
      <div>

        <Heading>Cotiza criptomonedas</Heading>
        <Form
         setMonedas={setMonedas}
        />

         { result.PRICE && <Result result={result}/>}

      </div>
     
    </Container>
  )
}

export default App
