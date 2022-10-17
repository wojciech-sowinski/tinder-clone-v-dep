import Loader from "react-js-loader";
import '../styles/dataLoader.scss'


const DataLoader = ({ text, local }) => {
    return (
        <div className={`data-loader ${local && 'local'}`}>
            <div
                className={`loader-icon `}
                key={"loadericonskey"}
            >
                <Loader type="bubble-loop" bgColor={"rgb(201, 0, 50)"} title={(text ? text : "loading")} color={'#afafaf'} size={100} />
            </div>

        </div>
    );
}

export default DataLoader;