import styled from "@emotion/styled";

const Container = styled.div`
   color: #FFF;
   display: flex;
   align-items: center;
   gap: 1rem;
   margin-top: 30px;
`
const Price = styled.p`
   font-size: 30px;
`
const Text = styled.p`
   font-size: 18px;
`
const Img = styled.img`
   display: block;
   width: 110px;
`

const Result = ({result}) => {

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result

  return (
    <Container>
       <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto"/>

       <div>
            <Price>El precio es de : {PRICE} </Price>
            <Text>El precio mas alto del dia : {HIGHDAY} </Text>
            <Text>El precio mas bajo del dia : {LOWDAY} </Text>
            <Text>Variacion ultimas 24 hs : {CHANGEPCT24HOUR} </Text>
            <Text>Ultima actualizacion: {LASTUPDATE} </Text>
       </div>
       

    </Container>
  )
}

export default Result
