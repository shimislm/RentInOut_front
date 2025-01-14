import styled from "styled-components";

export const Wrapper = styled.div`
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
}
.model {
  position: absolute;
  max-height: 90vh;
  margin-bottom: 20px;
  top: 2vh;
  left: 25%;
  width: 50%;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 600ms ease-in-out forwards;
}
.model .exit{
  display: none;
}
@media (max-width: 1024px) {
  .model {
    width: 60%;
    left: 20%;
  }
}
@media (max-width: 768px) {
  .model {
    border-radius: 0;
    height: 100vh;
    top: 0;
    left: 0%;
    width: 100%;
    padding: 0;
  }
  .model .exit {
    padding: 0;
    margin: 0;
    top: 0;
    z-index: 30;
    right: 20px;
    width: 20px;
    color: var(--skyblue-600);
    font-size: 2em;
    cursor: pointer;
    transition: 0.5s linear;
  }
<<<<<<< HEAD
  .model .exit:hover{
    color: var(--skyblue-900);
    transform:scale(1.1);
  }
=======
  /* .model .exit:hover{
    color: var(--skyblue-900);
    transform:scale(1.1);
  } */
>>>>>>> rentApp
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-48px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

<<<<<<< HEAD
=======

>>>>>>> rentApp
`