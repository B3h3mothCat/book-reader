import styled from 'styled-components'


export default function MockPage() {


    return (
        <Div_Container>
            <h1>Book Manager</h1>

        </Div_Container>
    )
}


const Div_Container = styled.div`
    padding-top: calc(var(--navbar-height) + 15px);
    background-color: var(--background-color);
    width: 100vw;
`;

