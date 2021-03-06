import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    background: #36393f;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    padding: 40px;
    width: 900px;
    h1{
        font-size: 26px;
        font-weight: 500;
        text-align: center;
        margin: 0 0 10px;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        > span{
            color: #FFF;
            font-size: 14px;
            line-height: 16px;
            font-weight: 600;
            margin-top: 5px;
        }
        > input{
            height: 40px;
            padding: 5px;
            border-radius: 3px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            background-color: rgba(0, 0, 0, 0.2);
            color: rgba(0, 0, 0, 0.9);  
            margin-top: 3px;
            transition: border 0.15s ease;
            font-size: 16px;
            &:focus{
                border-color: #004870;
            }
        }
        > button{
            margin: 20px 0 0;
        }
    }
`;
