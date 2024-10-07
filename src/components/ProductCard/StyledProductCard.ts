import styled from "styled-components";

export const Card = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
    max-width: 100%;
    width: 350px;
    height: 250px;
    border-radius: 8px;
`;

export const Title = styled.h2`
    font-size: 1.5em;
    margin: 10px 0;
`;

export const Price = styled.p`
    font-size: 1.25em;
    color: #4caf50;
`;

export const ButtonAddCart = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`

export const ButtonDetails = styled.a`
    background-color: #0070f3;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #005bb5;
    }
`;