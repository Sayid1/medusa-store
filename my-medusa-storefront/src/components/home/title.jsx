import React from 'react'

export default (props) => {
    return (
        <>
            <div className="text-[hsl(174_90.0%_40.7%)] font-sans text-base font-medium mb-1.5">
                {props.module }
            </div>
            <h2 className="mb-7 max-w-[500px] font-sans font-medium text-4xl text-[color:var(--secondary-color)]">
                { props.title }
            </h2>
        </>
    )
}