import {Link} from 'react-router-dom';

export function BottomWarning(props){
return(
    <div className="flex mb-2 mt-2 text-center pl-5">
     <p>{props.label}</p>
     <Link className="ml-1 underline" to={props.to}>{props.buttontext}</Link>
    </div>
)
}