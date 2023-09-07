import React, { FC } from 'react'
import { Link } from 'react-router-dom'

// importation icons
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

type COMPONENT_TYPE = {
    title: string,
    links: Array<string>,
}

const TitleLink: FC<COMPONENT_TYPE> = ({ title, links }) => {

    return (
        <div className='title_link_container'>
            <h1 className='title'> {title} </h1>

            <div className='link_container'>
                <Link to='/' className='link'>
                    <AiOutlineHome />
                </Link>

                {links.map((link, i) => (
                    <div className='arrow_link_name_container' key={i}>
                        <MdOutlineKeyboardArrowRight className='arrow_right_icon' />
                        <span className='link_name'> {link} </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TitleLink