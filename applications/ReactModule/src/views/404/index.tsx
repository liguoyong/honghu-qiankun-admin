/*Header/404.jsx*/
import React, { Component } from 'react'

import  './index.scss'
import hey from '../../assets/images/hey.png'
import img404 from '../../assets/images/404.png'
import goodiesCrying from '../../assets/images/GoodiesCrying.png'
export default class Page404 extends Component {
    render() {
        return (
            <div className='Page-no-404'>
                <div className='page-no-main'>
                    <div className='page-no-hey'>
                        <img className='page-no-hey-image' src={hey} alt="" srcSet="" />
                        <p className='page-no-here'>What are you doing here?!</p>
                    </div>
                    <div className='page-no-center-main'>
                        <img className='page-no-center-main-image' src={img404} alt="" srcSet="" />
                    </div>
                    <div className='page-no-cry-main'><img className='page-no-cry-image' src={goodiesCrying} alt="" /></div>
                    <div className='page-no-back-home'>
                        <button className='back-home-button'>
                            返 回
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}