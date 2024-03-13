import styled from "styled-components";

export const CartContainer = styled.section`
  background: #ddd;
  padding: 20px;
  vertical-align: middle;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const Title = styled.div`
  margin-bottom: 5vh;
`;

export const Card = styled.div`
  margin: auto;
  max-width: 950px;
  width: 90%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  border: transparent;
  @media (max-width: 767px) {
    margin: 3vh auto;
  }
`;

export const ShoppingCart = styled.div`
  background-color: #fff;
  padding: 4vh 5vh;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  @media (max-width: 767px) {
    padding: 4vh;
    border-bottom-left-radius: unset;
    border-top-right-radius: 1rem;
  }
`;

export const Summary = styled.div`
  background-color: #ddd;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4vh;
  color: rgb(65, 65, 65);
  @media (max-width: 767px) {
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
  }
`;

export const Main = styled.div`
  margin: 0;
  padding: 2vh 0;
  width: 100%;
`;

export const Close = styled.span`
  margin-left: 10px;
  padding: 5px;
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  background-color: black;
  border-radius: 5px;
  cursor: pointer;
`;

export const A = styled.span`
  padding: 0 1vh;
  cursor: pointer;
  font-size: 1rem;
  color: black;
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

export const Select = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1.5vh 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
`;

export const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export const Button = styled.button`
  background-color: #000;
  border-color: #000;
  color: white;
  width: 100%;
  font-size: 0.7rem;
  margin-top: 4vh;
  padding: 1vh;
  border-radius: 0;
  &:focus {
    box-shadow: none;
    outline: none;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -webkit-user-select: none;
    transition: none;
  }

  &:hover {
    background-color: #000;
    color: white;
  }
`;

export const ProgressBar = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  border-bottom: 3px solid black;
  margin-bottom: 60px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
`;
export const ProgressStation = styled.div`
  height: 200%;
  aspect-ratio: 1;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? `#000000` : `#c0c0c0`)};
  color: ${(props) => (!props.active ? `#000000` : `#c0c0c0`)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: relative;
  &::before {
    content: ${(props) => `"${props.name}"`};
    color: #000000;
    position: absolute;
    width: 200%;
    text-align: center;
    top: 100%;
  }
`;
