import React, {useState, useEffect,  useRef } from 'react';
import {Twitter} from '@styled-icons/boxicons-logos';
import styled from 'styled-components';

export default function QuoteContainer() {
    const quotesDataRef = useRef("");
    const [quote, updateQuote] = useState(chooseAQuote(quotesDataRef.current)); 

   useEffect(() => {
        async function quotesRequest () {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            return data;
        }
        
        quotesRequest().then((data) => {
            quotesDataRef.current = data;
            updateQuote(chooseAQuote(data));
        }, console.error);

    }, []);

    function chooseAQuote(quotes) {
        if(quotes === "") return {text: "", author: ""};
        const {text, author} = quotes[Math.floor(Math.random() * quotes.length)];
        return {
            text,
            author
        }
    }

    const QuoteCont = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    `
    const Quote = styled.h3`
    text-align: center;
    width: 90%;
    font-size: 2em;
    font-family: 'Acme', sans-serif;
    `
    const Author = styled.h4`
       text-align: right;
       width: 90%;
       font-size: 1.5em;
       font-family: 'Dancing Script', cursive; 
    `
    const Buttons = styled.div`
       display: flex;
       justify-content: space-around;
    `

    const NewQuoteBut = styled.button`
        padding: 10px;
        background-color: #31112C;
        color: #ddd;
        border: 0;
        cursor: pointer;
    `

    return (
        <QuoteCont>
            <Quote className="quote">"{quote.text}"</Quote>
            <Author className="author">-{quote.author || "Unknown" }</Author>
            <Buttons>
                <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${quote.text}&hashtags=${quote.author}`} className="twitter-share-button"><Twitter size="25" title="Share this quote on twitter" /></a>
                <NewQuoteBut onClick={() => updateQuote(chooseAQuote(quotesDataRef.current))}>New Quote</NewQuoteBut>
            </Buttons>      
        </QuoteCont>
    )
}