import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    height: 600px;
    background: linear-gradient(
        to bottom, rgba(0,0,0,0) 
        41%, rgba(0,0,0,0.8) 
        100% 
    ),
        url(${({ image }) => image}), var(--darkGray);
    background-size: 100%, cover;
    background-position: center;
    animation: animateHeroImage 1s;

    @keyframes animateHeroImage {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const Content = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 20px;
`;

export const Text = styled.div`
    position: absolute;
    max-width: 700px;
    min-height: 100px;
    margin-right: 20px;
    bottom: 40px;
    color: var(--white);
    z-index: 100;

    h1 {
        font-size: var(--fontSuperBig);

        @media screen and (max-width: 720px) {
            font-size: var(--fontBig);
        }
    }

    p {
        font-size: var(--fontMed);

        @media screen and (max-width: 720px) {
            font-size: var(--fontSmall);
        }
    }

    @media screen and (max-width: 720px) {
        max-width: 100%;
    }
`;
