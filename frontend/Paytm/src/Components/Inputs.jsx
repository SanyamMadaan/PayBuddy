export function Inputs(props){
return(
<>
    <div className="font-medium">
        {props.label}
    </div>
    <div className="border-none" >
        <input onChange={props.onChange} className=" w-full mt-1 p-1 mb-3 border-solid border border-neutral-400 rounded" placeholder={props.placeholder} type={props.type} required/>
    </div>
</>
)
}