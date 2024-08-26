import styled from "styled-components"

export default function BookModal({ book }) {
    <Div_Container>
        <h3>{book.title}</h3>
        <p>{book.description}</p>
    </Div_Container>
}

const Div_Container = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    height: 300px;
    width: 300px;
    z-index: 55;

`;