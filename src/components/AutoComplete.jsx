import React, { useEffect, useRef, useState } from 'react'
import FruitData from '../data/Data'
import ChipCardOptions from './chips/ChipCardOptions.jsx';

const AutoComplete = ({ options = FruitData }) => {
    const [markDelete, setMarkDelete] = useState(0);
    const [isPermitted, setIsPermitted] = useState(new Array(options.length).fill(true));
    let   [mySuggestions, setMySuggestions] = useState(options)
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [alength, setAlength] = useState(0) ;
    const [borderFlag, setBorderFlag] = useState([]) ;
    const refOne = useRef(null);
    const refTwo = useRef();

    // UPDATE SUGGESTIONS 
    const updatePermitValues = (value, flag) => {
        for (let i = 0; i < isPermitted.length; i++) {
            if (options[i].name === value) {
                isPermitted[i] = flag;
            }
        }
    }

    // HANDLE OUTSIDE CLICK
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, [])

    // MOVE CURSOR AUTOMATICALLY TO INPUT FIELD
    useEffect(() => {
        if (refTwo.current.value === '' && tags.length > 0)
            refTwo.current.focus();
    }, [tags])

    const handleClickOutside = (e) => {
        if (!refOne.current.contains(e.target)) {
            setShowSuggestions(false)
        }
    }

    // HANDLE MAKING TAGS
    const handleKeyDown = (e, i) => {
        if ( markDelete === 0 ){
            setMarkDelete(1) ;
            borderFlag[borderFlag.length-1] = '3px solid red'
            return ;
        }else{
            setMarkDelete(0) ;
        }

        if (e.target.value === "" && tags.length > 0 && e.key === 'Backspace') {
            const isDeleted = tags[tags.length - 1][0];
            updatePermitValues(isDeleted, true);
            tags.pop();
            setAlength(alength-1) ;
            setTags([...tags]);
            isPermitted[i] = true;
            borderFlag.pop() ;
        }
    }

    // REMOVE CHIP WHEN (x) IS PRESSED
    const removeTag = (index, tag) => {
        updatePermitValues(tag, true);
        setTags(tags.filter((el, i) => i !== index))
        borderFlag.pop() ;
    }

    // HANDLE AUTOCOMPLETE
    mySuggestions = options.filter((option, i) => {
        return isPermitted[i] && option.name.toLowerCase().includes(value.toLocaleLowerCase())
    });

    // HANDLE AUTOCOMPLETE FUNCTION
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSuggestionClick = (newFruit, newUrl = "", i) => {
        updatePermitValues(newFruit, false);
        setTags([...tags, [newFruit, newUrl]]);
        setAlength(alength+1) ;
        borderFlag.push('none')
        setValue('');
    }

    return (
        <div ref={refOne} className='tags-input-conainer'>
                {
                    tags.map((tag, index) => (
                        <div className='tag-item' style={{border: borderFlag[index]}} key={index}>
                            <img src={tag[1]} height='20px' width='20px' alt="TagImage" />
                            <span className='text'>{tag[0]}</span>

                            <span className='close' onClick={() => removeTag(index, tag[0])}><button>&times;</button></span>
                        </div>
                    ))
                }


            <input
                className="tags-input"
                type='text'
                placeholder='Add new fruit'
                ref={refTwo}
                value={value}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
            />

            {
                showSuggestions && (
                    <ul className='suggestions'>
                        {mySuggestions.map((suggestion, id) => (
                            <li
                                onClick={() => handleSuggestionClick(suggestion.name, suggestion.image, id)}
                                key={id}
                            >
                                <ChipCardOptions
                                    url={suggestion.image}
                                    userName={suggestion.name}
                                    email={suggestion.price}
                                />
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default AutoComplete