import { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '../styles/sliderWithThumb.scss';
import blankImg from '../img/blank-profile-picture.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deleteUserImg } from '../actions/userActions'
import {
    useDispatch
} from "react-redux";


const SliderWithThumb = ({ userImages, editable }) => {

    const dispatch = useDispatch()
    const images = userImages.length ? userImages : [blankImg]
    const fullImgSlider = useRef();
    const thumbImgSlider = useRef();

    const FullSliderImgs = (fullImages) => {

        const fullImagesToRender = [...fullImages].map(image => (
            <SplideSlide
                key={image}>
                <img
                    src={image}
                    alt="user img" />
                {(editable && image !== blankImg) && (<button onClick={() => {
                    dispatch(deleteUserImg(image))
                }} className='image-delete-button'><FontAwesomeIcon icon={faTrashCan} /></button>)}
            </SplideSlide>))

        return fullImagesToRender;
    }

    const ThumbSliderImgs = (thumbImages) => {

        const thumbImagesToRender = [...thumbImages].map(image => (
            <SplideSlide
                key={image + 'thumb'}>
                <img
                    src={image}
                    alt="user img" />
                {(editable && image !== blankImg) && (<button onClick={() => {
                    dispatch(deleteUserImg(image))
                }} className='image-delete-button'><FontAwesomeIcon icon={faTrashCan} /></button>)}
            </SplideSlide>
        ))

        return thumbImagesToRender
    }


    useEffect(() => {
        fullImgSlider.current.sync(thumbImgSlider.current.splide)
    }, [userImages])


    return (
        <div className='user-img-wrapper'>
            <div className='user-img-container'>
                <Splide
                    id="fullImgSlider"
                    ref={fullImgSlider}
                    options={{
                        fixedWidth: '100%',
                        fixedHeight: 400,
                        cover: true,
                        reactive: true,
                        type: 'slide',
                        rewind: true,
                        pagination: false,
                        arrows: false,
                    }}
                >
                    {FullSliderImgs(images)}
                </Splide>
            </div >
            <div className={` ${userImages.length} user-thumb-container  ${userImages.length <= 1 && 'hide'}`}>
                <Splide
                    id="thumbImgSlider"
                    ref={thumbImgSlider}
                    options={
                        {
                            fixedWidth: 100,
                            fixedHeight: 100,
                            gap: 10,
                            rewind: true,
                            pagination: false,
                            cover: true,
                            isNavigation: true,
                            breakpoints: {
                                1024: {
                                    fixedWidth: 100,
                                    fixedHeight: 100,
                                }
                            }
                        }
                    }
                >
                    {ThumbSliderImgs(images)}
                </Splide>
            </div>
        </div >
    );
}

export default SliderWithThumb;
