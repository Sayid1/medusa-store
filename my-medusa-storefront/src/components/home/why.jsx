import React from 'react'
import Title from './title'

export default () => {
    return (
        <section className='block my-12 max-w-[length:var(--max-width)] mx-auto px-[25px]'>
            <Title module="Why Acson" title={<span>Spend less to <br></br>get better quality neon lights</span>} />
            <div className="mb-12 pr-5 grid grid-cols-1 lg:grid-cols-2 gap-5 text-[color:var(--secondary-color)] font-sans">
                <div>
                    <h3 className='mb-2'>Save time. Ship faster.</h3>
                    <p className="text-base">It’s no secret that robust UI components are tricky to build. Nailing accessibility details and complex logic sucks time away from product feature development. With Radix, you can focus on your unique engineering challenges instead.</p>
                </div>
                <div>
                    <h3 className='mb-2'>Save time. Ship faster.</h3>
                    <p className="text-base text-[color:var(--secondary-color)]">It’s no secret that robust UI components are tricky to build. Nailing accessibility details and complex logic sucks time away from product feature development. With Radix, you can focus on your unique engineering challenges instead.</p>
                </div>
            </div>
        </section>
    )
}