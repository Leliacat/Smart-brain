import React from 'react';



const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div className='ma4 mt5'>
            <p className='f3' >
                {'This magic brain will detect faces in your pictures! Give it a try!'}
            </p>
            <div className='center ba b--silver w-50 pa4 br3 shadow-5' style = {{background: 'rgba(240,255,240, .15)'}}>
                <input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange }/>
                <button 
                className='w-30 grow f4 white bg-light-purple'
                onClick={ onImageSubmit }
                >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;