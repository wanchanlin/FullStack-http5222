import './bean.css';
export default function Bean(props) {
    return (
        <div>
            <img class="img" src={props.img} alt={props.title || 'Bean'} /> 
            <h2>{props.title}</h2>
            <p>{props.year}</p>
        </div>
    );
}