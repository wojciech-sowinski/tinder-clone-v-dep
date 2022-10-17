import { Splide, SplideSlide, } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '../styles/verticalUserCarousel.scss';

const VerticalUserCarousel = ({ users, speed, slideSize, imgNum, direction, info }) => {


    return (
        <Splide
            className='user-thumb-container-vertical'
            id="verticalCarousel"
            options={{
                direction: direction,
                type: "loop",
                height: '100%',
                width: slideSize,
                fixedWidth: slideSize,
                fixedHeight: slideSize,
                heightRatio: 1,
                // lazyLoad: 'nearby',
                preloadPages: 3,
                clones: 10,
                arrows: false,
                pagination: false,
                cover: true,
                drag: false,
                autoScroll: {
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    speed: speed
                },
                breakpoints: {
                    768: {
                        width: '33.33vw',
                        fixedWidth: '33.33vw',
                        fixedHeight: '33.33vw',
                    }
                }
            }}
            extensions={{ AutoScroll }}
        >
            {users.filter(user => user.imgUrl[imgNum]).reverse().map(user => {
                return (
                    <SplideSlide key={user.imgUrl[imgNum] + Math.random()} >
                        <img src={user.imgUrl[imgNum]} alt="user img" />
                    </SplideSlide>
                )
            })}
        </Splide >
    );
}

export default VerticalUserCarousel;