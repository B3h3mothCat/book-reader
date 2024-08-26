import styled from "styled-components"

export default function BookModal({ book }) {
    // <Div_Container>
    <div>
        <h3>{book.title}</h3>
        <p>{book.description}</p>
    </div>


    {/* </Div_Container> */ }
}

const Div_Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    height: 300px;
    width: 300px;
    z-index: 55;

`;